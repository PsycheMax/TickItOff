import React, { useState, useEffect } from 'react';
import { axiosPost, axiosGet, axiosPatch, axiosDelete } from './APIManager';
import { getFromStorage, setInStorage, removeStorage } from './StorageManager';
import jwtDecode from 'jwt-decode';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const LoggedUserContext = React.createContext({
    loginUserFunc: (email, password) => { },
    logoutUserFunc: () => { },
    registerNewUserFunc: (newUser) => { },
    patchUserFunc: (patchedUser, target) => { },
    getUserDataFunc: (target) => { },
    updateLoggedUserDataFunc: () => { },
    userData: {},
    hasCheckedLocalStorage: true
});

const UserManager = (props) => {

    const [loggedUserData, setLoggedUserData] = useState();
    const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);

    useEffect(async () => {
        if (loggedUserData !== undefined) {
            await setInStorage('loggedUserData', loggedUserData);
        }
        setHasCheckedLocalStorage(true);
    }, [loggedUserData]);

    // This runs only on launch
    useEffect(async () => {
        // It checks if there's any data in storage
        const rawUserDataInStorage = await getFromStorage("loggedUserData");
        // If there is, it tries to check its decodability
        if (rawUserDataInStorage !== null) {
            try {
                const userDataInStorage = rawUserDataInStorage;
                // if a token exists, and it's decodable
                if (userDataInStorage.token && userDataInStorage.token.length > 10) {
                    let decodedJWT = await jwtDecode(userDataInStorage.token);
                    // then the data found in storage can be used in the state
                    await setLoggedUserData(userDataInStorage);
                    // setHasCheckedLocalStorage(true);
                }
            }
            catch (error) {
                console.log(error);
            }
        } else {
            console.log("NOT FOUND, GOTTA LOGIN");
            // setHasCheckedLocalStorage(true);
        }

    }, [])

    // The following functions are to be passed down as context.functions()

    /**
     This function logs the user into the API server, and returns a data object containing the user data and a JWT token. IT also sets the logged user, if the login is successful, inside the context.loggedUserData.
     * @param {String} email 
     * @param {String} password 
     * @returns The API response, containing user data at response.data
     */
    async function loginUserFunc(email, password) {
        let loginUserObj = {
            "loginUser": {
                email: email,
                password: password
            }
        };
        let response = await axiosPost('/user/login', loginUserObj);
        if (response.status === 200) {
            setLoggedUserData(response.data);
            await setInStorage('loggedUserData', response.data);
            console.log("LoggedUserLOGIN")
            console.log(response.data);
            return (response);
        } else {
            return (response);
        }
    }

    /**
     * This function sends a "logout" command to the API and, when the server responds successfully, removes the local userdata from the context
     */
    async function logoutUserFunc() {
        let response = await axiosPost('/user/logout', {}, loggedUserData.token);
        if (response.status === 200) {
            await removeStorage('loggedUserData');
            setLoggedUserData({
                "_id": "",
                "username": "",
                "password": "",
                "email": "",
                "image": null,
                "token": ""
            });
        } else {
            console.log("NOT stat 200");
            return response;
        }
    }

    /**
     * This function creates a new user serverside, in the APIS. If the parameters are correct, the user is created and then logged into the app, locally, via JWT.
     * @param {object} newUser this object contains the new user information {username:"", password:"", ...}
     * @returns The API response, after logging in the user into the app
     */
    async function registerNewUserFunc(newUser) {
        let response = await axiosPost('/user', { newUser });
        if (response.status === 201) {
            console.log("In stat 201");
            let toSetInState = response.data;
            toSetInState.password = "HIDDEN";
            setLoggedUserData({
                ...toSetInState
            });
            return response;
        } else {
            console.log("NOT stat 201");
            return response;
        }
    }

    /**
     * This function patches an existing user (targetID) server side, and logs the new user in the app locally - setting it into the context
     * @param {object} patchedUser 
     * @param {string} targetID 
     * @returns 
     */
    async function patchUserFunc(patchedUser, targetID) {
        let response = await axiosPatch(`/user/${targetID}`, { patchedUser }, loggedUserData.token);
        if (response.status === 200) {
            console.log("In status 200");
            let toSetInState = response.data;
            toSetInState.password = "Hidden";
            setLoggedUserData({
                ...toSetInState, token: loggedUserData.token
            });
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function gets userdata for another user - it's useful when viewing a profile and such stuff, and it's only available to logged users.
     * @param {String} targetID 
     * @returns The API response, containing the target userData under response.data
     */
    async function getUserDataFunc(targetID) {
        let response = await axiosGet(`/user/${targetID}`, loggedUserData.token);
        let toReturn = response;
        toReturn.password = "HIDDEN";
        return toReturn;
    }


    async function updateLoggedUserDataFunc() {
        let response = await axiosGet(`/user/${loggedUserData._id}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("In Status 200");
            let toSetInState = response.data;
            toSetInState.password = "Hidden";
            toSetInState.token = loggedUserData.token;
            setLoggedUserData({
                ...toSetInState
            })
        } else {
            console.log("Status not 200 - please login again");
            return response;
        }

    }

    return (
        <LoggedUserContext.Provider value={{
            loginUserFunc: loginUserFunc,
            logoutUserFunc: logoutUserFunc,
            registerNewUserFunc: registerNewUserFunc,
            patchUserFunc: patchUserFunc,
            getUserDataFunc: getUserDataFunc,
            updateLoggedUserDataFunc: updateLoggedUserDataFunc,
            userData: loggedUserData,
            hasCheckedLocalStorage: hasCheckedLocalStorage
        }}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}

export default UserManager;
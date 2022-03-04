import React, { useState, useEffect } from 'react';
import { axiosPost, axiosGet, axiosPatch, axiosDelete } from './APIManager';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const LoggedUserContext = React.createContext({
    loginUserFunc: (email, password) => { },
    logoutUserFunc: () => { },
    registerNewUserFunc: (newUser) => { },
    patchUserFunc: (patchedUser, target) => { },
    getUserDataFunc: (target) => { },
    setUserDataWithoutLoginFunc: (userData) => { },
    userData: {}
});

const fakeUser = {
    "projects": {
        "created": [
            {
                "_id": "620fd33cc7effb0abb07ccca",
                "name": "PostMan name 1 - After MOD",
                "image": "reqUser.image - after MOD -1",
                "status": "Active"
            },
            {
                "_id": "622079df2171e4182477b76a",
                "name": "asdasdasd",
                "image": "asdasdasd",
                "status": "Active"
            },
            {
                "_id": "62207a222171e4182477b771",
                "name": "Created here",
                "image": "yup",
                "status": "Active"
            },
            {
                "_id": "6221d1a249b525fa16194d0a",
                "name": "PostMan Proj 1",
                "image": "reqUser.image",
                "status": "Active"
            },
            {
                "_id": "6221de2b739b6546debbc880",
                "name": "Francoasdad",
                "image": "sadasdmgtkl",
                "status": "Active"
            },
            {
                "_id": "6221df6a739b6546debbc887",
                "name": "6549879546",
                "image": "68798653",
                "status": "Active"
            },
            {
                "_id": "6221dfe6739b6546debbc88e",
                "name": "9798798798",
                "image": "98798798",
                "status": "Active"
            },
            {
                "_id": "6221e074739b6546debbc895",
                "name": "7987987987",
                "image": "798798798798",
                "status": "Active"
            },
            {
                "_id": "6221e098739b6546debbc89c",
                "name": "6579879816",
                "image": "6519874651",
                "status": "Active"
            },
            {
                "_id": "6221e0b9739b6546debbc8a3",
                "name": "654654456456",
                "image": "65465465456",
                "status": "Active"
            },
            {
                "_id": "6221e0f0739b6546debbc8aa",
                "name": "97987984",
                "image": "9846519876231",
                "status": "Active"
            },
            {
                "_id": "6221e140739b6546debbc8b1",
                "name": "6549879849",
                "image": "18746818765",
                "status": "Active"
            }
        ],
        "joined": [],
        "managed": [
            {
                "_id": "620fd33cc7effb0abb07ccca",
                "name": "PostMan name 1 - After MOD",
                "image": "reqUser.image - after MOD -1",
                "status": "Active"
            },
            {
                "_id": "622079df2171e4182477b76a",
                "name": "asdasdasd",
                "image": "asdasdasd",
                "status": "Active"
            },
            {
                "_id": "62207a222171e4182477b771",
                "name": "Created here",
                "image": "yup",
                "status": "Active"
            },
            {
                "_id": "6221d1a249b525fa16194d0a",
                "name": "PostMan Proj 1",
                "image": "reqUser.image",
                "status": "Active"
            },
            {
                "_id": "6221de2b739b6546debbc880",
                "name": "Francoasdad",
                "image": "sadasdmgtkl",
                "status": "Active"
            },
            {
                "_id": "6221df6a739b6546debbc887",
                "name": "6549879546",
                "image": "68798653",
                "status": "Active"
            },
            {
                "_id": "6221dfe6739b6546debbc88e",
                "name": "9798798798",
                "image": "98798798",
                "status": "Active"
            },
            {
                "_id": "6221e074739b6546debbc895",
                "name": "7987987987",
                "image": "798798798798",
                "status": "Active"
            },
            {
                "_id": "6221e098739b6546debbc89c",
                "name": "6579879816",
                "image": "6519874651",
                "status": "Active"
            },
            {
                "_id": "6221e0b9739b6546debbc8a3",
                "name": "654654456456",
                "image": "65465465456",
                "status": "Active"
            },
            {
                "_id": "6221e0f0739b6546debbc8aa",
                "name": "97987984",
                "image": "9846519876231",
                "status": "Active"
            },
            {
                "_id": "6221e140739b6546debbc8b1",
                "name": "6549879849",
                "image": "18746818765",
                "status": "Active"
            }
        ],
        "completed": []
    },
    "tasks": {
        "created": [
            "620fd98f61e1927c9ff2a1b1",
            "620fdaa0b31b7ff22362c2fb",
            "620fdab50124a8acdbb88e27",
            "620fdb0505be7535dc8984cc",
            "620fdc37d4dde77a048f19a6",
            "620fdc50b43b94f77acae7ea",
            "620fdc774c33628925c81365",
            "620fdc8c0e1e0f5a3b71ae8a",
            "620fdd072c14c2e8023aa11d",
            "621c9ff3f3a9ca7ebd2e112c",
            "6221cba5f3a91c170b21d046",
            "6221cdeb49b525fa16194cff"
        ],
        "assigned": [],
        "managed": [
            "620fd98f61e1927c9ff2a1b1",
            "620fdaa0b31b7ff22362c2fb",
            "620fdab50124a8acdbb88e27",
            "620fdb0505be7535dc8984cc",
            "620fdc37d4dde77a048f19a6",
            "620fdc50b43b94f77acae7ea",
            "620fdc774c33628925c81365",
            "620fdc8c0e1e0f5a3b71ae8a",
            "620fdd072c14c2e8023aa11d",
            "621c9ff3f3a9ca7ebd2e112c",
            "6221cba5f3a91c170b21d046",
            "6221cdeb49b525fa16194cff"
        ],
        "completed": []
    },
    "settings": {
        "colorScheme": "DefaultModified"
    },
    "_id": "620fd2edc7effb0abb07ccbf",
    "username": "AdminMax",
    "password": "HIDDEN",
    "email": "adminmax",
    "image": "https://randomuser.me/api/portraits/lego/6.jpg",
    "status": "Active",
    "creationDate": "2022-02-18T17:10:05.162Z",
    "modificationDate": "2022-02-25T11:23:40.439Z",
    "notifications": [],
    "lastLogin": "2022-02-22T08:40:33.162Z",
    "__v": 48,
    "lastOnline": "2022-03-04T12:19:36.277Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwZmQyZWRjN2VmZmIwYWJiMDdjY2JmIiwiZW1haWwiOiJhZG1pbm1heCIsImlhdCI6MTY0NjM5NjM3NiwiZXhwIjoxNjUxNzk2Mzc2fQ.56au3VGqfHtjNg0aAPj42iA9c3aUFN1Hw4ChfySmshI"
}

const UserManager = (props) => {

    const [loggedUserData, setLoggedUserData] = useState({});

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
        console.log(loginUserObj);
        console.log("CALLED")
        let response = await axiosPost('/user/login', loginUserObj);
        console.log(response);
        if (response.status === 200) {
            setLoggedUserData(response.data);
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
        console.log(response);
        if (response.status === 200) {
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
        console.log({ newUser });
        let response = await axiosPost('/user', { newUser });
        console.log(response);
        if (response.status === 201) {
            console.log("In stat 201")
            let toSetInState = response.data;
            toSetInState.password = "HIDDEN";
            setLoggedUserData({
                ...toSetInState
            });
            return response;
        } else {
            console.log("NOT stat 201")
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
        console.log(patchedUser, targetID);
        let response = await axiosPatch(`/user/${targetID}`, { patchedUser }, loggedUserData.token);
        console.log(response);
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
        console.log(targetID);
        let response = await axiosGet(`/user/${targetID}`, loggedUserData.token);
        console.log(response);
        let toReturn = response;
        toReturn.password = "HIDDEN";
        return toReturn;
    }

    /**
     * Temp function to speed up testing. 
     * TODO remove this when deploying
     * @param {*} userData 
     */
    async function setUserDataWithoutLoginFunc(userData) {
        console.log(userData);
        setLoggedUserData(userData);
    }

    // TODO remove this when deploying, this logs in the admin user for test purposes
    useEffect(() => {
        setLoggedUserData(fakeUser);

        return () => {
            // This only runs on componentDestroy
        }
    }, []) //when empty, it only runs once

    return (
        <LoggedUserContext.Provider value={{
            loginUserFunc: loginUserFunc,
            logoutUserFunc: logoutUserFunc,
            registerNewUserFunc: registerNewUserFunc,
            patchUserFunc: patchUserFunc,
            getUserDataFunc: getUserDataFunc,
            setUserDataWithoutLoginFunc: setUserDataWithoutLoginFunc,
            userData: loggedUserData,
        }}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}

export default UserManager;
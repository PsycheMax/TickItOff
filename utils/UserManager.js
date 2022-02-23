import React, { useState, useEffect } from 'react';
import { axiosPost } from './APIManager';
import LoginForm from '../components/users/UserForms/LoginForm';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const LoggedUserContext = React.createContext({
    loginUserFunc: (email, password) => { },
    logoutUserFunc: () => { },
    registerNewUserFunc: (userData) => { },
    patchUserFunc: (patchedUser, target) => { },
    jwtToken: "",
    userData: {}
});

const _TEMPTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwZmQyZWRjN2VmZmIwYWJiMDdjY2JmIiwiZW1haWwiOiJhZG1pbm1heCIsImlhdCI6MTY0NTYwODQ4MywiZXhwIjoxNjUxMDA4NDgzfQ.pSTxNd5KYhFaVeJ0ETP2ZJ7s1LZASJGRc8YTNpcKL4M";

const fakeUser = {
    "projects": {
        "created": [
            "620fd33cc7effb0abb07ccca"
        ],
        "joined": [],
        "managed": [
            "620fd33cc7effb0abb07ccca"
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
            "620fdd072c14c2e8023aa11d"
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
            "620fdd072c14c2e8023aa11d"
        ],
        "completed": []
    },
    "settings": {
        "colorScheme": "DefaultModified"
    },
    "_id": "620fd2edc7effb0abb07ccbf",
    "username": "AdminMax",
    "password": "HIDDEN",
    "email": "adminmax@mammeto.it",
    "image": "https://randomuser.me/api/portraits/lego/6.jpg",
    "status": "Active",
    "creationDate": "2022-02-18T17:10:05.162Z",
    "modificationDate": "2022-02-18T17:10:05.162Z",
    "notifications": [],
    "lastLogin": "2022-02-22T08:40:33.162Z",
    "__v": 20,
    "lastOnline": "2022-02-22T17:34:21.040Z",
    "token": _TEMPTOKEN
}

const UserManager = (props) => {

    const [loggedUserData, setLoggedUserData] = useState({});

    // The following functions are to be passed down as context.functions()
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
        setLoggedUserData(response);
    }

    async function logoutUserFunc() {
        let response = await axiosPost('/user/logout', {}, loggedUserData.token);
        console.log(response);
        setLoggedUserData({
            "_id": "",
            "username": "",
            "password": "",
            "email": "",
            "image": null,
            "token": ""
        });
    }

    async function registerNewUserFunc(newUserObj) {
        console.log(newUserObj);
        let response = await axiosPost('/user', newUserObj);
        console.log(response);
        let toSetInState = newUserObj;
        toSetInState.password = "HIDDEN";
        setLoggedUserData({
            newUserObj
        })
    }

    async function patchUserFunc(patchedUser, targetID) {
        console.log(patchedUser, targetID);
        let response = await axiosPatch(`/user/${targetID}`, patchedUser, loggedUserData._id);
        console.log(response);
        let toSetInState = patchedUser;
        toSetInState.password = "HIDDEN";
        setLoggedUserData({
            patchedUser
        })
    }

    useEffect(() => {
        setLoggedUserData(fakeUser);
        if (loggedUserData._id === "") {

        }

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
            jwtToken: loggedUserData.token,
            userData: loggedUserData,
        }}>
            {/* If the user is loggedin, the rest of the app is shown */}
            {loggedUserData._id !== "" ? props.children : <LoginForm />}
        </LoggedUserContext.Provider>
    )
}

UserManager.defaultProps = {

}

export default UserManager;
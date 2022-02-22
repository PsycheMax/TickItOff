import React, { useState, useEffect } from 'react';
import { axiosPost } from '../../utils/APIManager';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const LoggedUserContext = React.createContext({
    loginUserFunc: (email, password) => { },
    logoutUserFunc: () => { },
    jwtToken: "",
    userData: {}
});

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
            "image": "",
            "token": ""
        });
    }

    useEffect(() => {
        if (loggedUserData._id === undefined) {

        }

        return () => {
            // This only runs on componentDestroy
        }
    }, []) //when empty, it only runs once

    return (
        <LoggedUserContext.Provider value={{
            loginUserFunc: loginUserFunc,
            logoutUserFunc: logoutUserFunc,
            jwtToken: loggedUserData.token,
            userData: loggedUserData,
        }}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}

UserManager.defaultProps = {

}

export default UserManager;
import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import axios from "axios";

import dotEnv from "../.env.js";

class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: "",
        }
        this.loginRequest = this.loginRequest.bind(this);
    }

    static defaultProps = {
        JWTToken: "",

    }

    async loginRequest(username, password) {
        let target = dotEnv.API_SERVER;
        let data = {
            "loginUser": {
                "password": "AdminMax",
                "email": "AdminMax".toLowerCase()
            }
        };
        console.log(target);
        let toSetInState = await axios.post(`${target}/user/login`, data);
        console.log(toSetInState.data);
        this.setState((prevState) => { return { JWTToken: toSetInState.data.token } });
    }

    render() {
        return (
            <View>
                <Text>
                    Ciao
                    {dotEnv.API_TOKEN}
                </Text>
                <Text style={tailwind("bg-blue-500 px-5 py-3 rounded-full")}>
                    {this.state.JWTToken}
                </Text>
                <Button onPress={this.loginRequest} > UFFA </Button>
            </View>
        )
    }
}

export default UserManager;

// EXAMPLE of returned object after login
/* {
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
    "password": "$2a$10$pndpSqfT2S2hpxdWMzAQE.CJqR0C9HwU8rKzF6wh1AxqtsS1IbsNi",
    "email": "adminmax",
    "image": "AdminMax",
    "status": "Active",
    "creationDate": "2022-02-18T17:10:05.162Z",
    "modificationDate": "2022-02-18T17:10:05.162Z",
    "notifications": [],
    "lastLogin": "2022-02-19T12:50:54.043Z",
    "__v": 20,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwZmQyZWRjN2VmZmIwYWJiMDdjY2JmIiwiZW1haWwiOiJhZG1pbm1heCIsImlhdCI6MTY0NTI3NTA1NCwiZXhwIjoxNjQ1Mjc4NjU0fQ.D3uOIrFlMRPBBN2fYLxwQLGCCmtYMvGuIltrhFv3mF0"
}
*/
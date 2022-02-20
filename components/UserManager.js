import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, TextInput } from "react-native";
import tailwind from "tailwind-rn";
import axios from "axios";

import { setInStorage, getFromStorage } from '../utils/StorageManager.js';
import dotEnv from "../.env.js";

class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: "",
            email: "",
            password: "",
            mammeta: "UFF"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginRequest = this.loginRequest.bind(this);

    }

    static defaultProps = {
        JWTToken: "",

    }

    handleChange(value, name) {
        this.setState({ [name]: value })
    }

    async componentDidUpdate() {
        if (this.state.JWTToken) {
            this.setState({ mammeta: await getFromStorage("jwt-token") })
        }
    }

    async handleSubmit(event) {
        if (this.state.email && this.state.password) {
            await this.loginRequest();
            console.log(localStorage.getItem('jwt-token'));
        }
    }

    async loginRequest() {
        let target = dotEnv.API_SERVER;
        let data = {
            "loginUser": {
                "password": this.state.password,
                "email": this.state.email
            }
        };
        let toSetInState = await axios.post(`${target}/user/login`, data);
        console.log(toSetInState.data);
        setInStorage("jwt-token", toSetInState.data.token);

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
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={this.handleChange}
                    name="email"
                    value={this.state.email}
                    placeholder="Enter your email"
                    autocomplete={"email"}
                    autocorrect={false}
                    autofocus={true}
                    onChangeText={(value) => { this.handleChange(value, "email") }}

                />
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={this.handleChange}
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    autocomplete={"password"}
                    autocorrect={false}
                    onChangeText={(value) => { this.handleChange(value, "password") }}

                />
                <Button onPress={this.handleSubmit} title={"Mammeta"} > GLIES </Button>
                <Text>
                    {this.state.mammeta}
                </Text>
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
            ...                     ,
            "620fdd072c14c2e8023aa11d"
        ],
        "assigned": [],
        "managed": [
            "620fd98f61e1927c9ff2a1b1",
            ...,
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
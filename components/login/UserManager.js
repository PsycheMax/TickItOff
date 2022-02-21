import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, TextInput } from "react-native";
import tailwind from "tailwind-rn";

import { setInStorage, getFromStorage } from '../../utils/StorageManager.js';
import { axiosPost } from '../APIManager.js';


class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: undefined,
            email: "",
            password: "",
            loggedUserData: undefined
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

    async componentDidMount() {
        console.log("in CompUpdate");
        if (this.state.JWTToken === undefined) {
            console.log("JWT UNdefined")
            let localSessionStored = await getFromStorage("jwt-token");
            if (localSessionStored !== null) {
                console.log("LocalSession not null");
                this.setState({ JWTToken: localSessionStored });
            }
        }
        if (this.state.loggedUserData === undefined) {
            console.log("Logged userdata undefined");
            let userDataInStorage = await getFromStorage("loggedUserData");
            userDataInStorage = JSON.parse(userDataInStorage);
            console.log(userDataInStorage);
            if (userDataInStorage !== null) {
                console.log("UserDataInStorage not null");
                this.setState({ loggedUserData: userDataInStorage });
            }
        }
    }

    async handleSubmit(event) {
        if (this.state.email && this.state.password) {
            await this.loginRequest();
            console.log(localStorage.getItem('jwt-token'));
        }
    }

    async loginRequest() {
        let data = {
            "loginUser": {
                "password": this.state.password,
                "email": this.state.email
            }
        };
        let toSetInState = await axiosPost('/user/login', data);
        await setInStorage("jwt-token", toSetInState.data.token);
        await setInStorage("loggedUserData", JSON.stringify(toSetInState.data));
        this.setState((prevState) => { return { JWTToken: toSetInState.data.token, loggedUserData: toSetInState.data } });
    }

    render() {
        return (
            <View>
                <Text>
                    Ciao {this.state.loggedUserData ? this.state.loggedUserData.username : ", please login"}
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
                    {this.state.JWTToken}
                </Text>
                {this.props.children}
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
    "password": "",
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
import React, { Component } from 'react';
import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import UserManager from './UserManager';


class AppManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: "",

        }
    }

    render() {
        return (
            <Text>
                {/* Ciao
                {this.state.mammeta ? "Mammeta" : ""} */}
                <UserManager />
            </Text>
        )
    }
}

export default AppManager;

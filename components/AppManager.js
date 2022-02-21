import React, { Component } from 'react';
import { View } from "react-native";
import tailwind from "tailwind-rn";


class AppManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: "",

        }
    }

    render() {
        return (
            <View>
                {this.props.children}
            </View>
        )
    }
}

export default AppManager;

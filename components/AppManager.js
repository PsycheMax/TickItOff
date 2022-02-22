import React, { Component } from 'react';
import { View, ImageBackground, Image } from "react-native";
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

            <View style={tailwind("flex-1 items-center justify-center")}>
                {this.props.children}
            </View>

        )
    }
}

export default AppManager;

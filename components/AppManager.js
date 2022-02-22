import React, { Component } from 'react';
import { View, ImageBackground, Image, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";


const basicStyle = StyleSheet.create({
    typography: {
        color: "#FFFFFF",
        fontSize: 32
    },
})
// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const StylesContext = React.createContext({
    base: {}
});


class AppManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWTToken: "",

        }
    }

    render() {
        return (
            <StylesContext.Provider value={{
                base: basicStyle
            }}>
                <View style={tailwind("flex-1 items-center justify-center text-white")}>
                    {this.props.children}
                </View>
            </StylesContext.Provider>

        )
    }
}

export default AppManager;
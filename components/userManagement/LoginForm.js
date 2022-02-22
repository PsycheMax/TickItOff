import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { LoggedUserContext } from './UserManager';
import tailwind from 'tailwind-rn';

const LoginForm = (props) => {
    // The loginUserObj for the API is loginUser:{email:"", password:""}
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    // Context here is necessary to call the login and logout functions
    const context = useContext(LoggedUserContext);

    function handleChange(value, fieldName) {
        setLoginUser(prevState => { return { ...prevState, [fieldName]: value } })
    }

    function handleLogin() {
        context.loginUserFunc(loginUser.email, loginUser.password);
    }

    function handleLogout() {
        context.logoutUserFunc();
    }

    function handleAdminLogin() {
        context.loginUserFunc("AdminMax", "AdminMax");
    }

    if (context.jwtToken) {
        return (
            <View >
                <View style={tailwind("justify-center self-center w-96 h-full")}>
                    <Text>Welcome {context.userData.username}</Text>
                    <Button onPress={handleLogout} title={"Logout"} >Logout</Button>
                </View>
            </View>
        )
    } else {
        return (
            <View style={tailwind("justify-center self-center w-3/4 h-3/5 flex")}>
                <Button onPress={handleAdminLogin} title={"AdminLogin"}>Admin Login</Button>
                <TextInput
                    style={tailwind("w-full border-2 border-indigo-200 h-12 rounded-xl px-2 my-3 text-white")}
                    onChangeText={handleChange}
                    name="email"
                    value={loginUser.email}
                    placeholder="Email"
                    autocomplete={"email"}
                    autocorrect={false}
                    autofocus={true}
                    onChangeText={(value) => { handleChange(value, "email") }}

                />
                <TextInput
                    style={tailwind("w-full border-2 border-indigo-200 h-12 rounded-xl px-2 my-3 text-white")}
                    onChangeText={handleChange}
                    name="password"
                    value={loginUser.password}
                    placeholder="Password"
                    autocomplete={"password"}
                    autocorrect={false}
                    onChangeText={(value) => { handleChange(value, "password") }}

                />
                <View style={styles.buttonContainer}>
                    <Button
                        // style={tailwind("w-6 max-w-sm")}
                        style={styles.button}
                        onPress={handleLogin}
                        title={"Login"}

                    > Login </Button>
                </View>
            </View>
        )
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    button: {
        // width: '75%'
        backgroundColor: '#654987',
        color: "#654978",

    },
    buttonContainer: {
        maxWidth: '65%',
        width: '60%',
        height: 15,
        alignSelf: 'center'
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})
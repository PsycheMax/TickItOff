import React, { useState, useContext, useEffect, useRef, createRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ThemeContext } from '../../../utils/ThemeManager';
import Logo from '../../logo/Logo';
import MoreInfoLink from '../../about/MoreInfoLink';

// MoveThis into some UserManagemetn Context, - same in SIGNUPFORM
const inputRules = {
    email: {
        minLength: 4,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    password: {
        minLength: 4,
        regEx: ``
    }
}

const LoginForm = (props) => {

    const theme = useContext(ThemeContext);

    var styles = StyleSheet.create({
        loginFormContainer: {
            height: theme.dimensions.screenHeight,
            width: "100%",
            // backgroundColor: theme.colors.secondary[50],
            alignItems: "center"
        },
        loginFormBackground: {
            height: "85%",
            minHeight: 750,
            width: theme.dimensions.screenWidth,
            backgroundColor: theme.colors.primary[500],
            borderBottomLeftRadius: theme.dimensions.screenWidth,
            borderBottomRightRadius: theme.dimensions.screenWidth,
            alignItems: "center"
        },
        logoContainer: {
            paddingTop: 16
        },
        formBox: {

        },
        textBoxDimensions: {
            paddingTop: 16,
            paddingBottom: 8,
            minWidth: theme.dimensions.methods.moderateScale(275),
            fontSize: Platform.OS === "web" ? 24 : 18,
            color: theme.colors.secondary[50]
        },
        inputField: {

            maxWidth: theme.dimensions.windowWidth * 0.80,
            color: theme.colors.quartiary[50],
            borderColor: theme.colors.quartiary[300],
            backgroundColor: theme.colors.primary[600],
            borderWidth: 2,
            fontSize: 18,
            height: 64,
            minHeight: 64,
            marginVertical: 14,
            padding: 16
        },
        passwordContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16
        },
        passwordInput: {
            // minWidth: theme.dimensions.screenWidth * 0.70,
            maxWidth: theme.dimensions.screenWidth * 0.70,
            fontSize: 18,
            color: theme.colors.secondary[50],
            height: "100%",
            minHeight: 48,
            width: "100%",
            marginLeft: -3
        },
        showPasswordButtonContainer: {
            marginLeft: -8
        },
        errorMessage: {
            color: theme.colors.tertiary[300],
            textAlignVertical: "center"
        },
        buttonContainer: {
            paddingTop: theme.dimensions.methods.moderateScale(16)
        },
        linkContainer: {
            paddingTop: theme.dimensions.methods.moderateVerticalScale(24)
        },
        link: {
            color: theme.colors.tertiary[300]
        },
        ...theme.styles.text
    })

    // The loginUserObj for the API is loginUser:{email:"", password:""}
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const emailField = createRef();
    const passwordField = createRef();

    const [showPassword, setShowPassword] = useState(false);
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(false);
    const [alertMessages, setAlertMessages] = useState({
        email: {
            show: false,
            content: "Alert goes here"
        },
        password: {
            show: false,
            content: "Alert goes here"
        },
        genericForm: {
            show: false,
            content: "Alert goes here"
        },
    })

    // Context here is necessary to call the login and logout functions
    const userDataContext = useContext(LoggedUserContext);

    function handleChange(value, fieldName) {
        setLoginUser(prevState => { return { ...prevState, [fieldName]: value } })
    }

    async function handleLogin() {
        setIsWaitingForAPI(true);
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        loginUser.email.length < inputRules.email.minLength ? toSetInAlertMessages.email = {
            show: true,
            content: `Email must be at least ${inputRules.email.minLength} characters long`
        } : toSetInAlertMessages.email = { show: false, content: "Alert goes here" };
        loginUser.password.length < inputRules.password.minLength ? toSetInAlertMessages.password = {
            show: true,
            content: `Passwords must be at least ${inputRules.password.minLength} characters long`
        } : toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        setAlertMessages(toSetInAlertMessages);


        if (loginUser.email.length >= inputRules.email.minLength && loginUser.password.length >= inputRules.password.minLength) {

            // const response = await userDataContext.loginUserFunc(loginUser.email, loginUser.password);
            const response = await userDataContext.loginUserFunc(loginUser.email, loginUser.password);
            if (response.status !== 200) {

                console.log(response);
                setAlertMessages({ ...toSetInAlertMessages, genericForm: { show: true, content: response.data } });
            } else {

                // props.navigation.navigate('ProjectSelector');
            }
        }
        setIsWaitingForAPI(false);
    }

    function handleLinkClick() {
        props.navigation.navigate('SignUp');
    }

    return (
        <View style={styles.loginFormContainer}>
            <View style={styles.loginFormBackground}>
                <View style={styles.logoContainer}>
                    <Logo size="full" color="white" />
                </View>

                <View style={styles.formBox}>
                    <Text style={[styles.textBoxDimensions, styles.headerFont]}>
                        Insert your email address
                    </Text>
                    <TextInput autoFocus={true} autoComplete='email' ref={emailField}
                        placeholder={"Email address"} placeholderTextColor={theme.colors.secondary[300]}
                        textContentType={"emailAddress"}
                        style={styles.inputField}
                        value={loginUser.email}
                        onSubmitEditing={handleLogin}
                        onChangeText={(value) => { handleChange(value, "email") }}
                        editable={!isWaitingForAPI}
                    />
                    {alertMessages.email.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.email.content ? alertMessages.email.content : undefined}
                    </Text> : undefined}
                    <Text style={[styles.textBoxDimensions, styles.headerFont]}>
                        Insert your password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password' ref={passwordField}
                            placeholder={"Password"} placeholderTextColor={theme.colors.secondary[300]}
                            textContentType={"password"}
                            style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                            value={loginUser.password}
                            onSubmitEditing={handleLogin}
                            onChangeText={(value) => { handleChange(value, "password") }}
                            editable={!isWaitingForAPI}
                        />
                        {/* THE WIDTH AND HEIGHT HAS TO BE SET TO SIZE-1 OTHERWISE EVERYTHING IS OFFSET */}
                        <MaterialIcons size={24} style={[styles.showPasswordButtonContainer, { height: 24 - 1, width: 24 - 1 }]}
                            name="remove-red-eye" color={theme.colors.primary[100]}
                            onPress={() => { setShowPassword(!showPassword) }}
                        />
                    </View>

                    {alertMessages.password.show ? <Text style={styles.errorMessage}>
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.password.content ? alertMessages.password.content : undefined}
                    </Text> : undefined}
                    {alertMessages.genericForm.show ? <Text style={styles.errorMessage}>
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.genericForm.content ? alertMessages.genericForm.content : undefined}
                    </Text> : undefined}

                    <View style={styles.linkContainer}>
                        <Text style={styles.link} onPress={handleLinkClick}>
                            Don't have an account? Click here!
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title={isWaitingForAPI ? 'Please wait' : 'Login'}
                            color={theme.colors.tertiary[600]}
                            accessibilityLabel="Submit Form"
                            onPress={handleLogin}
                        />
                    </View>

                </View>

            </View>
            <MoreInfoLink />
        </View>

    )
}


export default LoginForm;
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ThemeContext } from '../../../utils/ThemeManager';
import Logo from '../../logo/Logo';

// Move this into some UserAction or UserManagement Context
const inputRules = {
    email: {
        minLength: 8,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    username: {
        minLength: 8,
        regEx: `^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$`
    },
    password: {
        minLength: 8,
        regEx: ``
    }
}

const SignUpForm = (props) => {

    const theme = useContext(ThemeContext);

    var styles = StyleSheet.create({
        loginFormContainer: {
            // height: "200%",
            width: "100%",
            backgroundColor: theme.colors.primary[700],
            alignItems: "center"
        },
        loginFormBackground: {
            // height: "140%",
            width: theme.dimensions.screenWidth,
            backgroundColor: theme.colors.primary[700],
            alignItems: "center"
        },
        logoContainer: {
            paddingTop: 16
        },
        formBox: {
            // paddingTop: "5%",
        },
        heading: {
            color: theme.colors.secondary[50],
            fontSize: Platform.OS === "web" ? 26 : 22,
            fontSize: 16,
            paddingTop: 16,
            paddingBottom: 8,
            minWidth: 275
        },
        signUp: {
            fontSize: Platform.OS === "web" ? 28 : 24,
            fontWeight: "600"
        },
        inputField: {
            maxWidth: theme.dimensions.windowWidth * 0.80,
            color: theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[50],
            borderColor: theme.colors.quartiary[300],
            // backgroundColor: theme.colors.primary[600],
            borderWidth: 2,
            fontSize: 18,
            height: 48,
            minHeight: 48,
            marginTop: 12,
            marginBottom: 12,
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
            width: "100%",
            height: "100%",
            minHeight: 48,
        },
        showPasswordButtonContainer: {

        },
        errorMessage: {
            color: theme.colors.tertiary[300],
            textAlignVertical: "center"
        },
        buttonContainer: {
            paddingTop: 16
        },
        linkContainer: {
            paddingVertical: 32
        },
        link: {
            color: theme.colors.tertiary[300]
        }
    })

    // The loginUserObj for the API is newUser:{username:"",email:"", password:"", image:""}
    const [newUser, setNewUser] = useState({ email: "", password: "", passwordRepeat: "", username: "", image: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [identicalPasswords, setIdenticalPasswords] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        email: {
            show: false,
            content: "Alert goes here"
        },
        password: {
            show: false,
            content: "Alert goes here"
        },
        image: {
            show: false,
            content: "Alert goes here"
        },
        username: {
            show: false,
            content: "Alert goes here"
        },
        genericForm: {
            show: false,
            content: "Alert goes here"
        },
    })

    const userDataContext = useContext(LoggedUserContext);

    function checkFields() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        newUser.email.length < inputRules.email.minLength ? toSetInAlertMessages.email = {
            show: true,
            content: `Email must be at least ${inputRules.email.minLength} characters long`
        } : toSetInAlertMessages.email = { show: false, content: "Alert goes here" };
        newUser.password.length < inputRules.password.minLength ? toSetInAlertMessages.password = {
            show: true,
            content: `Passwords must be at least ${inputRules.password.minLength} characters long`
        } : toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        newUser.username.length < inputRules.username.minLength ? toSetInAlertMessages.username = {
            show: true,
            content: `Username must be at least ${inputRules.username.minLength} characters long`
        } : toSetInAlertMessages.username = { show: false, content: "Alert goes here" };
        newUser.image.length === 0 ? toSetInAlertMessages.image = {
            show: true, content: "Image cannot be empty"
        } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setNewUser(prevState => { return { ...prevState, [fieldName]: value } });
    }

    useEffect(() => {
        if (newUser.password !== null) {
            if (newUser.password === newUser.passwordRepeat) {
                if (!identicalPasswords) {
                    setIdenticalPasswords(true);
                    setAlertMessages({ ...alertMessages, password: { show: false, content: "Alert goes here" } });
                }
            } else {
                if (identicalPasswords) {
                    setIdenticalPasswords(false);
                    setAlertMessages({ ...alertMessages, password: { show: true, content: "Passwords do not match" } })
                }
            }
        }
    })


    async function handleRegistration() {
        let toSetInAlertMessages = alertMessages;
        if (newUser.email.length >= inputRules.email.minLength) {
            if (newUser.username.length >= inputRules.username.minLength) {
                if (newUser.password.length >= inputRules.password.minLength) {
                    if (identicalPasswords) {



                        const response = await userDataContext.registerNewUserFunc(newUser);
                        if (response.status !== 201) {

                            toSetInAlertMessages.email = { show: true, content: response.data };
                            toSetInAlertMessages.genericForm = { show: true, content: response.data }
                        }
                        if (response.status === 201) {
                            props.navigation.navigate('Home');
                        }
                    } else {
                        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                    }
                } else {
                    toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();

    }

    function handleLinkClick() {
        props.navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView behavior='padding' >
            <ScrollView contentContainerStyle={styles.loginFormContainer}>
                <View style={styles.loginFormBackground}>
                    <View style={styles.logoContainer}>
                        <Logo size="full" color="white" />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={[styles.heading, styles.signUp]}>
                            Sign up, it's free!
                        </Text>
                        <Text style={styles.heading}>
                            Insert your email address
                        </Text>
                        <TextInput autoFocus={true} autoComplete='email'
                            placeholder={"Email address"} placeholderTextColor={theme.colors.secondary[300]}
                            textContentType={"emailAddress"}
                            style={styles.inputField}
                            value={newUser.email}
                            onChangeText={(value) => { handleChange(value, "email") }}
                        />
                        {alertMessages.email.show ? <Text style={styles.errorMessage} >
                            <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                            {alertMessages.email.content ? alertMessages.email.content : undefined}
                        </Text> : undefined}
                        <Text style={styles.heading}>
                            Insert your preferred username
                        </Text>
                        <TextInput autoFocus={true} autoComplete={"username-new"}
                            placeholder={"Username"} placeholderTextColor={theme.colors.secondary[300]}
                            textContentType={"username"}
                            style={styles.inputField}
                            value={newUser.username}
                            onChangeText={(value) => { handleChange(value, "username") }}
                        />
                        {alertMessages.username.show ? <Text style={styles.errorMessage} >
                            <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                            {alertMessages.username.content ? alertMessages.username.content : undefined}
                        </Text> : undefined}
                        <Text style={styles.heading}>
                            Insert your new password
                        </Text>
                        <View style={[styles.inputField, styles.passwordContainer]}>
                            <TextInput
                                autoComplete='password-new'
                                placeholder={"Password"} placeholderTextColor={theme.colors.secondary[300]}
                                textContentType={"newPassword"}
                                style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                                value={newUser.password}
                                onChangeText={(value) => { handleChange(value, "password") }}
                            />
                            {/* THE WIDTH AND HEIGHT HAS TO BE SET TO SIZE-1 OTHERWISE EVERYTHING IS OFFSET */}
                            <MaterialIcons size={24} style={[styles.showPasswordButtonContainer, { height: 24 - 1, width: 24 - 1 }]}
                                name="remove-red-eye" color={theme.colors.primary[100]}
                                onPress={() => { setShowPassword(!showPassword) }}
                            />
                        </View>

                        <Text style={styles.heading}>
                            Repeat the password
                        </Text>
                        <View style={[styles.inputField, styles.passwordContainer]}>
                            <TextInput
                                autoComplete={'password-new'}
                                placeholder={"Repeat password"} placeholderTextColor={theme.colors.secondary[300]}
                                textContentType={"newPassword"}
                                style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                                value={newUser.passwordRepeat}
                                onChangeText={(value) => { handleChange(value, "passwordRepeat") }}
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

                        <View style={styles.buttonContainer}>
                            <Button
                                title='Create new account' color={theme.colors.tertiary[600]}
                                accessibilityLabel="Submit Form for user creation"
                                onPress={handleRegistration}
                            />
                        </View>

                        <View style={styles.linkContainer}>
                            <Text style={styles.link} onPress={handleLinkClick}>
                                Already have an account? Click here!
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpForm;
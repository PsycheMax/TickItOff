import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Button, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ThemeContext } from '../../../utils/ThemeManager';

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
// Username, PW, EMAIL, IMAGE
const EditUserForm = (props) => {

    const userDataContext = useContext(LoggedUserContext);

    const theme = useContext(ThemeContext);

    var styles = StyleSheet.create({
        loginFormContainer: {
            // height: "100%",
            width: "100%",
            backgroundColor: theme.colors.primary[500],
            alignItems: "center"
        },
        loginFormBackground: {
            // minHeight: 750,
            width: theme.dimensions.screenWidth,
            alignItems: "center"
        },
        textBoxDimensions: {
            paddingTop: 8,
            paddingBottom: 4,
            minWidth: theme.dimensions.methods.moderateScale(275),
            fontSize: Platform.OS === "web" ? 26 : 22,
            color: theme.colors.primary[800],
        },
        whiteText: {
            color: theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[50],
        },
        textBold: {
            fontWeight: "600",
            fontSize: Platform.OS === "web" ? 28 : 24,
        },
        inputField: {
            maxWidth: theme.dimensions.windowWidth * 0.80,
            color: theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[50],
            borderColor: theme.colors.quartiary[300],
            borderWidth: 2,
            fontSize: 18,
            height: 48,
            minHeight: 48,
            paddingLeft: 16
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
        }
    })

    // The patchUserObj for the API is {patchedUser:{username:"",email:"", password:"", image:""}}
    const [patchedUser, setPatchedUser] = useState({
        email: userDataContext.userData.email,
        oldPassword: "",
        password: "",
        passwordRepeat: "",
        username: userDataContext.userData.username,
        image: userDataContext.userData.image
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [identicalPasswords, setIdenticalPasswords] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        email: {
            show: false,
            content: "Alert goes here"
        },
        oldPassword: {
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
            content: "Alert goes here",
            success: false
        },
    })

    function checkFields() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        patchedUser.email.length < inputRules.email.minLength ? toSetInAlertMessages.email = {
            show: true,
            content: `Email must be at least ${inputRules.email.minLength} characters long`
        } : toSetInAlertMessages.email = { show: false, content: "Alert goes here" };
        patchedUser.oldPassword.length < inputRules.password.minLength ? toSetInAlertMessages.oldPassword = {
            show: true,
            content: `Passwords must be at least ${inputRules.password.minLength} characters long`
        } : toSetInAlertMessages.oldPassword = { show: false, content: "Alert goes here" };
        patchedUser.username.length < inputRules.username.minLength ? toSetInAlertMessages.username = {
            show: true,
            content: `Username must be at least ${inputRules.username.minLength} characters long`
        } : toSetInAlertMessages.username = { show: false, content: "Alert goes here" };
        patchedUser.image.length === 0 ? toSetInAlertMessages.image = {
            show: true, content: "Image cannot be empty"
        } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        if (patchedUser.password.length !== 0 && patchedUser.passwordRepeat.length !== 0) {
            patchedUser.password.length < inputRules.password.minLength ? toSetInAlertMessages.password = {
                show: true,
                content: `Passwords must be at least ${inputRules.password.minLength} characters long`
            } : toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        } else {
            toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setPatchedUser(prevState => { return { ...prevState, [fieldName]: value } });
    }

    useEffect(() => {
        if (patchedUser.password !== null) {
            if (patchedUser.password === patchedUser.passwordRepeat) {
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


    async function handlePatching() {
        let toSetInAlertMessages = alertMessages;
        toSetInAlertMessages.genericForm = { show: false, content: "Alert goes here" };
        if (patchedUser.email.length >= inputRules.email.minLength) {
            if (patchedUser.username.length >= inputRules.username.minLength) {
                if ((patchedUser.password.length === 0 && patchedUser.passwordRepeat.length === 0) || patchedUser.password.length >= inputRules.password.minLength) {
                    if (identicalPasswords) {
                        if (patchedUser.image.length !== 0) {
                            const response = await userDataContext.patchUserFunc(patchedUser, userDataContext.userData._id);
                            if (response.status !== 200) {
                                switch (response.status) {
                                    case 401:
                                        toSetInAlertMessages.oldPassword = { show: true, content: response.data, success: false };
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 403:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 404:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 500:
                                    default:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                }
                            } else {
                                toSetInAlertMessages.genericForm = { show: true, content: "You successfully updated your profile", success: true };
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
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();
    }

    return (
        <ScrollView contentContainerStyle={styles.loginFormContainer}>
            <View style={styles.loginFormBackground}>

                <View style={styles.formBox}>
                    <Text style={[styles.textBoxDimensions, styles.textBold, styles.whiteText]}>
                        Modify your account
                    </Text>
                    <Text style={[styles.textBoxDimensions, styles.whiteText]}>
                        Email address
                    </Text>
                    <TextInput autoFocus={true} autoComplete='email'
                        placeholder={"Email address"} placeholderTextColor={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[500]}
                        textContentType={"emailAddress"}
                        style={styles.inputField}
                        value={patchedUser.email}
                        onChangeText={(value) => { handleChange(value, "email") }}
                    />
                    {alertMessages.email.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.email.content ? alertMessages.email.content : undefined}
                    </Text> : undefined}
                    <Text style={[styles.textBoxDimensions, styles.whiteText]}>
                        Username
                    </Text>
                    <TextInput autoFocus={true} autoComplete={"username-new"}
                        placeholder={"Username"} placeholderTextColor={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[500]}
                        textContentType={"username"}
                        style={styles.inputField}
                        value={patchedUser.username}
                        onChangeText={(value) => { handleChange(value, "username") }}
                    />
                    {alertMessages.username.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.username.content ? alertMessages.username.content : undefined}
                    </Text> : undefined}

                    <Text style={[styles.textBoxDimensions, styles.whiteText]}>
                        Old password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password'
                            placeholder={"Old password"} placeholderTextColor={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[500]}
                            textContentType={"password"}
                            style={styles.passwordInput} secureTextEntry={showOldPassword ? false : true}
                            value={patchedUser.oldPassword}
                            onChangeText={(value) => { handleChange(value, "oldPassword") }}
                        />
                        {/* THE WIDTH AND HEIGHT HAS TO BE SET TO SIZE-1 OTHERWISE EVERYTHING IS OFFSET */}
                        <MaterialIcons size={24} style={[styles.showPasswordButtonContainer, { height: 24 - 1, width: 24 - 1 }]}
                            name="remove-red-eye" color={theme.colors.primary[100]}
                            onPress={() => { setShowOldPassword(!showOldPassword) }}
                        />
                    </View>
                    {alertMessages.oldPassword.show ? <Text style={styles.errorMessage}>
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.oldPassword.content ? alertMessages.oldPassword.content : undefined}
                    </Text> : undefined}

                    <Text style={[styles.textBoxDimensions, styles.whiteText]}>
                        New password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password-new'
                            placeholder={"New Password"} placeholderTextColor={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[500]}
                            textContentType={"newPassword"}
                            style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                            value={patchedUser.password}
                            onChangeText={(value) => { handleChange(value, "password") }}
                        />
                        {/* THE WIDTH AND HEIGHT HAS TO BE SET TO SIZE-1 OTHERWISE EVERYTHING IS OFFSET */}
                        <MaterialIcons size={24} style={[styles.showPasswordButtonContainer, { height: 24 - 1, width: 24 - 1 }]}
                            name="remove-red-eye" color={theme.colors.primary[100]}
                            onPress={() => { setShowPassword(!showPassword) }}
                        />
                    </View>

                    <Text style={[styles.textBoxDimensions, styles.whiteText]}>
                        Repeat the new password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete={'password-new'}
                            placeholder={"Repeat password"} placeholderTextColor={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[500]}
                            textContentType={"newPassword"}
                            style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                            value={patchedUser.passwordRepeat}
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
                            title='Save changes' color={theme.colors.tertiary[600]}
                            accessibilityLabel="Submit form to edit your user account"
                            onPress={handlePatching}
                        />
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default EditUserForm;
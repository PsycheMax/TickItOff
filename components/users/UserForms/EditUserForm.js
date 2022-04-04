import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Button } from 'react-native';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ThemeContext } from '../../../utils/ThemeManager';

import { MaterialIcons } from '@expo/vector-icons';
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
// Username, PW, EMAIL, IMAGE
const EditUserForm = (props) => {

    const userDataContext = useContext(LoggedUserContext);

    const theme = useContext(ThemeContext);

    var styles = StyleSheet.create({
        loginFormContainer: {
            // height: "100%",
            width: "100%",
            backgroundColor: theme.colors.primary[700],
            alignItems: "center"
        },
        loginFormBackground: {
            // height: "100%",
            minHeight: 750,
            width: theme.dimensions.screenWidth,
            // borderBottomLeftRadius: theme.dimensions.screenWidth,
            // borderBottomRightRadius: theme.dimensions.screenWidth,
            alignItems: "center"
        },
        logoContainer: {
            paddingTop: 16
        },
        formBox: {

        },
        heading: {
            color: theme.colors.secondary[50],
            fontSize: theme.dimensions.methods.moderateScale(16),
            paddingTop: theme.dimensions.methods.moderateScale(16),
            paddingBottom: theme.dimensions.methods.moderateScale(8),
            minWidth: theme.dimensions.methods.moderateScale(275)
        },
        inputField: {
            maxWidth: theme.dimensions.windowWidth * 0.80,
            color: theme.colors.secondary[50],
            borderColor: theme.colors.secondary[300],
            backgroundColor: theme.colors.primary[600],
            borderWidth: 2,
            fontSize: 18,
            height: theme.dimensions.methods.moderateVerticalScale(48),
            minHeight: theme.dimensions.methods.moderateVerticalScale(48),
            marginTop: theme.dimensions.methods.moderateVerticalScale(12),
            marginBottom: theme.dimensions.methods.moderateVerticalScale(12),
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
            minHeight: theme.dimensions.methods.moderateVerticalScale(48),
            width: "100%"
        },
        showPasswordButtonContainer: {

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
                    <Text style={[styles.heading, styles.signUp]}>
                        Modify your account
                    </Text>
                    <Text style={styles.heading}>
                        Email address
                    </Text>
                    <TextInput autoFocus={true} autoComplete='email'
                        placeholder={"Email address"} placeholderTextColor={theme.colors.secondary[300]}
                        textContentType={"emailAddress"}
                        style={styles.inputField}
                        value={patchedUser.email}
                        onChangeText={(value) => { handleChange(value, "email") }}
                    />
                    {alertMessages.email.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.email.content ? alertMessages.email.content : undefined}
                    </Text> : undefined}
                    <Text style={styles.heading}>
                        Username
                    </Text>
                    <TextInput autoFocus={true} autoComplete={"username-new"}
                        placeholder={"Username"} placeholderTextColor={theme.colors.secondary[300]}
                        textContentType={"username"}
                        style={styles.inputField}
                        value={patchedUser.username}
                        onChangeText={(value) => { handleChange(value, "username") }}
                    />
                    {alertMessages.username.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.username.content ? alertMessages.username.content : undefined}
                    </Text> : undefined}

                    <Text style={styles.heading}>
                        Old password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password'
                            placeholder={"Old password"} placeholderTextColor={theme.colors.secondary[300]}
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

                    <Text style={styles.heading}>
                        New password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password-new'
                            placeholder={"New Password"} placeholderTextColor={theme.colors.secondary[300]}
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

                    <Text style={styles.heading}>
                        Repeat the new password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete={'password-new'}
                            placeholder={"Repeat password"} placeholderTextColor={theme.colors.secondary[300]}
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
                            title='Modify your profile' color={theme.colors.tertiary[600]}
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
//     return (
//         <ScrollView maxHeight={"100%"} h={"100%"} mt={"0"} pt={"0"} >
//             <VStack h={"100%"} justifyContent={"center"} >
//                 <Center w="100%">
//                     <Box safeArea w="90%" maxW="290">
//                         <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
//                             color: "warmGray.50"
//                         }}>
//                             Edit your profile
//                         </Heading>

//                         <VStack space={3} >
//                             <FormField
//                                 isInvalid={alertMessages.username.show} isRequired={alertMessages.username.show} value={patchedUser.username} type="text"
//                                 autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "username") }}
//                                 inputRightElement={false}
//                                 text={{
//                                     label: "Public Username", name: "username", autocomplete: "username", placeholder: "Username", alertMessage: alertMessages.username.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>
//                             <FormField
//                                 isInvalid={alertMessages.email.show} isRequired={alertMessages.email.show} value={patchedUser.email} type="text"
//                                 autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "email") }}
//                                 inputRightElement={false}
//                                 text={{
//                                     label: "Email", name: "email", autocomplete: "email", placeholder: "Email", alertMessage: alertMessages.email.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>
//                             <FormField
//                                 isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={patchedUser.image} type="text"
//                                 autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
//                                 inputRightElement={false}
//                                 text={{
//                                     label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>
//                             <FormField
//                                 isInvalid={alertMessages.oldPassword.show} isRequired={alertMessages.oldPassword.show} value={patchedUser.oldPassword}
//                                 autocorrect={false} autofocus={true} type={showOldPassword ? "text" : "password"}
//                                 onChangeText={(value) => { handleChange(value, "oldPassword") }} showPasswordCommand={() => { setShowOldPassword(!showOldPassword) }}
//                                 inputRightElement={true} text={{
//                                     label: "Old Password", name: "oldPassword", autocomplete: "password", placeholder: "Old Password", alertMessage: alertMessages.oldPassword.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>
//                             <FormField
//                                 isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={patchedUser.password}
//                                 autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
//                                 onChangeText={(value) => { handleChange(value, "password") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
//                                 inputRightElement={true} text={{
//                                     label: "New Password", name: "password", autocomplete: "password", placeholder: "Password", alertMessage: alertMessages.password.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>
//                             <FormField
//                                 isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={patchedUser.passwordRepeat}
//                                 autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
//                                 onChangeText={(value) => { handleChange(value, "passwordRepeat") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
//                                 inputRightElement={true} text={{
//                                     label: "Repeat New Password", name: "password", placeholder: "Repeat Password", alertMessage: alertMessages.password.content,
//                                     iconName: "error"
//                                 }} >
//                             </FormField>

//                             <FormControl isInvalid={alertMessages.genericForm.show} >
//                                 <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name={alertMessages.genericForm.success ? "check-circle" : "error"} size={alertMessages.genericForm.success ? "sm" : "xs"} />}>
//                                     {alertMessages.genericForm.content}
//                                 </FormControl.ErrorMessage>
//                             </FormControl>

//                             <Button mt="2" colorScheme="indigo"
//                                 onPress={handlePatching} title={"patch"}>
//                                 Modify User
//                             </Button>
//                         </VStack>
//                     </Box>
//                 </Center>
//             </VStack >
//         </ScrollView >
//     )
// }

// export default EditUserForm;
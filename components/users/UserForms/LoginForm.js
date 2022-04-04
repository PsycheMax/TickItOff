import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ThemeContext } from '../../../utils/ThemeManager';

import { MaterialIcons } from '@expo/vector-icons';
import Logo from '../../logo/Logo';

// MoveThis into some UserManagemetn Context, - same in SIGNUPFORM
const inputRules = {
    email: {
        minLength: 8,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    password: {
        minLength: 8,
        regEx: ``
    }
}

const LoginForm = (props) => {

    const theme = useContext(ThemeContext);

    var styles = StyleSheet.create({
        loginFormContainer: {
            height: theme.dimensions.screenHeight,
            width: "100%",
            backgroundColor: theme.colors.secondary[50],
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

    // The loginUserObj for the API is loginUser:{email:"", password:""}
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
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

            const response = await userDataContext.loginUserFunc(loginUser.email, loginUser.password);
            if (response.status !== 200) {

                setAlertMessages({ ...toSetInAlertMessages, genericForm: { show: true, content: response.data } });
            } else {

                // props.navigation.navigate('ProjectSelector');
            }
        }
    }

    function handleAdminLogin() {
        userDataContext.loginUserFunc("AdminMax", "AdminMax");
        // props.navigation.navigate('ProjectSelector');
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
                    <Text style={styles.heading}>
                        Insert your email address
                    </Text>
                    <TextInput autoFocus={true} autoComplete='email'
                        placeholder={"Email address"} placeholderTextColor={theme.colors.secondary[300]}
                        textContentType={"emailAddress"}
                        style={styles.inputField}
                        value={loginUser.email}
                        onChangeText={(value) => { handleChange(value, "email") }}
                    />
                    {alertMessages.email.show ? <Text style={styles.errorMessage} >
                        <MaterialIcons name="error-outline" size={theme.dimensions.methods.scale(18)} color={theme.colors.tertiary[500]} />
                        {alertMessages.email.content ? alertMessages.email.content : undefined}
                    </Text> : undefined}
                    <Text style={styles.heading}>
                        Insert your password
                    </Text>
                    <View style={[styles.inputField, styles.passwordContainer]}>
                        <TextInput
                            autoComplete='password'
                            placeholder={"Password"} placeholderTextColor={theme.colors.secondary[300]}
                            textContentType={"password"}
                            style={styles.passwordInput} secureTextEntry={showPassword ? false : true}
                            value={loginUser.password}
                            onChangeText={(value) => { handleChange(value, "password") }}
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
                            title='Login' color={theme.colors.tertiary[600]}
                            accessibilityLabel="Submit Form"
                            onPress={handleLogin}
                        />
                    </View>

                    <View style={styles.linkContainer}>
                        <Text style={styles.link} onPress={handleLinkClick}>
                            Don't have an account? Click here!
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title='AdminLogin' color={theme.colors.tertiary[600]}
                            accessibilityLabel="Submit Form for user creation"
                            onPress={handleAdminLogin}
                        />
                    </View>

                </View>

            </View>
        </View>

    )
}


export default LoginForm;
//     return (
//         <VStack h={"100%"} justifyContent={"center"} w="full">
//             <Center w="100%">
//                 <Button onPress={handleAdminLogin} title={"AdminLogin"} mt="2" colorScheme='indigo'>Admin Login</Button>
//                 <Box safeArea p="2" py="8" w="90%" maxW="290">
//                     <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
//                         color: "warmGray.50"
//                     }}>
//                         Welcome
//                     </Heading>
//                     <Heading mt="1" _dark={{
//                         color: "warmGray.200"
//                     }} color="coolGray.600" fontWeight="medium" size="xs">
//                         Sign in to continue!
//                     </Heading>

//                     <VStack space={3} mt="5">
//                         <FormField
//                             isInvalid={alertMessages.email.show} isRequired={alertMessages.email.show} value={loginUser.email} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "email") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "Email", name: "email", autocomplete: "email", placeholder: "Email address", alertMessage: alertMessages.email.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={loginUser.password}
//                             autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
//                             onChangeText={(value) => { handleChange(value, "password") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
//                             inputRightElement={true} text={{
//                                 label: "Password", name: "password", autocomplete: "password", placeholder: "Password", alertMessage: alertMessages.password.content,
//                                 iconName: "error"
//                             }} >
//                             <Link _text={{
//                                 fontSize: "xs",
//                                 fontWeight: "500",
//                                 color: "indigo.500"
//                             }} alignSelf="flex-end" mt="1">
//                                 Forget Password?
//                             </Link>
//                         </FormField>

//                         <FormControl isInvalid={alertMessages.genericForm.show} >
//                             <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
//                                 {alertMessages.genericForm.content}
//                             </FormControl.ErrorMessage>
//                         </FormControl>
//                         <Button mt="2" colorScheme="indigo"
//                             onPress={handleLogin} title={"Login"}>
//                             Sign in
//                         </Button>
//                         <HStack mt="6" justifyContent="center">
//                             <Text fontSize="sm" color="coolGray.600" _dark={{
//                                 color: "warmGray.200"
//                             }}>
//                                 I'm a new user.{" "}
//                             </Text>
//                             <Link _text={{
//                                 color: "indigo.500",
//                                 fontWeight: "medium",
//                                 fontSize: "sm"
//                             }} onPress={handleLinkClick}>
//                                 Sign Up
//                             </Link>
//                         </HStack>
//                     </VStack>
//                 </Box>
//             </Center>
//         </VStack >
//     )
// }


// export default LoginForm;
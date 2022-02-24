import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Input, IconButton, Text, Center, Box, Heading, FormControl, Link, Icon } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";
import FormField from './FormField';

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
        console.log(toSetInAlertMessages);

        if (loginUser.email.length >= inputRules.email.minLength && loginUser.password.length >= inputRules.password.minLength) {
            console.log("LOGIN")
            const response = await userDataContext.loginUserFunc(loginUser.email, loginUser.password);
            if (response.status !== 200) {
                console.log(response.data);
                setAlertMessages({ ...toSetInAlertMessages, genericForm: { show: true, content: response.data } });
            }
        }
    }

    function handleAdminLogin() {
        userDataContext.loginUserFunc("AdminMax", "AdminMax");
    }

    function handleLinkClick() {
        props.showOtherFormFunc();
    }

    return (
        <VStack h={"100%"} justifyContent={"center"}>
            <Center w="100%">
                <Button onPress={handleAdminLogin} title={"AdminLogin"} mt="2" colorScheme='indigo'>Admin Login</Button>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormField
                            isInvalid={alertMessages.email.show} isRequired={alertMessages.email.show} value={loginUser.email} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "email") }}
                            inputRightElement={false}
                            text={{
                                label: "Email", name: "email", autocomplete: "email", placeholder: "Email address", alertMessage: alertMessages.email.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={loginUser.password}
                            autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
                            onChangeText={(value) => { handleChange(value, "password") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
                            inputRightElement={true} text={{
                                label: "Password", name: "password", autocomplete: "password", placeholder: "Password", alertMessage: alertMessages.password.content,
                                iconName: "error"
                            }} >
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormField>

                        <FormControl isInvalid={alertMessages.genericForm.show} >
                            <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                {alertMessages.genericForm.content}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo"
                            onPress={handleLogin} title={"Login"}>
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm a new user.{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={handleLinkClick}>
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </VStack >
    )
}


export default LoginForm;
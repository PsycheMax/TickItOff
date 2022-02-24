import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Icon, Text, Center, Box, Heading, FormControl, Link } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";
import FormField from './FormField';

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
const SignUpForm = (props) => {
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
                        if (newUser.image.length !== 0) {


                            const response = await userDataContext.registerNewUserFunc(newUser);
                            if (response.status !== 201) {
                                console.log(response.data);
                                toSetInAlertMessages.email = { show: true, content: response.data };
                                toSetInAlertMessages.genericForm = { show: true, content: response.data }
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

    function handleLinkClick() {
        props.showOtherFormFunc();
    }

    return (
        <VStack h={"100%"} justifyContent={"center"}>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign up, it's free!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormField
                            isInvalid={alertMessages.username.show} isRequired={alertMessages.username.show} value={newUser.username} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "username") }}
                            inputRightElement={false}
                            text={{
                                label: "Username", name: "username", autocomplete: "username", placeholder: "Username", alertMessage: alertMessages.username.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.email.show} isRequired={alertMessages.email.show} value={newUser.email} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "email") }}
                            inputRightElement={false}
                            text={{
                                label: "Email", name: "email", autocomplete: "email", placeholder: "Email", alertMessage: alertMessages.email.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={newUser.image} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
                            inputRightElement={false}
                            text={{
                                label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={newUser.password}
                            autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
                            onChangeText={(value) => { handleChange(value, "password") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
                            inputRightElement={true} text={{
                                label: "Password", name: "password", autocomplete: "password", placeholder: "Password", alertMessage: alertMessages.password.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={newUser.passwordRepeat}
                            autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
                            onChangeText={(value) => { handleChange(value, "passwordRepeat") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
                            inputRightElement={true} text={{
                                label: "Repeat Password", name: "password", placeholder: "Repeat Password", alertMessage: alertMessages.password.content,
                                iconName: "error"
                            }} >
                        </FormField>

                        <FormControl isInvalid={alertMessages.genericForm.show} >
                            <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                {alertMessages.genericForm.content}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <Button mt="2" colorScheme="indigo"
                            onPress={handleRegistration} title={"SignUp"}>
                            Sign up
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm an existing user.{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={handleLinkClick}>
                                Log In
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </VStack >
    )
}

export default SignUpForm;


{/* <FormControl isRequired isInvalid={alertMessages.username.show} >
                            <FormControl.Label>Username</FormControl.Label>
                            <Input
                                name="username"
                                value={newUser.username}
                                placeholder="Username"
                                autocomplete={"username"}
                                autocorrect={false}
                                autofocus={true}
                                onChangeText={(value) => { handleChange(value, "username") }}

                            />
                        </FormControl> */}

{/* 

                        <FormControl isRequired isInvalid={alertMessages.email.show} >
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                name="email"
                                value={newUser.email}
                                placeholder="Email"
                                autocomplete={"email"}
                                autocorrect={false}
                                autofocus={true}
                                onChangeText={(value) => { handleChange(value, "email") }}

                            />
                        </FormControl>
                        <FormControl isRequired isInvalid={alertMessages.image.show} >
                            <FormControl.Label>Image</FormControl.Label>
                            <Input
                                name="image"
                                value={newUser.image}
                                placeholder="Image URL"
                                autocomplete={"image"}
                                autocorrect={false}
                                autofocus={true}
                                onChangeText={(value) => { handleChange(value, "image") }}

                            />
                        </FormControl>
                        <FormControl isRequired isInvalid={alertMessages.password.show} >
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={newUser.password}
                                placeholder="Password"
                                autocomplete="password"
                                autocorrect={false}
                                onChangeText={(value) => { handleChange(value, "password") }}

                                InputRightElement={
                                    <Center size="xs" >
                                        <IconButton
                                            _icon={{ as: MaterialIcons, name: "visibility-off" }}
                                            colorScheme='indigo' size="xs" rounded="none" w="full" h="full"

                                            onPress={() => { setShowPassword(!showPassword) }}>  </IconButton>
                                    </Center>
                                }
                            />
                            <FormControl.Label>Repeat Password</FormControl.Label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="passwordRepeat"
                                value={newUser.passwordRepeat}
                                placeholder="Password"
                                autocomplete="password"
                                autocorrect={false}
                                onChangeText={(value) => { handleChange(value, "passwordRepeat") }}
                                isRequired
                                InputRightElement={
                                    <Center size="xs" >
                                        <IconButton
                                            _icon={{ as: MaterialIcons, name: "visibility-off" }}
                                            colorScheme='indigo' size="xs" rounded="none" w="full" h="full"

                                            onPress={() => { setShowPassword(!showPassword) }}>  </IconButton>
                                    </Center>
                                }
                            />
                        </FormControl> */}
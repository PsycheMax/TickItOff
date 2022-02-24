import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Input, IconButton, Text, Center, Box, Heading, FormControl, Link, Square } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";

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
    const [readyToSend, setReadyToSend] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        email: {
            show: false,
            content: "Alert goes here"
        },
        password: {
            show: false,
            content: "Alert goes here"
        },
        passwordRepeat: {
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

    function handleChange(value, fieldName) {
        if (newUser.password !== null && newUser.password.length >= inputRules.password.minLength) {
            newUser.password === newUser.passwordRepeat ? setReadyToSend(true) : setReadyToSend(false);
        }
        console.log(readyToSend);
        setNewUser(prevState => { return { ...prevState, [fieldName]: value } })
    }

    function handleRegistration() {
        if (readyToSend) {
            console.log({ newUser });
            userDataContext.registerNewUserFunc({ newUser });
            setNewUser({ email: "", password: "", passwordRepeat: "", username: "", image: "" });
            userDataContext.setUserDataWithoutLoginFunc(newUser);
        } else {

        }
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
                        <FormControl isRequired >
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
                        </FormControl>
                        <FormControl isRequired >
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
                        <FormControl isRequired >
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
                        <FormControl isRequired >
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


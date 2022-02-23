import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Input, IconButton, Text, Center, Box, Heading, FormControl, Link, Square } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";

const LoginForm = (props) => {
    // The loginUserObj for the API is loginUser:{email:"", password:""}
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

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

            <Center size="sm" alignSelf={"auto"} ml="5%">
                <IconButton colorScheme='indigo' key="logout" variant="solid" size="sm"
                    _icon={{
                        as: MaterialIcons, name: "logout", alignSelf: "center"
                    }}
                    onPress={handleLogout} title={"Logout"}
                />
            </Center>

        )
    } else {
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
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input
                                    name="email"
                                    value={loginUser.email}
                                    placeholder="Email"
                                    autocomplete={"email"}
                                    autocorrect={false}
                                    autofocus={true}
                                    onChangeText={(value) => { handleChange(value, "email") }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={loginUser.password}
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
                                <Link _text={{
                                    fontSize: "xs",
                                    fontWeight: "500",
                                    color: "indigo.500"
                                }} alignSelf="flex-end" mt="1">
                                    Forget Password?
                                </Link>
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
                                }} href="#">
                                    Sign Up
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </VStack >
        )
    }
}

export default LoginForm;
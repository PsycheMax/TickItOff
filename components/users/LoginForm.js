import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Input, IconButton, Box, Text, Center } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
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
            <VStack >
                <Center >
                    <Text fontSize="lg">Welcome {context.userData.username}</Text>
                    <Text>{context.userData.token}</Text>
                    <Button onPress={handleLogout} title={"Logout"} >Logout</Button>
                </Center>
            </VStack>
        )
    } else {
        return (
            <VStack w="75%">
                <Center>{context.userData.token}</Center>
                <Button onPress={handleAdminLogin} title={"AdminLogin"}>Admin Login</Button>
                <Input
                    variant="underlined"
                    name="email"
                    value={loginUser.email}
                    placeholder="Email"
                    autocomplete={"email"}
                    autocorrect={false}
                    autofocus={true}
                    onChangeText={(value) => { handleChange(value, "email") }}

                />
                <Input
                    type={showPassword ? "text" : "password"}
                    variant="underlined"

                    justifyItems="center"
                    // InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full"
                    //     onPress={() => { setShowPassword(!showPassword) }}> {showPassword ? "Hide" : "Show"} </Button>}
                    InputRightElement={<IconButton
                        _icon={{ as: MaterialIcons, name: "visibility-off", }}
                        mx="auto"
                        colorScheme='indigo' size="xs" rounded="none" w="1/6" h="full"
                        onPress={() => { setShowPassword(!showPassword) }}>  </IconButton>}

                    name="password"
                    value={loginUser.password}
                    placeholder="Password"
                    autocomplete="password"
                    autocorrect={false}
                    onChangeText={(value) => { handleChange(value, "password") }}

                />
                < VStack >
                    <Button
                        // style={tailwind("w-6 max-w-sm")}

                        onPress={handleLogin}
                        title={"Login"}

                    > Login </Button>
                </VStack >
            </VStack >
        )
    }
}

export default LoginForm;
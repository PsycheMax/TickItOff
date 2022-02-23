import React, { useState, useEffect, useContext } from 'react';
import { HStack, Heading, Box, Center, Pressable } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';
import ProfilePicture from './ProfilePicture';
import LoginForm from './LoginForm/LoginForm';


const UserMenu = (props) => {

    const [menuOpen, useMenuOpen] = useState(true);

    const loggedUser = useContext(LoggedUserContext).userData;

    useEffect(() => {
        // setUserData(loggedUserData);
        return () => {
            // Called when component destroyed

        }
    }, [])

    function handleMenuOpening() {
        console.log("Pressed");
        useMenuOpen(!menuOpen);

    }

    if (menuOpen) {
        return (
            <Pressable w={"100%"} onPress={handleMenuOpening}>
                <HStack w={"100%"} direction='row' >
                    <Center w={"20%"}>
                        <ProfilePicture source={loggedUser.image} />
                    </Center>
                    <HStack w="80%">
                        <Center w={"75%"}>
                            <Heading size="lg" >{loggedUser.username} alskjefglkjh; asdfglkjhu asdfgphkjasdgflhkj </Heading>
                        </Center >
                        <Center w={"25%"}>
                            <LoginForm />
                        </Center >
                    </HStack>
                </HStack >
            </Pressable>
        )
    } else {
        return (
            <Box w={"100%"}>
                <HStack w={"100%"} direction='row' >
                    <Center w={"20%"}>
                        <Pressable onPress={handleMenuOpening} >
                            <ProfilePicture source={loggedUser.image} />
                        </Pressable>
                    </Center>
                    <HStack w="80%">
                        <Center w={"75%"}>

                        </Center >
                        <Center w={"25%"}>

                        </Center >
                    </HStack>
                </HStack >
            </Box>
        )
    }
}

UserMenu.defaultProps = {
    loggedUserData: undefined
}

export default UserMenu;


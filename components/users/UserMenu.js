import React, { useState, useEffect, useContext } from 'react';
import { HStack, Heading, Box, Center, Pressable, PresenceTransition, Text } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';
import ProfilePicture from './ProfilePicture';
import LoginForm from './UserForms/LoginForm';


const UserMenu = (props) => {
    const [menuOpen, useMenuOpen] = useState(true);

    const loggedUser = useContext(LoggedUserContext).userData;

    function handleMenuOpening() {
        useMenuOpen(!menuOpen);
    }


    return (

        <HStack w={"100%"} >
            <Center w={"20%"} ml="2%">
                <Pressable onPress={handleMenuOpening}>
                    <ProfilePicture source={loggedUser.image} makeItBigger={menuOpen} />
                </Pressable>
            </Center>
            <HStack w="80%">
                <Center w={"75%"}>
                    <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <Heading size="md" >{loggedUser.username} </Heading>
                        <Text fontSize={"md"} underlined>{loggedUser.email}</Text>
                    </PresenceTransition>
                </Center >
                <Center w={"25%"}>
                    <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <LoginForm />
                    </PresenceTransition>
                </Center >
            </HStack>

        </HStack >

    )
}

export default UserMenu;
import React, { useState, useEffect, useContext } from 'react';
import { HStack, Heading, Box, Center, Pressable, PresenceTransition } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';
import ProfilePicture from './ProfilePicture';
import LoginForm from './LoginForm/LoginForm';


const UserMenu = (props) => {
    const [menuOpen, useMenuOpen] = useState(true);

    const loggedUser = useContext(LoggedUserContext).userData;

    function handleMenuOpening() {
        useMenuOpen(!menuOpen);
    }


    return (

        <HStack w={"100%"} >
            <Center w={"20%"}>
                <Pressable onPress={handleMenuOpening}>
                    <ProfilePicture source={loggedUser.image} />
                </Pressable>
            </Center>
            <HStack w="80%">
                <Center w={"75%"}>
                    <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <Heading size="lg" >{loggedUser.username} </Heading>
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
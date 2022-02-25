import React, { useState, useEffect, useContext } from 'react';
import { HStack, Heading, Box, Center, Pressable, PresenceTransition, Text } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ViewManagerContext } from '../../mainView/ViewManagerContextProvider';
import ProfilePicture from './ProfilePicture';
import LogoutButton from '../UserForms/FormComponents/LogoutButton';
import GenericIconButton from '../UserForms/FormComponents/GenericIconButton';

const UserMenu = (props) => {
    const [menuOpen, useMenuOpen] = useState(true);

    const routerContext = useContext(ViewManagerContext);
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
                <Center w={"70%"}>
                    <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <Heading size="md" >{loggedUser.username} </Heading>
                        <Text fontSize={"md"} underlined>{loggedUser.email}</Text>
                    </PresenceTransition>
                </Center >
                <HStack w={"30%"} alignItems="center">
                    <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <GenericIconButton
                            onPress={routerContext.changeCurrentViewTo.bind(this, "EditUserForm")}
                            iconName={"build"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                            colorScheme={"indigo"} key={"EditProfile"} title={"EditProfile"} />
                    </PresenceTransition>
                    <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                        <GenericIconButton
                            onPress={routerContext.changeCurrentViewTo.bind(this, "logout")}
                            iconName={"logout"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                            colorScheme={"amber"} key={"Logout"} title={"Logout"} />
                    </PresenceTransition>
                </HStack >
            </HStack>

        </HStack >

    )
}

export default UserMenu;
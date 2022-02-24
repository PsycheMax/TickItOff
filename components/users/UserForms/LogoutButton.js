import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Input, IconButton, Text, Center, Box, Heading, FormControl, Link, Square } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";

const LogoutButton = (props) => {
    // Context here is necessary to call the login and logout functions
    const context = useContext(LoggedUserContext);

    function handleLogout() {
        context.logoutUserFunc();
    }

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
}


export default LogoutButton;
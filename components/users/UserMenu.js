import React, { useState, useEffect, useContext } from 'react';

import { HStack, Heading } from 'native-base';

import { StylesContext } from '../AppManager';
import { LoggedUserContext } from '../../utils/UserManager';

const UserMenu = (props) => {

    const context = useContext(LoggedUserContext);
    const basicStyle = useContext(StylesContext);

    useEffect(() => {
        // setUserData(loggedUserData);
        return () => {
            // Called when component destroyed

        }
    }, [])

    return (
        <HStack >
            <Heading size="lg">{props.username}</Heading>
        </HStack>
    )
}

UserMenu.defaultProps = {
    loggedUserData: undefined
}

export default UserMenu;


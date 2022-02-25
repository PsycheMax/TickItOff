import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Center, Flex, Box, Pressable } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';
import UserMenu from './UserMenu';
import MainViewContainer from '../../mainView/MainViewContainer';

const UserPanel = (props) => {

    const loggedUser = useContext(LoggedUserContext).userData;

    useEffect(() => {
        // setUserData(loggedUserData);
        return () => {
            // Called when component destroyed

        }
    }, [])

    function renderProjects() {
        // return useLoggedUserData(false).projects
        return "CULO";
    }


    return (
        <Box width="100%" minW={"100%"} position="absolute" top="0" left="0" _web={{ pt: 25 }} pt={"5%"}>
            <UserMenu username={loggedUser.username} />
            <MainViewContainer />
        </Box>
    )
}

UserPanel.defaultProps = {
    loggedUserData: undefined
}

export default UserPanel;
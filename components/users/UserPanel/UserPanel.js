import React, { useState, useEffect, useContext } from 'react';
import { Box, ScrollView } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';
import UserMenu from './UserMenu';
import { ViewManagerContext } from '../../mainView/ViewManagerContextProvider';

const UserPanel = (props) => {

    const loggedUser = useContext(LoggedUserContext).userData;
    const ViewManager = useContext(ViewManagerContext);

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
        <Box maxH={"100%"} width="100%" minW={"100%"} position="absolute" top="0" left="0" _web={{ pt: 25 }} pt={"5%"}>
            <UserMenu username={loggedUser.username} />
            {ViewManager.renderCurrentView()}
        </Box>
    )
}

export default UserPanel;
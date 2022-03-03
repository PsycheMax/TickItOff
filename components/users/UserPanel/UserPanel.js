import React, { useState, useEffect, useContext } from 'react';
import { Box, ScrollView } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';
import UserMenu from './UserMenu';
import ViewManager from '../../mainView/ViewManager';

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
        <React.Fragment>
            {/*  _web={{ pt: 25 }} pt={"5%"} */}
            <UserMenu username={loggedUser.username} />
            <ViewManager />

        </React.Fragment>
    )
}

export default UserPanel;
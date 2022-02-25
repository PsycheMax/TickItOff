import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Center, Flex, Box, Pressable, Text } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';

const MainViewContainer = (props) => {

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
        <Box bgColor={"red.500"} h={"100%"} minW={"100%"} width="100%" minW={"100%"} _web={{ pt: 25 }} pt={"5%"}>
            <Text>The idea here is to create a context that affects this component: calling the CONTEXT.Functions() will modify this component, showing different things
                Maybe via a switch (context.state.currentView) case (profile): break; or something similar
            </Text>
        </Box>
    )
}

MainViewContainer.defaultProps = {
    loggedUserData: undefined
}

export default MainViewContainer;
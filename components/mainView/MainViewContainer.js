import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Center, Flex, Box, Pressable, Text, ScrollView } from 'native-base';
import EditUserForm from '../users/UserForms/EditUserForm';

export const RouterLikeContext = React.createContext({
    changeCurrentViewTo: (targetView, propsForNewView) => { }
})

const MainViewContainer = (props) => {

    const [currentView, setCurrentView] = useState("editUserForm");


    function renderCurrentView() {
        if (currentView === "editUserForm") {
            return <EditUserForm />
        } else {
            return <Text>The idea here is to create a context that affects this component: calling the CONTEXT.Functions() will modify this component, showing different things
                Maybe via a switch (context.state.currentView) case (profile): break; or something similar
            </Text>
        }

    }

    return (
        <RouterLikeContext.Provider value={{

        }} >
            <ScrollView h={"100%"} minW={"100%"} width="100%" minW={"100%"} _web={{ pt: 25 }} pt={"5%"}>
                {renderCurrentView()}
            </ScrollView>
        </RouterLikeContext.Provider>
    )
}

MainViewContainer.defaultProps = {
    loggedUserData: undefined
}

export default MainViewContainer;
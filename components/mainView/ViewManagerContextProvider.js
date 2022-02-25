import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Center, Flex, Box, Pressable, Text, ScrollView } from 'native-base';
import EditUserForm from '../users/UserForms/EditUserForm';

export const ViewManagerContext = React.createContext({
    changeCurrentViewTo: (targetView, propsForNewView) => { },
    renderCurrentView: () => { }
})

const ViewManagerContextProvider = (props) => {

    const [currentView, setCurrentView] = useState("editUserForm");


    function renderCurrentView() {
        switch (currentView) {
            case "EditUserForm":
                return <EditUserForm />
                break;
            // case "LogoutForm":
            //     return <LogoutForm />
            case "Explicame":
            default:
                <Text>The idea here is to create a context that affects this component: calling the CONTEXT.Functions() will modify this component, showing different things
                    Maybe via a switch (context.state.currentView) case (profile): break; or something similar
                </Text>
                return null;
                break;
        }
    }

    function changeCurrentViewTo(targetView, propsForView) {
        setCurrentView(targetView);
    }

    return (
        <ViewManagerContext.Provider value={{
            renderCurrentView: renderCurrentView,
            changeCurrentViewTo: changeCurrentViewTo
        }} >
            {props.children}
            {/* <ScrollView h={"100%"} minW={"100%"} width="100%" minW={"100%"} _web={{ pt: 25 }} pt={"5%"}>
                {renderCurrentView()}
            </ScrollView> */}
        </ViewManagerContext.Provider>
    )
}

ViewManagerContextProvider.defaultProps = {
    loggedUserData: undefined
}

export default ViewManagerContextProvider;
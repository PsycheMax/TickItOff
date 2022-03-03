import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Center, Flex, Box, Pressable, Text, ScrollView } from 'native-base';
import EditUserForm from '../users/UserForms/EditUserForm';
import LogoutView from '../users/UserForms/LogoutView';
import Task from '../tasks/Task';
import NewProjectForm from '../projects/NewProjectForm';
import EditProjectForm from '../projects/EditProjectForm';
import ViewProject from '../projects/ViewProject';

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
            case "LogoutView":
                return <LogoutView />;
                break;
            case "NewProjectForm":
                return <NewProjectForm />
                break;
            case "default":
            default:
                return <ViewProject />
                // return <EditProjectForm />
                // return <NewProjectForm />
                // return <Task></Task>
                // return <Text bgColor={"red.500"}>The idea here is to create a context that affects this component: calling the CONTEXT.Functions() will modify this component, showing different things
                //     Maybe via a switch (context.state.currentView) case (profile): break; or something similar
                // </Text>

                break;
        }
    }

    function changeCurrentViewTo(targetView, propsForView) {
        console.log(targetView);
        console.log(currentView);
        if (currentView === targetView) {
            setCurrentView("default");
        } else {
            setCurrentView(targetView);
        }

    }

    return (
        <ViewManagerContext.Provider value={{
            renderCurrentView: renderCurrentView,
            changeCurrentViewTo: changeCurrentViewTo
        }} >
            <ScrollView h={"full"} w={"full"}>
                {props.children}
            </ScrollView>
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
import React, { useState, useContext } from 'react';
import EditUserForm from '../users/UserForms/EditUserForm';
import LogoutView from '../users/UserForms/LogoutView';
import ViewDetailedTask from '../tasks/ViewDetailedTask';
import NewProjectForm from '../projects/NewProjectForm';
import EditProjectForm from '../projects/EditProjectForm';
import ViewProject from '../projects/ViewProject';

import { LoggedUserContext } from '../../utils/UserManager';
import UserMenu from '../users/UserPanel/UserMenu';
import LoginSignupPanel from '../users/LoginSignupPanel';
import UserPanel from '../users/UserPanel/UserPanel';
import NewTaskForm from '../tasks/NewTaskForm';
import EditTaskForm from '../tasks/EditTaskForm';
import ProjectSelector from '../projects/ProjectSelector';
import LoadingSpinner from '../LoadingSpinner';

export const ViewManagerContext = React.createContext({
    changeCurrentViewTo: (targetView, propsForNewView) => { },
    renderCurrentView: () => { },
    reloadCurrentView: () => { }
})

/**
 * This component is a context provider that creates an internal router. I created this solution from scratch, without checking whether or not it's a good idea.
 * The whole process looks like this:
 * 
 * EVERY children that has the necessity to change the current view will import the ViewManagementFunctions from this context. 
 * When such functions are called, the ViewManager() component will automatically update the current view based on whatever is currently set in the CurrentView state of this object (which is passed down to the context).
 * @param {*} props 
 * @returns 
 */
const ViewManagerContextProvider = (props) => {

    const [currentView, setCurrentView] = useState("editUserForm");
    const [lastView, setLastView] = useState("");
    const [propsForView, setPropsForView] = useState({});

    const userData = useContext(LoggedUserContext).userData;

    /**
     * This function takes the currentView from the state and, based upon it, renders different components. 
     * A switch function was the best way to manage such change of value.
     * @returns 
     */
    function renderCurrentView() {
        if (userData && userData.token && userData.token !== "") {
            switch (currentView) {
                case "LoginSignupPanel":
                    return <LoginSignupPanel />
                    break;
                case "LogoutView":
                    return <LogoutView />;
                    break;
                case "EditUserForm":
                    return <EditUserForm />
                    break;
                case "UserPanel":
                    return <UserPanel />
                    break;
                case "ViewProject":
                    return <ViewProject />
                    break;
                case "EditProjectForm":
                case "ViewDetailedTask":
                    return <ViewDetailedTask />
                    break;
                case "Reload":
                    return <LoadingSpinner />
                    break;
                case "default":
                default:
                    return <ProjectSelector />
                    break;
            }
        } else {
            // setCurrentView("default");
            return <LoginSignupPanel />;
        }
    }

    /**
     * This function changes the current view - please note that if it's necessary to close a menu (e.g. LogoutView) targetView should be sent with the same currentView value.
     * E.g. If the user is viewing a project and wants to open up the logout panel, but then wants to go back to the last project they were viewing, the logout view change command will first show the logout view, and then on the second call, will show the previous view.
     * @param {String} targetView This is the name of the wanted view. No props are necessary to be passed to the new views, since all the necessary data will be taken from the contexts.
     */
    function changeCurrentViewTo(targetView, propsForNewView) {
        console.log(`${currentView} => ${targetView}`);
        if (currentView === targetView) {
            setCurrentView(lastView);
        } else {
            setLastView(currentView);

            if (propsForNewView) {
                setPropsForView = propsForNewView;
            }
            setCurrentView(targetView);

        }
    }

    async function reloadCurrentView() {
        let previousView = currentView;
        await setCurrentView("Reload");
        setTimeout(await setCurrentView(previousView), 150);
    }

    return (
        <ViewManagerContext.Provider value={{
            renderCurrentView: renderCurrentView,
            changeCurrentViewTo: changeCurrentViewTo,
            reloadCurrentView: reloadCurrentView
        }} >
            {props.children}
        </ViewManagerContext.Provider>
    )
}

export default ViewManagerContextProvider;
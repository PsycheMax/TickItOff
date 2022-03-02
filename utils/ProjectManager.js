import React, { useState, useEffect, useContext } from 'react';
import { axiosPost, axiosGet, axiosPatch, axiosDelete } from './APIManager';

import { LoggedUserContext } from './UserManager';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const ProjectContext = React.createContext({
    // userProjects: {},
    currentProjectData: {},
    getProjectList: () => { },
    getProjectDataFunc: () => { },
    createProjectFunc: () => { },
    patchProjectFunc: () => { },
    deleteProjectFunc: () => { },
    createTaskInProjectFunc: () => { },
    patchTaskInProjectFunc: () => { },
    deleteTaskInProjectFunc: () => { },
});

const ProjectManager = (props) => {

    const [currentProjectData, setCurrentProjectData] = useState({});

    const loggedUserData = useContext(LoggedUserContext).userData;
    //TODO Possibly add a "Add project" function to the user context? And maybe an "Add task" function to the user context?

    // // The following functions are to be passed down as context.functions()
    // async function getProjectListForLoggedUser() {
    //     setUserProjects(loggedUserData.projects);
    //     return loggedUserData.projects;
    // }

    async function getProjectDataFunc(projectID) {
        let response = await axiosGet(`/project/${projectID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("In status 200");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function createProjectFunc(newProjectData) {
        let response = await axiosPost(`/project`, newProjectData, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function patchProjectFunc(projectID, patchedProjectData) {
        let response = await axiosPatch(`/project/${projectID}`, patchedProjectData, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function deleteProjectFunc(projectID) {
        let response = await axiosDelete(`/project/${projectID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function createTaskInProjectFunc(projectID, newTaskData) {
        let response = await axiosPost(`/project/${projectID}/`, newTaskData, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function patchTaskInProjectFunc(projectID, taskID, patchedTaskData) {
        let response = await axiosPatch(`/project/${projectID}/task/${taskID}`, patchedTaskData, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    async function deleteTaskInProjectFunc(projectID, taskID) {
        let response = await axiosDelete(`/project/${projectID}/task/${taskID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    return (
        <ProjectContext.Provider value={{
            // userProjects: userProjects,
            currentProjectData: currentProjectData,
            getProjectDataFunc: getProjectDataFunc,
            createProjectFunc: createProjectFunc,
            patchProjectFunc: patchProjectFunc,
            deleteProjectFunc: deleteProjectFunc,
            createTaskInProjectFunc: createTaskInProjectFunc,
            patchTaskInProjectFunc: patchTaskInProjectFunc,
            deleteTaskInProjectFunc: deleteTaskInProjectFunc
        }} >
            {props.children}
        </ProjectContext.Provider>
    )
}

ProjectManager.defaultProps = {

}

export default ProjectManager;
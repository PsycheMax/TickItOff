import React, { useState, useEffect, useContext } from 'react';
import { axiosPost, axiosGet, axiosPatch, axiosDelete } from './APIManager';

import { LoggedUserContext } from './UserManager';

// Created a context template here, it will send down a logout function, a login function, and the logged User Data.
export const ProjectContext = React.createContext({
    currentProjectData: {},
    reloadCurrentProjectDataFunc: () => { },
    setCurrentProjectDataFunc: (projectID) => { },
    getProjectDataFunc: (projectID) => { },
    createProjectFunc: (projectData) => { },
    patchProjectFunc: (projectID, projectData) => { },
    deactivateProjectFunc: (projectID) => { },
    permanentlyDeleteProjectFunc: (projectID) => { },
    getTaskInProjectFunc: (projectID, taskID) => { },
    createTaskInProjectFunc: (projectID, taskData) => { },
    patchTaskInProjectFunc: (projectID, taskID, taskData) => { },
    deactivateTaskInProjectFunc: (projectID, taskID) => { },
    permanentlyDeleteTaskInProjectFunc: (projectID, taskID) => { }
});

const ProjectManager = (props) => {

    const [currentProjectData, setCurrentProjectData] = useState({});

    const loggedUserData = useContext(LoggedUserContext).userData;

    /**
     * This function reloads the CurrentProjectData in the context - useful when the project has been updated and the updates need to be used in the app
     * @returns The api response, in case it's necessary
     */
    async function reloadCurrentProjectDataFunc() {
        let response = await axiosGet(`/project/${currentProjectData._id}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("In status 200");
            console.log(response.data);
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function changes the CurrentProjectData in the Context - as the context gives the Views directions on what to show, this is an essential part of the "changeView" function
     * @param {string} projectID string,  
     * @returns the api response, in case it's necessary
     */
    async function setCurrentProjectDataFunc(projectID) {
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

    /**
     * Fetches from the API a project by its projectID
     * @param {string} projectID 
     * @returns the API response, with .data 
     */
    async function getProjectDataFunc(projectID) {
        let response = await axiosGet(`/project/${projectID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("In status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function creates a new project in the database, and sets it into the CurrentProjectData in the context.
     * @param {Object} newProject is an object containing the project data {name: "", description:"", ...}
     * @returns the API response
     */
    async function createProjectFunc(newProject) {
        let response = await axiosPost(`/project`, { newProject }, loggedUserData.token);
        if (response.status === 201) {
            console.log("Status 201");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function patches an existing project in the database, and sets the new, patched object into the CurrentProjectData in the context
     * @param {string} projectID 
     * @param {object} patchedProjectData is an object containing the project data {name: "", description:"", ...} that has to be sent to the API
     * @returns The API response
     */
    async function patchProjectFunc(projectID, patchedProject) {
        let response = await axiosPatch(`/project/${projectID}`, { patchedProject }, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            setCurrentProjectData(response.data);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function deactivates a project from the API - the deletion is not absolute, the intent is to keep track of every project.
     * @param {string} projectID the project to delete 
     * @returns The API response
     */
    async function deactivateProjectFunc(projectID) {
        let response = await axiosDelete(`/project/${projectID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            // setCurrentProjectData(null);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }
    /**
     * This function completely deletes a project from the API - the deletion IS absolute.
     * @param {string} projectID the project to delete 
     * @returns The API response
     */
    async function permanentlyDeleteProjectFunc(projectID) {
        let response = await axiosDelete(`/project/permanentlyDelete/${projectID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            // setCurrentProjectData(null);
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * Fetches a TaskID, which is part of a Project, and returns it
     * @param {String} projectID 
     * @param {String} taskID 
     * @returns the API response
     */
    async function getTaskInProjectFunc(projectID, taskID) {
        let response = await axiosGet(`/project/${projectID}/task/${taskID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("In status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    /**
     * This function creates a task inside a project (identified via projectID). The project belongs to the logged user, who has to be a manager of the Project identified by ProjectID
     * @param {string} projectID 
     * @param {object} newTaskData is an object containing the task data {name: "", description:"", ...}
     * @returns The API response
     */
    async function createTaskInProjectFunc(projectID, newTask) {
        let response = await axiosPost(`/project/${projectID}/task`, { newTask }, loggedUserData.token);
        if (response.status === 201) {
            console.log("Status 201");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }
    /**
     * This function patches an existing Task (taskID) inside a Project (ProjectID). 
     * @param {string} projectID A string with the ID of the project the task belongs to
     * @param {string} taskID A string with the ID of the TASK that needs modifying
     * @param {object} patchedTaskData An object data with the new data for the target task
     * @returns 
     */
    async function patchTaskInProjectFunc(projectID, taskID, patchedTask) {
        let response = await axiosPatch(`/project/${projectID}/task/${taskID}`, { patchedTask }, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }
    /**
     * This function deactivates an existing task from an existing Project. The deletion is not definitive, the intent is to keep track of everything
     * @param {string} projectID 
     * @param {string} taskID 
     * @returns 
     */
    async function deactivateTaskInProjectFunc(projectID, taskID) {
        let response = await axiosDelete(`/project/${projectID}/task/${taskID}`, loggedUserData.token);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }
    /**
     * This function permanently deletes an existing task from an existing Project. The deletion IS definitive.
     * @param {string} projectID 
     * @param {string} taskID 
     * @returns 
     */
    async function permanentlyDeleteTaskInProjectFunc(projectID, taskID) {
        let response = await axiosDelete(`/project/${projectID}/task/permanentlyDelete/${taskID}`, loggedUserData.token);
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
            currentProjectData: currentProjectData,
            reloadCurrentProjectDataFunc: reloadCurrentProjectDataFunc,
            setCurrentProjectDataFunc: setCurrentProjectDataFunc,
            getProjectDataFunc: getProjectDataFunc,
            createProjectFunc: createProjectFunc,
            patchProjectFunc: patchProjectFunc,
            deactivateProjectFunc: deactivateProjectFunc,
            permanentlyDeleteProjectFunc: permanentlyDeleteProjectFunc,
            getTaskInProjectFunc: getTaskInProjectFunc,
            createTaskInProjectFunc: createTaskInProjectFunc,
            patchTaskInProjectFunc: patchTaskInProjectFunc,
            deactivateTaskInProjectFunc: deactivateTaskInProjectFunc,
            permanentlyDeleteTaskInProjectFunc: permanentlyDeleteTaskInProjectFunc
        }} >
            {props.children}
        </ProjectContext.Provider>
    )
}

ProjectManager.defaultProps = {

}

export default ProjectManager;
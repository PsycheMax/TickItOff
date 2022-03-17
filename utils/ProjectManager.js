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
    deleteProjectFunc: (projectID) => { },
    getTaskInProjectFunc: (projectID, taskID) => { },
    createTaskInProjectFunc: (projectID, taskData) => { },
    patchTaskInProjectFunc: (projectID, taskID, taskData) => { },
    deleteTaskInProjectFunc: (projectID, taskID) => { },
});

const tempProjectData = {
    "users": {
        "creators": [
            {
                "_id": "620fd2edc7effb0abb07ccbf",
                "username": "AdminMax",
                "image": "https://randomuser.me/api/portraits/lego/6.jpg",
                "status": "Active"
            }
        ],
        "joiners": [],
        "managers": [
            {
                "_id": "620fd2edc7effb0abb07ccbf",
                "username": "AdminMax",
                "image": "https://randomuser.me/api/portraits/lego/6.jpg",
                "status": "Active"
            }
        ]
    },
    "settings": {
        "colorScheme": "DefaultModified"
    },
    "_id": "620fd33cc7effb0abb07ccca",
    "name": "PostMan name 1 - After MOD",
    "description": "description - AFTER MOD -1",
    "completion": true,
    "image": "reqUser.image - after MOD -1",
    "status": "Active",
    "creationDate": "2022-02-18T17:11:24.637Z",
    "modificationDate": "2022-02-28T10:12:03.650Z",
    "tasks": [
        {
            "_id": "620fdc774c33628925c81365",
            "name": "PostMan name 1",
            "image": "req.image",
            "status": "Active"
        },
        {
            "_id": "620fdc8c0e1e0f5a3b71ae8a",
            "name": "PostMan name 1",
            "image": "req.image",
            "status": "Active"
        },
        {
            "_id": "620fdd072c14c2e8023aa11d",
            "name": "PostMan UPDATE 1",
            "image": "IMAGINE OLL THE PIPOL",
            "status": "active"
        },
        {
            "_id": "621c9ff3f3a9ca7ebd2e112c",
            "name": "Uffa chge wall era",
            "image": "req.image",
            "status": "Active"
        }
    ],
    "notifications": [],
    "__v": 4
}

const ProjectManager = (props) => {

    const [currentProjectData, setCurrentProjectData] = useState({});

    const loggedUserData = useContext(LoggedUserContext).userData;
    //TODO Possibly add a "Add project" function to the user context? And maybe an "Add task" function to the user context?

    // // The following functions are to be passed down as context.functions()
    // async function getProjectListForLoggedUser() {
    //     setUserProjects(loggedUserData.projects);
    //     return loggedUserData.projects;
    // }

    /**
     * This function reloads the CurrentProjectData in the context - useful when the project has been updated and the updates need to be used in the app
     * @returns The api response, in case it's necessary
     */
    async function reloadCurrentProjectDataFunc() {
        let response = await axiosGet(`/project/${currentProjectData._id}`, loggedUserData.token);
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
     * This function "deletes" a project from the API - the deletion is not absolute, the intent is to keep track of every project.
     * @param {string} projectID the project to delete 
     * @returns The API response
     */
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
     * This function "deletes" an existing task from an existing Project. The deletion is not definitive, the intent is to keep track of everything
     * @param {string} projectID 
     * @param {string} taskID 
     * @returns 
     */
    async function deleteTaskInProjectFunc(projectID, taskID) {
        console.log(projectID)
        console.log(taskID)
        let response = await axiosDelete(`/project/${projectID}/task/${taskID}`, loggedUserData.token);
        console.log(response);
        if (response.status === 200) {
            console.log("Status 200");
            return response;
        } else {
            console.log("Status not 200");
            return response;
        }
    }

    useEffect(() => {
        // if (!currentProjectData._id || currentProjectData._id.length === 0) {
        //     setCurrentProjectData(tempProjectData);
        // }
    }, [])

    return (
        <ProjectContext.Provider value={{
            currentProjectData: currentProjectData,
            reloadCurrentProjectDataFunc: reloadCurrentProjectDataFunc,
            setCurrentProjectDataFunc: setCurrentProjectDataFunc,
            getProjectDataFunc: getProjectDataFunc,
            createProjectFunc: createProjectFunc,
            patchProjectFunc: patchProjectFunc,
            deleteProjectFunc: deleteProjectFunc,
            getTaskInProjectFunc: getTaskInProjectFunc,
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
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Platform, Pressable, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProjectContext } from '../../utils/ProjectManager';
import LoadingSpinner from '../generic/LoadingSpinner';
import { CommonActions } from '@react-navigation/native';
import SectionListProject from './SectionListProject';

const ViewProjectBCK = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [sortBy, setSortBy] = useState({ ascending: true, fieldToSortBy: "creationDate" });

    const [processedProjectData, setProcessedProjectData] = useState(processProjectDataForSectionList());

    const [wasDataFetched, setWasDataFetched] = useState(false);
    const [fetchHasErrors, setFetchHasErrors] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const [requiresUpdate, setRequiresUpdate] = useState(false);

    const styles = StyleSheet.create({
        redirectMessage: {
            display: fetchHasErrors ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
        }
    })

    /**
 * The following function processes the ProjectData.tasks and ProjectData.archivedTasks. The final object is an array containing the original data in a SectionList compatible form. 
 * The array looks like this: 
 * 
 * [{ data: [{project}], title:"Section Title"},...{}]
 */
    function processProjectDataForSectionList() {
        // Writing this in a verbose way: declared two arrays
        let activeArray = [];
        let archivedArray = [];
        // The data from (active)tasks is copied into a new array, given a key, and sorted via .sort()
        if (ProjectData.tasks && ProjectData.tasks.length > 0) {
            activeArray = [...ProjectData.tasks];
            activeArray.forEach(task => {
                task.key = task._id;
            });
            // The following line sorts the array according to the sortBy state object, where "type"
            activeArray.sort((a, b) => { return a[sortBy.fieldToSortBy] > b[sortBy.fieldToSortBy] ? (sortBy.ascending ? 1 : -1) : (sortBy.ascending ? -1 : 1) })
        }
        if (ProjectData.archivedTasks && ProjectData.archivedTasks.length > 0) {
            archivedArray = [...ProjectData.archivedTasks];
            archivedArray.forEach(task => {
                task.key = task._id;
            });
            archivedArray.sort((a, b) => { return a[sortBy.fieldToSortBy] > b[sortBy.fieldToSortBy] ? (sortBy.ascending ? 1 : -1) : (sortBy.ascending ? -1 : 1) })
        }
        // Create an object containing a section title, and an array at the key "data", a tag and a boolean requiring the "NewTaskForm" for each category/section.
        let active = {
            data: activeArray,
            title: "Active Tasks",
            tag: "activeTasks",
            requiresFullHeader: true
        };
        let archived = {
            data: archivedArray,
            title: "Archived Tasks",
            tag: "archivedTasks",
            requiresFullHeader: false
        }
        // Return the newly created objects in an array;
        // setProcessedProjectData([active, archived]);
        return [active, archived];
    }


    async function reloadAndProcessProjectData() {
        const response = await ProjectFunctions.reloadCurrentProjectDataFunc();
        setProcessedProjectData(processProjectDataForSectionList());
        console.log(response);
    }

    async function handleProjectDeactivation() {
        const response = await ProjectFunctions.deactivateProjectFunc(ProjectData._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                props.navigation.navigate('Home');
            } else {
                // Code 204!
                props.navigation.navigate('Home');

            }
        } else {
            // Code 200
            props.navigation.navigate('Home');
        }
        setShowDeletePrompt(false);
    }

    async function handleProjectReactivation() {
        const toSend = ProjectData;
        toSend.active = true;
        const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, toSend);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                props.navigation.push('Home');
            } else {
                // Code 204!
                props.navigation.push('Home');

            }
        } else {
            // Code 200            
            props.navigation.push('Home');
        }
        setShowDeletePrompt(false);
    }

    async function handleProjectPermanentDeletion() {
        const response = await ProjectFunctions.permanentlyDeleteProjectFunc(ProjectData._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                props.navigation.navigate('Home');
            } else {
                // Code 204!
                props.navigation.navigate('Home');
            }
        } else {
            // Code 200
            props.navigation.navigate('Home');
        }
        setShowDeletePrompt(false);
    }

    function goToHomePage() {
        props.navigation.navigate('Home');
    }

    const artificialNavState = {
        "stale": true,
        "routes": [
            {
                "name": "Home"
            },
            {
                "name": "ViewProject",
                "params": { "id": props.route.params.id }
            }
        ]
    }

    useEffect(() => {
        if (wasDataFetched) {
            props.navigation.dispatch(CommonActions.reset(artificialNavState));
        }
    }, [wasDataFetched])

    useEffect(() => {
        processProjectDataForSectionList();
    }, [])

    useEffect(async () => {
        if (props.route && props.route.params.id) {
            if (ProjectData._id === undefined || ProjectData._id !== props.route.params.id) {
                if (requiresUpdate) {


                    const response = await ProjectFunctions.setCurrentProjectDataFunc(props.route.params.id);
                    if (response.status !== 200) {
                        setFetchHasErrors(true);
                        setTimeout(() => {
                            goToHomePage();
                        }, 1500);
                    } else {
                        setWasDataFetched(true);
                    }
                    setRequiresUpdate(false);
                }
            }
        }


    })

    // In order to make it scrollable and efficient, I decided to convert the whole view in a big SectionList. It lacks readability, sadly, but it works better
    return (
        wasDataFetched
            ? <>
                <LoadingSpinner marginTop={"5%"} />
                {fetchHasErrors ?
                    <View style={styles.redirectMessage}>
                        <Text>
                            The page you are trying to open is pointing to a non-existing project - you'll be redirected to the homepage soon.
                        </Text>
                        <TouchableOpacity onPress={goToHomePage} >
                            <Text>
                                If you want to go to the homepage now, please click here.
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>}
            </>
            :
            ProjectData._id !== props.route.params.id ? <LoadingSpinner marginTop={"5%"} /> :

                <SectionListProject
                    ProjectData={ProjectData}
                    processedProjectData={processedProjectData}

                    processFunctions={{
                        handleProjectPermanentDeletion: handleProjectPermanentDeletion,
                        handleProjectDeactivation: handleProjectDeactivation,
                        handleProjectReactivation: handleProjectReactivation
                    }}

                    sortBy={sortBy} setSortBy={setSortBy}
                    showDeletePrompt={showDeletePrompt} setShowDeletePrompt={setShowDeletePrompt}
                    setRequiresUpdate={setRequiresUpdate}

                />
    )
}

export default ViewProjectBCK;
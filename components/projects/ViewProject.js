import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProjectContext } from '../../utils/ProjectManager';
import LoadingSpinner from '../generic/LoadingSpinner';
import SectionListProject from './SectionListProject';

import date from 'date-and-time';

const ViewProject = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    // The SortBy state is used to change the way the ProjectData is displayed - it has a boolean (ascending), and the name of the field to use as a sorter for the array.sort function
    const [sortBy, setSortBy] = useState({ ascending: false, fieldToSortBy: "creationDateParsed" });
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    // The following states are used to decide what to show, based on the fetching status
    const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
    const [fetchHasErrors, setFetchHasErrors] = useState(false);

    const styles = StyleSheet.create({
        redirectMessage: {
            display: "flex",
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
        };
        try {
            activeArray.forEach((task) => {
                // console.log(task.creationDate);
                let creationDateParsed = date.parse(task.creationDate, "hh:mm A [-] MMM DD YYYY");
                let modificationDateParsed = date.parse(task.modificationDate, "hh:mm A [-] MMM DD YYYY");
                // Check date-and-time docs - if the date is invalid, it returns a wrong Date object - to check if it happens, isNaN is used
                if (isNaN(creationDateParsed)) {
                    task.creationDateParsed = task.creationDate;
                } else {
                    task.creationDateParsed = creationDateParsed;
                }
                if (isNaN(modificationDateParsed)) {
                    task.modificationDateParsed = task.modificationDate;
                } else {
                    task.modificationDateParsed = modificationDateParsed;
                }
            })
        } catch (error) {
            console.log(error);
        }

        // The following line sorts the array according to the sortBy state object, where "type"
        activeArray.sort((a, b) => { return a[sortBy.fieldToSortBy] > b[sortBy.fieldToSortBy] ? (sortBy.ascending ? 1 : -1) : (sortBy.ascending ? -1 : 1) });

        if (ProjectData.archivedTasks && ProjectData.archivedTasks.length > 0) {
            archivedArray = [...ProjectData.archivedTasks];
            archivedArray.forEach(task => {
                task.key = task._id;
            });
        }

        try {
            archivedArray.forEach((task) => {
                // console.log(task.creationDate);
                let creationDateParsed = date.parse(task.creationDate, "hh:mm A [-] MMM DD YYYY");
                let modificationDateParsed = date.parse(task.modificationDate, "hh:mm A [-] MMM DD YYYY");
                // Check date-and-time docs - if the date is invalid, it returns a wrong Date object - to check if it happens, isNaN is used
                if (isNaN(creationDateParsed)) {
                    task.creationDateParsed = task.creationDate;
                } else {
                    task.creationDateParsed = creationDateParsed;
                }
                if (isNaN(modificationDateParsed)) {
                    task.modificationDateParsed = task.modificationDate;
                } else {
                    task.modificationDateParsed = modificationDateParsed;
                }
            })
        } catch (error) {
            console.log(error);
        }

        archivedArray.sort((a, b) => { return a[sortBy.fieldToSortBy] > b[sortBy.fieldToSortBy] ? (sortBy.ascending ? 1 : -1) : (sortBy.ascending ? -1 : 1) });

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
        return [active, archived];
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

    // The following function will be called only when the project is viewed, to reduce the number of useless API calls
    useEffect(async () => {
        if (!hasDataBeenFetched) {
            const response = await ProjectFunctions.setCurrentProjectDataFunc(props.route.params.id);
            if (response.status === 200) {
                setHasDataBeenFetched(true);
            } else {
                // In case there are errors, the user gets redirected to the homepage
                setFetchHasErrors(true);
                setTimeout(() => {
                    goToHomePage();
                }, 1500);
            }
        } else {
            await ProjectFunctions.reloadCurrentProjectDataFunc();
        }
    }, [])

    // In order to make it scrollable and efficient, I decided to convert the whole view in a big SectionList. It lacks readability, sadly, but it works better
    return (
        // If the API is taking time to reply, the user is shown a LoadingSpinner
        !hasDataBeenFetched ? <>
            <LoadingSpinner marginTop={"5%"} />
            {/* In case there are errors with the API call - e.g. a wrong ID in the address bar - the user is shown an error message*/}
            {fetchHasErrors ?
                <View style={styles.redirectMessage}>
                    <Text>
                        The page you are trying to open is pointing to a project you cannot open (it's possible you lack authorization, or you're trying to access a non-existing project) - you'll be redirected to the homepage soon.
                    </Text>
                    <TouchableOpacity onPress={goToHomePage} >
                        <Text>
                            If you want to go to the homepage right now, please click on this message.
                        </Text>
                    </TouchableOpacity>
                </View>
                : <></>}
        </> :
            // For readability, I moved the whole SectionList to a different component - even if it has too many props, this file got WAY shorter thanks to this choice
            <SectionListProject
                ProjectData={ProjectData}
                processedProjectData={processProjectDataForSectionList()}

                processFunctions={{
                    handleProjectPermanentDeletion: handleProjectPermanentDeletion,
                    handleProjectDeactivation: handleProjectDeactivation,
                    handleProjectReactivation: handleProjectReactivation
                }}

                sortBy={sortBy} setSortBy={setSortBy}
                showDeletePrompt={showDeletePrompt} setShowDeletePrompt={setShowDeletePrompt}

            />
    )
}

export default ViewProject;
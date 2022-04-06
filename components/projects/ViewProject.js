import React, { useContext, useState } from 'react';
import { Modal, Pressable, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../utils/ProjectManager';
import { ThemeContext } from '../../utils/ThemeManager';
import ViewTask from '../tasks/ViewTask';
import NewTaskForm from '../tasks/NewTaskForm';
import EditProjectForm from './EditProjectForm';
import StandardDivider from '../StandardDivider';

const ViewProject = (props) => {

    const theme = useContext(ThemeContext);
    const { methods } = theme.dimensions;

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [showUserManagement, setShowUserManagement] = useState(false);
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);

    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const styles = StyleSheet.create({
        maxWidth: {
            maxWidth: theme.dimensions.screenWidth,
            width: theme.dimensions.screenWidth,
            minWidth: theme.dimensions.screenWidth,
            alignSelf: "center"
        },
        columnContainer: {
            flexDirection: "column"
        },
        rowContainer: {
            flexDirection: "row"
        },
        darkText: {
            color: theme.colors.primary[700]
        },
        whiteText: {
            color: theme.colors.secondary[50]
        },
        spaceBetween: {
            alignContent: "space-between",
            justifyContent: "space-between"
        },
        centered: {
            justifyContent: "center",
            alignItems: "center"
        },
        mainHMarginSize: {
            marginHorizontal: 18
        },
        mainHPaddingSize: {
            paddingHorizontal: 18
        },
        topSection: {
            // minHeight: methods.moderateVerticalScale(48),
            justifyContent: "space-between",
            alignContent: "space-between"
        },
        nameContainer: {
            flexGrow: 8,
            maxWidth: "87%",
            minWidth: "87%"
        },
        buttonsContainer: {
            flexGrow: 1,
            minWidth: "10%"
        },
        name: {
            fontSize: 32,
            fontWeight: "700"
        },
        description: {
            fontSize: 18,
            fontWeight: "500"
        },
        projectIcons: {
            width: 32 - 1,
            height: 32 - 1
        },
        formContainer: {

        },
        showOnProjectEditForm: {
            display: showProjectEditForm ? "flex" : "none"
        },
        hideOnProjectEditForm: {
            display: showProjectEditForm ? "none" : "flex"
        },
        projectListContainer: {
            marginTop: methods.moderateVerticalScale(16),
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
        },
        archivedTasksList: {
            borderRadius: 32,
            paddingHorizontal: 18,
            paddingVertical: 18,
        },
        showOnArchivedTasks: {
            display: showArchivedTasks ? "flex" : "none"
        },
        activeListContainerBG: {
            backgroundColor: theme.colors.secondary[50],
        },
        archivedListContainerBG: {
            backgroundColor: theme.colors.primary[800]
        },
        bottomListContainer: {
            paddingBottom: 32,
            height: 32,
            maxHeight: 32,
            minHeight: 32,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
        },
        topListContainer: {
            paddingTop: 32,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
        },
        backgroundForModal: {
            backgroundColor: theme.colors.primary[800],
            opacity: 0.4,
            width: theme.dimensions.screenWidth,
            height: theme.dimensions.screenHeight,
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalWindow: {
            position: "relative",
            zIndex: 10,
            margin: 20,
            backgroundColor: theme.colors.secondary[300],
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        modalButtonsContainer: {
            flexDirection: "row",
            marginTop: theme.dimensions.methods.moderateScale(16)
        },
        modalButtons: {
            paddingHorizontal: theme.dimensions.methods.moderateScale(24),
            paddingVertical: theme.dimensions.methods.moderateScale(18),
            marginHorizontal: theme.dimensions.methods.moderateScale(12),
            borderRadius: 50
        },
        modalText: {
            fontSize: theme.dimensions.methods.moderateScale(18),
            color: theme.colors.primary[50]
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
        // Copied the existing tasks into these arrays

        if (ProjectData.tasks && ProjectData.tasks.length > 0) {
            activeArray = [...ProjectData.tasks];
            activeArray.forEach(task => {
                task.key = task._id;
            });
        }
        if (ProjectData.archivedTasks && ProjectData.archivedTasks.length > 0) {
            archivedArray = [...ProjectData.archivedTasks];
            archivedArray.forEach(task => {
                task.key = task._id;
            });
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
        return [active, archived];
    }

    async function toggleEditProjectForm() {
        await setShowProjectEditForm(!showProjectEditForm);
    }

    async function toggleUserManagement() {
        await setShowUserManagement(!showUserManagement);
    }

    async function toggleArchivedTasks() {
        await setShowArchivedTasks(!showArchivedTasks);
    }

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    async function handleProjectDeactivation() {
        const response = await ProjectFunctions.deactivateProjectFunc(ProjectData._id);
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

    async function handleProjectReactivation() {
        const toSend = ProjectData;
        toSend.active = true;
        const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, toSend);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                console.log(response)
                props.navigation.push('Home');
            } else {
                // Code 204!
                console.log(response)
                props.navigation.push('Home');

            }
        } else {
            // Code 200
            console.log(response)
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
                console.log(response)
                props.navigation.push('Home');
            } else {
                // Code 204!
                console.log(response)
                props.navigation.push('Home');
            }
        } else {
            // Code 200
            console.log(response)
            props.navigation.push('Home');
        }
        setShowDeletePrompt(false);
    }

    // In order to make it scrollable and efficient, I decided to convert the whole view in a big SectionList. It lacks readability, sadly, but it works better
    return (
        <View style={styles.maxWidth}>
            <SectionList
                //The data is obtained by a method that parses the ProjectData in a SectionList readable form
                sections={processProjectDataForSectionList()}

                // This is the header of this whole component
                renderSectionHeader={({ section: { title, data, tag, requiresFullHeader } }) => {
                    // The following if statement creates the header only if the data array being represented is the first one, the "active" array
                    if (requiresFullHeader) {
                        return <>
                            <View style={[styles.columnContainer, styles.mainHMarginSize]}>
                                <View style={[styles.columnContainer, styles.topSection, styles.hideOnProjectEditForm]}>
                                    <View style={[styles.rowContainer, styles.spaceBetween]}>
                                        <View style={[styles.nameContainer]}>
                                            <Text style={[styles.name, styles.darkText]}>
                                                {ProjectData.name}
                                            </Text>
                                        </View>
                                        <View style={[styles.rowContainer, styles.buttonsContainer]}>
                                            <View style={[styles.centered]}>
                                                {ProjectData.active ?
                                                    <Pressable onPress={toggleEditProjectForm} >
                                                        <MaterialIcons name="edit" size={32} color={theme.colors.primary[500]} />
                                                    </Pressable>
                                                    : <Pressable onPress={handleProjectReactivation}>
                                                        <MaterialIcons name="power" size={32} color={theme.colors.primary[500]} />
                                                    </Pressable>
                                                }
                                            </View>
                                            <View style={styles.centered}>
                                                <Pressable onPress={toggleDeletePrompt} >
                                                    <MaterialIcons name="delete-outline" size={32} color={theme.colors.primary[500]} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        {ProjectData.description}
                                    </Text>
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
                                    </Text>
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
                                    </Text>
                                </View>

                                <View style={[styles.columnContainer, styles.formContainer, styles.showOnProjectEditForm]} >
                                    <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
                                    </Text>
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
                                    </Text>
                                </View>
                            </View>
                            <View style={[
                                styles.projectListContainer, styles.topListContainer,
                                tag === "activeTasks" ? styles.activeListContainerBG : styles.archivedListContainerBG
                            ]}>
                                <Text style={[
                                    styles.name,
                                    tag === "activeTasks" ? styles.darkText : styles.whiteText]}>{title}
                                </Text>
                                {/* Considering it's the header, the NewTaskForm goes here */}
                                {ProjectData.active ?
                                    <View style={styles.mainHPaddingSize}>
                                        <NewTaskForm />
                                    </View>
                                    : <></>}

                            </View>
                        </>
                        // For every other category, create a regular heading (after checking what color should be used)
                    } else return <View style={[
                        styles.projectListContainer, styles.topListContainer,
                        tag === "activeTasks" ? styles.activeListContainerBG : styles.archivedListContainerBG
                    ]}>
                        <Text style={[
                            styles.name,
                            tag === "activeTasks" ? styles.darkText : styles.whiteText]}>{title}</Text>
                    </View>
                }}

                // RenderItem is the method that renders every object found in the sections array objects. See above for the JSON format of these objects
                // Please note that here the BG is dictated by the status of the section: if the section is about active tasks, it'll be lightly colored behind - if archived, dark.
                renderItem={({ item }) => {
                    return <View
                        style={[
                            styles.mainHPaddingSize,
                            item.active ? styles.activeListContainerBG : styles.archivedListContainerBG]}>
                        <ViewTask task={item} />
                    </View>
                }}

                // This renders a simple rounded footer for each section
                renderSectionFooter={({ section: { tag } }) => {
                    return <View style={[
                        styles.bottomListContainer,
                        tag === "activeTasks" ? styles.activeListContainerBG : styles.archivedListContainerBG
                    ]}>
                    </View>
                }}
            />

            {/* The following modal will work both for deletion and reactivation, based on the actual status of the project being viewed */}
            <Modal visible={showDeletePrompt} transparent={true} >
                <View style={styles.centeredView}>
                    <View style={styles.backgroundForModal}>
                    </View>
                    <View style={styles.modalWindow}>

                        {/* If the project is active, it asks "want to archive it" otherwise "want to permanently delete it?" */}
                        {ProjectData.active ? <Text style={styles.modalText} >Want to archive this project?</Text> :
                            <Text style={styles.modalText} >Want to permanently delete this project? PLEASE note this process is not revertible</Text>}

                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                // Based on the activation status, it handles the deletion in different ways
                                onPress={ProjectData.active ? handleProjectDeactivation : handleProjectPermanentDeletion}
                            >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.tertiary[500] }]}>
                                    <Text style={styles.modalText} >Yes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleDeletePrompt}
                            >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.secondary[500] }]}>
                                    <Text style={styles.modalText} >No</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>
        </View>
    )
}

export default ViewProject;
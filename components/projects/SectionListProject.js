import React, { useContext, useState } from 'react';
import { Modal, Platform, Pressable, SectionList, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { ProjectContext } from '../../utils/ProjectManager';
import { ThemeContext } from '../../utils/ThemeManager';
import ViewTask from '../tasks/ViewTask';
import NewTaskForm from '../tasks/NewTaskForm';
import EditProjectForm from './forms/EditProjectForm';
import StandardDivider from '../generic/StandardDivider';
import { Picker } from '@react-native-picker/picker';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';


const SectionListProject = (props) => {

    const theme = useContext(ThemeContext);

    // const navigation = useNavigation();

    const ProjectFunctions = useContext(ProjectContext);

    const { ProjectData, processedProjectData, sortBy, setSortBy, showDeletePrompt, setShowDeletePrompt } = props;

    const { handleProjectDeactivation, handleProjectPermanentDeletion, handleProjectReactivation } = props.processFunctions;

    const [showProjectEditForm, setShowProjectEditForm] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

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
            color: theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[700],
        },
        whiteText: {
            color: theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.secondary[50],
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
        singleButton: {
            // padding: 10,
            // marginLeft: -20
        },
        buttonsContainerSecondRow: {
            marginTop: 8,
            marginBottom: -8
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
        paddingLeft: {
            paddingLeft: 12
        },
        marginTop: {
            marginTop: 18
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
            marginTop: 16,
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
        },
        archivedTasksList: {
            borderRadius: 32,
            paddingHorizontal: 18,
            // paddingVertical: 18,
        },
        showOnArchivedTasks: {
            display: "flex"
        },
        activeListContainerBG: {
            // backgroundColor: theme.colors.secondary[50],
        },
        archivedListContainerBG: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.primary[200] : theme.colors.primary[800]
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
            // paddingTop: 32,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
        },
        orderSelectionContainer: {
            // backgroundColor: "red",
            width: "100%",
            minWidth: "100%",
            justifyContent: "space-between",
            alignItems: "center"
        },
        leftColumnTitle: {
            maxWidth: "65%",
            minWidth: "65%",
            width: "65%",
        },
        rightColumnTitle: {
            maxWidth: "50%",
            minWidth: Platform.OS === "web" ? 100 : "35%",
            width: "20%",
        },
        picker: {
            borderColor: theme.colors.transparent[50],
            color: theme.colors.primary[700],
            marginVertical: Platform.OS === "web" ? 5 : -10,
        },
        ...theme.styles.modal
    })

    async function toggleEditProjectForm() {
        setShowProjectEditForm(!showProjectEditForm);
        if (showProjectEditForm === false) {
            // await reloadAndProcessProjectData();
        }
    }

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    function onCopyToClipboardPress() {
        let toCopy = "";
        toCopy += `${ProjectData.name} - a list on Tick It Off!`;
        toCopy += "\n";
        toCopy += `Created by ${ProjectData.users.creators[0].username}`
        toCopy += "\n";
        toCopy += `http://maxpace.ns0.it:8425/project/${ProjectData._id}`;
        toCopy += "\n";
        toCopy += "\n";
        toCopy += "📝 ACTIVE TASKS";
        toCopy += "\n";
        for (let i = 0; i < ProjectData.tasks.length; i++) {
            const task = ProjectData.tasks[i];
            let finalLine;
            let checkStatus = task.completion ? `-✔️ ` : `-⭕ `;
            let name = task.name;
            let lineEnd = "\n";
            finalLine = checkStatus + name + lineEnd;
            toCopy += finalLine;
        }
        if (ProjectData.tasks.length === 0) {
            toCopy += "---No Active Tasks---";
            toCopy += "\n";
        }
        toCopy += "\n";
        toCopy += "📕 ARCHIVED TASKS";
        toCopy += "\n";
        for (let i = 0; i < ProjectData.archivedTasks.length; i++) {
            const task = ProjectData.archivedTasks[i];
            let finalLine;
            let checkStatus = task.completion ? `-✔️ ` : `-⭕ `;
            let name = task.name;
            let lineEnd = "\n";
            finalLine = checkStatus + name + lineEnd;
            toCopy += finalLine;
        }
        if (ProjectData.archivedTasks.length === 0) {
            toCopy += "---No Archived Tasks---";
        }
        // console.log(toCopy);
        Clipboard.setString(toCopy);
        showMessage({
            message: "The whole list has been copied in your clipboard.",
            type: "success"
        });
    }

    async function onShareButtonPress() {
        if (Platform.OS === "web") {
            Clipboard.setString(`http://maxpace.ns0.it:8425/project/${ProjectData._id}`);
            showMessage({
                message: "The URL of this page has been copied in your clipboard.",
                type: "info"
            });
            // ALERT somehow of the effective copy
        } else {

            try {
                const result = await Share.share({
                    title: `${ProjectData.name} - a list on TickItOff`,
                    message: `http://maxpace.ns0.it:8425/project/${ProjectData._id}`,
                    url: `http://maxpace.ns0.it:8425/project/${ProjectData._id}`
                })
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // console.log("SHARED ACTIVITY TYPE");
                    } else {
                        // console.log("SHARED NOT AT");
                    }
                    showMessage({
                        message: "List shared successfully",
                        type: "success"
                    });
                } else if (result.action === Share.dismissedAction) {
                    // console.log("DISMISSED")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function onRefreshFunction() {
        setIsRefreshing(true);
        ProjectFunctions.reloadCurrentProjectDataFunc().then((result) => { setIsRefreshing(false) });
    }

    return (
        <View style={styles.maxWidth}>
            <SectionList
                //The data is obtained by a method that parses the ProjectData in a SectionList readable form
                sections={processedProjectData}

                onRefresh={onRefreshFunction}
                refreshing={isRefreshing}

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
                                        <View style={[styles.columnContainer]}>
                                            <View style={[styles.rowContainer, styles.buttonsContainer]}>
                                                <View style={[styles.centered]}>
                                                    {ProjectData.active ?
                                                        <Pressable onPress={toggleEditProjectForm} >
                                                            <MaterialIcons name="edit" size={32} style={[styles.singleButton]}
                                                                color={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[500]}
                                                            />
                                                        </Pressable>
                                                        : <Pressable onPress={handleProjectReactivation}>
                                                            <MaterialIcons name="power" size={32} style={[styles.singleButton]}
                                                                color={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[500]}
                                                            />
                                                        </Pressable>
                                                    }
                                                </View>
                                                <View style={styles.centered}>
                                                    <Pressable onPress={toggleDeletePrompt} >
                                                        <MaterialIcons name="delete-outline" size={32} style={[styles.singleButton]}
                                                            color={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[500]}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                            <View style={[styles.rowContainer, styles.buttonsContainer, styles.buttonsContainerSecondRow]}>
                                                <View style={[styles.centered]}>
                                                    <Pressable onPress={onCopyToClipboardPress} >
                                                        <MaterialIcons name='content-copy' size={32} style={[styles.singleButton]}
                                                            color={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[500]}
                                                        />
                                                    </Pressable>
                                                </View>
                                                <View style={styles.centered}>
                                                    <Pressable onPress={onShareButtonPress} >
                                                        <MaterialIcons name="share" size={32} style={[styles.singleButton]}
                                                            color={theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[500]}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <StandardDivider color={theme.colors.tertiary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        {ProjectData.description}
                                    </Text>
                                    <StandardDivider color={theme.colors.tertiary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
                                    </Text>
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
                                    </Text>
                                </View>

                                <View style={[styles.columnContainer, styles.formContainer, styles.showOnProjectEditForm]} >
                                    <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
                                    <StandardDivider color={theme.colors.tertiary[500]} />
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

                                <View style={[styles.rowContainer, styles.orderSelectionContainer]}>
                                    <View style={[styles.leftColumnTitle]} >
                                        <Text style={[
                                            styles.name,
                                            styles.paddingLeft,
                                            tag === "activeTasks" ? styles.darkText : styles.whiteText]}>{title}
                                        </Text>
                                    </View>

                                    {/* The following Picker is used in combo with the SortBy state (in this object's parent, ViewProject) to change the way
                                     tasks are shown to the user. Selecting an item from this droplist changes the SortBy State in this object's parent. */}
                                    <View style={[styles.rightColumnTitle]} >
                                        <Picker selectedValue={sortBy.fieldToSortBy} mode="dropdown"
                                            style={[styles.picker]}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSortBy({ ascending: sortBy.ascending, fieldToSortBy: itemValue })
                                            }} >
                                            <Picker.Item label="Name" value="name" />
                                            <Picker.Item label="Date" value="creationDate" />
                                            <Picker.Item label="Completion" value="completion" />
                                        </Picker>
                                        <Picker selectedValue={sortBy.ascending} mode="dropdown"
                                            style={[styles.picker]}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSortBy({ ascending: !itemIndex, fieldToSortBy: sortBy.fieldToSortBy })
                                            }} >
                                            <Picker.Item label="Ascending" value={true} />
                                            <Picker.Item label="Descending" value={false} />
                                        </Picker>
                                    </View>
                                </View>
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
                            styles.name, styles.paddingLeft, styles.marginTop,
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
                <View style={styles.modalCenteredView}>
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
            <FlashMessage position={"top"} />
        </View>
    )
}

export default SectionListProject;
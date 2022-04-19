import React, { useContext, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextPropTypes, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../utils/ProjectManager';
import { ThemeContext } from '../../utils/ThemeManager';
import EditTaskForm from './EditTaskForm';
import StandardDivider from '../generic/StandardDivider';

//This var has to be passed to the editform to keep it look consistent
var heightForEditForm;

const ViewTask = (props) => {
    const ProjectFunctions = useContext(ProjectContext);

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [showTaskMenu, setShowTaskMenu] = useState(false);
    const [checkState, setCheckState] = useState(props.task.completion);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        rowContainer: {
            flexDirection: "row"
        },
        columnContainer: {
            flexDirection: "column"
        },
        toggledEditTaskForm: {
            flexDirection: showEditTaskForm ? "column" : "row"
        },
        taskContainer: {
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
            marginVertical: 10,
        },
        leftColumn: {
            flexGrow: 1,
            borderRadius: 16,
            borderWidth: 2,
            marginRight: theme.dimensions.methods.moderateScale(8),
            borderColor: decideColor("border"),
            backgroundColor: decideColor("background")
        },
        checkboxContainer: {
            justifyContent: "center",
            alignItems: "center",
            minHeight: 48,
            minWidth: 48,
        },
        checkboxIcon: {
            display: checkState ? "flex" : "none",
            width: 32 - 1,
            height: 32 - 1,
            color: decideColor("text")
        },
        rightColumn: {
            flexDirection: "row",
            flexGrow: 8,
            borderRadius: 16,
            width: "80%",
            minWidth: "80%",
            borderWidth: 2,
            borderColor: decideColor("border"),
            backgroundColor: decideColor("background"),
            justifyContent: "space-between",
            alignItems: showTaskMenu ? "flex-start" : "center",
            paddingVertical: showTaskMenu ? theme.dimensions.methods.moderateScale(10) : 0
        },
        rightColumnTextContainer: {
            flexBasis: "85%",
            width: "85%",
            maxWidth: "85%",
            justifyContent: "center",
            marginLeft: theme.dimensions.methods.moderateScale(8)
        },
        rightColumnTextName: {
            color: decideColor("text"),
            fontSize: 20
        },
        detailedTaskContainer: {
            display: showTaskMenu ? "flex" : "none",
        },
        rightColumnTextDescription: {
            color: decideColor("text"),
            fontSize: 16
        },
        rightColumnButtonContainer: {

            justifyContent: showTaskMenu ? "flex-start" : "center"
        },
        rightColumnButton: {


        },
        rightColumnButtonIcon: {
            height: 32 - 1,
            width: 32 - 1,
            color: decideColor("text")
        },
        oneButtonContainer: {
            display: showTaskMenu ? "none" : "flex",
            flexBasis: "10%",
            width: "10%",
            minWidth: "10%",
        },
        additionalButtonsContainer: {
            display: showTaskMenu ? "flex" : "none",
            flexBasis: "10%",
            width: "10%",
            minWidth: "10%",
        },
        marginVertical: {
            marginVertical: theme.dimensions.methods.moderateScale(16)
        },
        ...theme.styles.modal
    })

    async function toggleCompletion() {
        if (!showEditTaskForm) {
            setCheckState(!checkState);
            await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id, { ...props.task, completion: !props.task.completion });
        }
    }

    async function updateTaskFunc() {
        toggleEditTaskForm();
        await ProjectFunctions.reloadCurrentProjectDataFunc();

    }

    function toggleTaskMenu() {
        setShowTaskMenu(!showTaskMenu);
    }

    function toggleEditTaskForm() {
        setShowEditTaskForm(!showEditTaskForm);
    }

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    async function handleTaskDeactivation() {
        const response = await ProjectFunctions.deactivateTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                await ProjectFunctions.reloadCurrentProjectDataFunc();
            } else {
                // Code 204!
                await ProjectFunctions.reloadCurrentProjectDataFunc();
                toggleDeletePrompt();
            }
        } else {
            // Code 200
            await ProjectFunctions.reloadCurrentProjectDataFunc();
            toggleDeletePrompt();
        }
    }

    async function handleTaskReactivation() {
        const toSend = props.task;
        toSend.active = true;
        const response = await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, toSend._id, toSend);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                await ProjectFunctions.reloadCurrentProjectDataFunc();
            } else {
                // Code 204!
                await ProjectFunctions.reloadCurrentProjectDataFunc();
                toggleDeletePrompt();
            }
        } else {
            // Code 200
            await ProjectFunctions.reloadCurrentProjectDataFunc();
            toggleDeletePrompt();
        }
    }

    async function handleTaskPermanentDeletion() {
        const response = await ProjectFunctions.permanentlyDeleteTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                await ProjectFunctions.reloadCurrentProjectDataFunc();
            } else {
                // Code 204!
                await ProjectFunctions.reloadCurrentProjectDataFunc();
                toggleDeletePrompt();
            }
        } else {
            // Code 200
            await ProjectFunctions.reloadCurrentProjectDataFunc();
            toggleDeletePrompt();
        }
    }

    function decideColor(type) {
        if (props.task.active) {
            // WHEN THE TASK IS ACTIVE
            switch (type) {
                case "text":
                    if (checkState) {
                        // TEXT, ACTIVE CHECKED = WHITE
                        return theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[50];
                    } else {
                        // TEXT, ACTIVE UNCHECKED = BLUE
                        return theme.colorScheme === "dark" ? theme.colors.primary[700] : theme.colors.primary[500];
                    }
                    break;
                case "background":
                    if (checkState) {
                        // BG, ACTIVE CHECKED = BLUE
                        return theme.colors.primary[500];
                    } else {
                        // BG, ACTIVE UNCHECKED = WHITE
                        return theme.colors.transparent[50];
                    }
                    break;
                case "border":
                    // BORDERS, ACTIVE CHECKED AND UNCHECKED = BLUE
                    return theme.colors.primary[500];
                    break;

                default:
                    break;
            }
        } else {
            // WHEN TASK IS ARCHIVED
            switch (type) {
                case "text":
                    // TEXT, CHECKED OR NOT, HAS TO BE WHITE
                    return theme.colorScheme === "dark" ? theme.colors.primary[900] : theme.colors.primary[50];
                    break;
                case "background":
                    if (checkState) {
                        return theme.colors.primary[600];
                    } else {
                        return theme.colors.transparent[50];
                    }
                    break;
                case "border":
                    if (checkState) {
                        return theme.colors.primary[600];
                    } else {
                        return theme.colors.primary[50];
                    }
                    break;

                default:
                    break;
            }
        }
    }

    return (

        <React.Fragment>

            <View style={[styles.rowContainer, styles.taskContainer]}>
                <Pressable onPress={toggleCompletion}>
                    <View style={[styles.leftColumn, styles.checkboxContainer]} >
                        <View style={styles.checkboxContainer}>
                            <MaterialIcons name="done" size={32} style={styles.checkboxIcon} />
                        </View>
                    </View>
                </Pressable>

                <Pressable onPress={toggleCompletion}
                    style={[styles.rightColumn, styles.toggledEditTaskForm]} onLayout={(event) => {
                        !showEditTaskForm ? heightForEditForm = event.nativeEvent.layout.height : null;
                    }} >
                    {showEditTaskForm ? <EditTaskForm task={props.task} updateTaskFunc={updateTaskFunc} maxHeight={heightForEditForm} /> :
                        <>
                            <View style={styles.rightColumnTextContainer}>
                                <Text style={styles.rightColumnTextName} >
                                    {props.task.name}
                                </Text>
                                <View style={styles.detailedTaskContainer}>
                                    <StandardDivider color={theme.colors.tertiary[300]} />
                                    <Text style={styles.rightColumnTextDescription} >
                                        {props.task.description && props.task.description.length > 0 ? props.task.description : "Add description"}
                                    </Text>
                                    <StandardDivider color={theme.colors.tertiary[300]} />
                                    <Text style={[styles.rightColumnTextDescription]}>
                                        <MaterialIcons name="more-time" size={18} />:{props.task.creationDate}
                                    </Text>
                                    <Text style={[styles.rightColumnTextDescription]}>
                                        <MaterialIcons name="edit" size={18} />: {props.task.modificationDate}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.oneButtonContainer}>
                                <TouchableOpacity style={styles.rightColumnButtonContainer} onPress={toggleTaskMenu}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="menu" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.additionalButtonsContainer}>
                                <TouchableOpacity onPress={toggleTaskMenu}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="menu-open" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.marginVertical} onPress={
                                    props.task.active ? toggleEditTaskForm : handleTaskReactivation
                                }>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons
                                            name={props.task.active ? "edit" : "power"}
                                            size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.task.active ? handleTaskDeactivation : toggleDeletePrompt}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="delete" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>}

                </Pressable>


            </View>

            <Modal visible={showDeletePrompt} transparent={true} >

                <View style={styles.modalCenteredView}>
                    <View style={styles.backgroundForModal}>
                    </View>
                    <View style={styles.modalWindow}>
                        <Text style={styles.modalText}>Want to permanently delete this task? Please note that this process is not reversible</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                onPress={handleTaskPermanentDeletion}
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

        </React.Fragment >
    )
}

export default ViewTask;
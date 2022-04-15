import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../utils/ProjectManager';
import { ThemeContext } from '../../utils/ThemeManager';
import StandardDivider from '../generic/StandardDivider';

const inputRules = {
    name: {
        minLength: 4,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    description: {
        minLength: 0,
        regEx: `^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$`
    },
    image: {
        minLength: 0,
        regEx: ``
    }
}

/**
 * This has to be given a taskid prop, otherwise it won't be autofilled.
 * @param {*} props 
 * @returns 
 */
const EditTaskForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);

    const [patchedTask, setPatchedTask] = useState({ name: props.task.name, description: props.task.description });

    const [isWaitingForAPI, setIsWaitingForAPI] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        genericForm: {
            show: false,
            content: "Alert goes here"
        }
    })

    const theme = useContext(ThemeContext);
    const styles = StyleSheet.create({
        columnContainer: {
            flexDirection: "column"
        },
        rowContainer: {
            flexDirection: "row"
        },
        textColor: {
            color: props.task.completion ? theme.colors.secondary[50] : theme.colors.primary[500]
        },
        inputColors: {
            backgroundColor: props.task.completion ? theme.colors.secondary[50] : theme.colors.quartiary[50],
            color: props.task.completion ? theme.colors.secondary[700] : theme.colors.primary[800],
            borderWidth: 1,
            borderColor: theme.colors.primary[500]
        },
        formContainer: {
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            maxHeight: props.maxHeight < 200 ? 200 : props.maxHeight
        },
        leftColumn: {
            marginLeft: theme.dimensions.methods.moderateScale(8),
            flexGrow: 9,
            width: "82%",
            minWidth: "82%",
            maxWidth: "82%",
        },
        nameInput: {
            height: 48,
        },
        descriptionInput: {
            height: 64,
        },
        description: {
            fontSize: 16,
            color: theme.colors.primary[500]
        },
        inputForm: {
            borderRadius: theme.dimensions.methods.moderateScale(16),
            paddingHorizontal: 12,
            paddingVertical: 4,
            fontSize: 18,
            fontWeight: "500"
        },
        rightColumn: {
            flexGrow: 1,
            width: "12%",
            minWidth: "12%",
            maxWidth: "12%",
            marginLeft: theme.dimensions.methods.moderateScale(5)
        },
        rightColumnButtonContainer: {
            backgroundColor: theme.colors.tertiary[400],
            borderRadius: 16,
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            minHeight: "100%",

        },
        rightColumnButton: {
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            minHeight: "100%",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
        },
        buttonIcon: {
            color: theme.colors.secondary[50],
            width: 32 - 1,
            height: 32 - 1
        },
        errorMessageContainer: {
            display: alertMessages.genericForm.show ? "flex" : "none",
            marginTop: 12,
            marginLeft: 8
        },
        errorMessage: {
            color: theme.colors.tertiary[500],
            fontSize: 18
        }

    });

    function handleChange(value, fieldName) {
        setPatchedTask(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        setIsWaitingForAPI(true);
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        if (patchedTask.name.length >= inputRules.name.minLength) {
            if (patchedTask.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id, patchedTask);

                if (response.status !== 200) {
                    console.log("NOT 200!")
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    console.log("200")
                    toSetInAlertMessages.genericForm = { show: false, content: "Alert goes here" };
                    await props.updateTaskFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task description should be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task name should be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
        setIsWaitingForAPI(false);
    }


    return (
        <>
            <View style={[styles.formContainer, styles.rowContainer]}>
                <View style={[styles.columnContainer, styles.leftColumn]} >
                    <TextInput style={[styles.inputColors, styles.inputForm, styles.nameInput]}
                        placeholder="Edit task name"
                        onChangeText={(value) => { handleChange(value, "name") }}
                        value={patchedTask.name} autocorrect={true}
                    />
                    <StandardDivider color={theme.colors.tertiary[300]} />
                    <TextInput style={[styles.inputColors, styles.inputForm, styles.descriptionInput]}
                        placeholder="Edit task Description"
                        onChangeText={(value) => { handleChange(value, "description") }} value={patchedTask.description} autocorrect={true}
                    />
                    <StandardDivider color={theme.colors.tertiary[300]} />
                    <Text style={[styles.description, styles.textColor]}>
                        <MaterialIcons name="more-time" size={18} />:{props.task.creationDate}
                    </Text>
                    <Text style={[styles.description, styles.textColor]}>
                        <MaterialIcons name="edit" size={18} />: {props.task.modificationDate}
                    </Text>
                </View>
                <View style={[styles.rightColumn]} >
                    <TouchableOpacity style={styles.rightColumnButtonContainer} onPress={handleSubmit}>
                        <View style={styles.rightColumnButton}>
                            <MaterialIcons name={isWaitingForAPI ? 'update' : 'edit'} size={32} style={styles.rightColumnButtonIcon} color={theme.colors.secondary[50]} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>
                    {alertMessages.genericForm.content}
                </Text>
            </View>
        </>
    )
}

export default EditTaskForm;
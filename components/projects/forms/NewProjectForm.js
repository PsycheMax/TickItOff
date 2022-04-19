import React, { useState, useContext } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../../utils/ProjectManager';
import { ThemeContext } from '../../../utils/ThemeManager';
import { useNavigation } from '@react-navigation/native';

const inputRules = {
    name: {
        minLength: 8,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    description: {
        minLength: 8,
        regEx: `^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$`
    },
    image: {
        minLength: 0,
        regEx: ``
    }
}

const NewProjectForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const navigator = useNavigation();

    const [newProject, setNewProject] = useState({ name: "", description: "" });
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        genericForm: {
            show: false,
            content: "Alert goes here"
        }
    })

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        mainContainer: {
            flexDirection: "row",
            flexWrap: "nowrap",
            backgroundColor: theme.colors.primary[500],
            borderRadius: 16,
            minHeight: Platform.OS === "web" ? 150 : 120,
            height: Platform.OS === "web" ? 150 : 120,
            alignItems: "center"
        },
        leftColumn: {
            flexGrow: 6,
            height: "80%",
            minHeight: "80%",
            maxHeight: "80%",
            paddingVertical: theme.dimensions.methods.moderateScale(3),
            width: "85%",
            minWidth: "85%",
            maxWidth: "85%",
            paddingLeft: theme.dimensions.methods.moderateScale(12),
            justifyContent: "space-between",
        },
        inputField: {
            color: theme.colors.primary[900],
            backgroundColor: theme.colors.secondary[50],
            height: Platform.OS === "web" ? 48 : 40,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 4,
            fontSize: 18,
            fontWeight: "500"
        },
        rightColumn: {
            flexGrow: 1,
            height: "80%",
            minHeight: "80%",
            maxHeight: "80%",
            width: "15%",
            minWidth: "15%",
            maxWidth: "15%",
            alignItems: "center",
            marginRight: theme.dimensions.methods.moderateScale(8),

        },
        submitButton: {
            height: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            width: "80%",
            minWidth: "80%",
            maxWidth: "80%",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: theme.colors.tertiary[400],
            borderRadius: 16,

        },
        submitLogo: {
            color: theme.colors.secondary[50],
            width: Platform.OS === "web" ? 48 - 1 : 28 - 1,
            height: Platform.OS === "web" ? 48 - 1 : 28 - 1
        },
        errorMessageContainer: {
            display: alertMessages.genericForm.show ? "flex" : "none",
            marginTop: 12
        },
        errorMessage: {
            color: theme.colors.tertiary[500],
            fontSize: 18
        }
    });

    function handleChange(value, fieldName) {
        setNewProject(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        setIsWaitingForAPI(true);
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill the form correctly" }
        if (newProject.name.length >= inputRules.name.minLength) {
            if (newProject.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.createProjectFunc(newProject);
                if (response.status !== 201) {
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    // The project has already been set by the Projectfunction CreateProjectFunc function
                    setNewProject({ name: "", description: "" });
                    toSetInAlertMessages = {
                        genericForm: {
                            show: false,
                            content: "Alert goes here"
                        }
                    };
                    navigator.navigate('ViewProject', { id: response.data._id });
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Descriptions must be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Name must be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
        setIsWaitingForAPI(false);
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.leftColumn}>
                    <TextInput
                        placeholder="New Project Title" placeholderTextColor={theme.colors.primary[500]}
                        accessibilityLabel='New Project Title Form'
                        onChangeText={(value) => { handleChange(value, "name") }}
                        value={newProject.name} autocorrect={true}
                        style={styles.inputField} />
                    <TextInput
                        placeholder="New Project Description" placeholderTextColor={theme.colors.primary[500]}
                        accessibilityLabel='New Project description Form'
                        onChangeText={(value) => { handleChange(value, "description") }}
                        value={newProject.description} autocorrect={true}
                        style={styles.inputField} />
                </View>
                <View style={styles.rightColumn} accessibilityLabel="Create new project">
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} >

                        <MaterialIcons style={styles.submitLogo}
                            name={isWaitingForAPI ? 'update' : 'playlist-add'}
                            size={Platform.OS === "web" ? 48 : 28} />

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

export default NewProjectForm;

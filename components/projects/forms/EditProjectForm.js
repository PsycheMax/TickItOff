import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../../utils/ProjectManager';
import { ThemeContext } from '../../../utils/ThemeManager';
import StandardDivider from '../../generic/StandardDivider';

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

const EditProjectForm = (props) => {

    const theme = useContext(ThemeContext);
    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [patchedProject, setPatchedProject] = useState({ name: ProjectData.name, description: ProjectData.description });
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(false);

    const [minHeightDescriptionInputField, setMinHeightDescriptionInputField] = useState(64);

    const styles = StyleSheet.create({
        columnContainer: {
            flexDirection: "column"
        },
        rowContainer: {
            marginTop: 12,
            flexDirection: "row",
            maxHeight: (theme.dimensions.windowHeight * 0.12) + minHeightDescriptionInputField,
            height: (theme.dimensions.windowHeight * 0.12) + minHeightDescriptionInputField,
            minHeight: (theme.dimensions.windowHeight * 0.12) + minHeightDescriptionInputField
        },
        darkText: {
            color: theme.colors.primary[700]
        },
        name: {
            fontSize: 32,
            fontWeight: "700"
        },
        description: {
            fontSize: 18,
            fontWeight: "500"
        },
        leftColumn: {
            flexGrow: 6,
            width: "85%",
            minWidth: "85%",
            maxWidth: "85%",
        },
        inputField: {
            color: theme.colors.primary[900],
            backgroundColor: theme.colors.secondary[50],
            // height: 32,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.colors.primary[500],
            paddingHorizontal: 12,
            paddingVertical: 4,
            fontSize: 18,
            fontWeight: "500"
        },
        rightColumn: {
            height: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            flexGrow: 1,
            width: "15%",
            minWidth: "15%",
            maxWidth: "15%",
            alignItems: "center",
            marginRight: 8,

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
            width: 32 - 1,
            height: 32 - 1
        },
        nameInput: {
            height: 48,

        },
        descriptionInput: {
            height: minHeightDescriptionInputField,
            minHeight: minHeightDescriptionInputField,

        },
        errorMessage: {
            color: theme.colors.tertiary[300],
            textAlignVertical: "center"
        }
    })

    const [alertMessages, setAlertMessages] = useState({
        name: {
            show: false,
            content: "Alert goes here"
        },
        description: {
            show: false,
            content: "Alert goes here"
        },
        genericForm: {
            show: false,
            content: "Alert goes here"
        },
    })

    function handleChange(value, fieldName) {
        setPatchedProject(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmitEdit() {
        setIsWaitingForAPI(true);
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill the form correctly" }
        if (patchedProject.name.length >= inputRules.name.minLength) {
            if (patchedProject.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, patchedProject);
                if (response.status !== 200) {
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    toSetInAlertMessages.genericForm = { show: false, content: "" };
                    await props.toggleFormFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "Description not long enough" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Name not long enough" };
        }
        setAlertMessages(toSetInAlertMessages);
        setIsWaitingForAPI(false);
    }

    return (
        <View style={styles.rowContainer} >
            <View style={styles.leftColumn}>
                <TextInput
                    style={[styles.inputField, styles.nameInput, styles.name]}
                    onChangeText={(value) => { handleChange(value, "name") }}
                    value={patchedProject.name} autocorrect={true}
                    onSubmitEditing={handleSubmitEdit}
                    editable={!isWaitingForAPI}
                />
                <StandardDivider color={theme.colors.tertiary[500]} />

                <TextInput
                    multiline={true} style={[styles.description, styles.inputField, styles.descriptionInput]}
                    onChangeText={(value) => { handleChange(value, "description") }}
                    value={patchedProject.description} autocorrect={true}
                    onSubmitEditing={handleSubmitEdit}
                    onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }) => { setMinHeightDescriptionInputField(height) }}
                    editable={!isWaitingForAPI}
                />

                <Text style={styles.errorMessage}>
                    {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
                </Text>
            </View>
            <View style={styles.rightColumn}>
                <TouchableOpacity onPress={handleSubmitEdit} style={styles.submitButton}>
                    <MaterialIcons style={styles.submitLogo} size={32} name={isWaitingForAPI ? 'update' : 'done'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProjectForm;
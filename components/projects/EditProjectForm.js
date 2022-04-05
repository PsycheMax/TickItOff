import React, { useState, useContext } from 'react';
// import { Icon, Center, Input, IconButton, Box, Flex, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ProjectContext } from '../../utils/ProjectManager';
import StandardDivider from '../StandardDivider';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { ThemeContext } from '../../utils/ThemeManager';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    const { methods } = theme.dimensions;

    const styles = StyleSheet.create({
        columnContainer: {
            flexDirection: "column"
        },
        rowContainer: {
            flexDirection: "row",
            maxHeight: theme.dimensions.windowHeight * 0.16
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
            backgroundColor: theme.colors.secondary[50],
            height: methods.moderateScale(32),
            borderRadius: methods.moderateScale(16),
            borderWidth: methods.moderateScale(1),
            borderColor: theme.colors.primary[500],
            paddingHorizontal: methods.moderateScale(12),
            paddingVertical: methods.moderateScale(4),
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
            marginRight: methods.moderateScale(8),

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
            height: 64,

        },
        errorMessage: {
            color: theme.colors.tertiary[300],
            textAlignVertical: "center"
        }
    })

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [patchedProject, setPatchedProject] = useState({ name: ProjectData.name, description: ProjectData.description });

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
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill the form correctly" }
        if (patchedProject.name.length >= inputRules.name.minLength) {
            if (patchedProject.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, patchedProject);
                if (response.status !== 200) {
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    toSetInAlertMessages.genericForm = { show: false, content: "" };
                    props.toggleFormFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "Description not long enough" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Name not long enough" };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    return (
        <View style={styles.rowContainer} >
            <View style={styles.leftColumn}>
                <TextInput
                    style={[styles.inputField, styles.nameInput, styles.name]}
                    onChangeText={(value) => { handleChange(value, "name") }}
                    value={patchedProject.name} autocorrect={true}
                />
                <StandardDivider />

                <TextInput
                    multiline={true} style={[styles.inputField, styles.descriptionInput, styles.description]}
                    onChangeText={(value) => { handleChange(value, "description") }}
                    value={patchedProject.description} autocorrect={true}
                />

                <Text style={styles.errorMessage}>
                    {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
                </Text>
            </View>
            <View style={styles.rightColumn}>
                <TouchableOpacity onPress={handleSubmitEdit} style={styles.submitButton}>
                    <MaterialIcons style={styles.submitLogo} size={32} name="done" />
                </TouchableOpacity>
            </View>
        </View>
        // <Flex direction={"row"}>
        //     <Box w={"95%"}>

        //         <Input placeholder="Edit Project Title"
        //             fontSize={"lg"} fontWeight={"bold"}
        //             onChangeText={(value) => { handleChange(value, "name") }}
        //             type="text" value={patchedProject.name} autocorrect={true}
        //         />

        //         <StandardDivider />

        //         <Input placeholder="Edit Project Description"
        //             fontSize={"md"} fontWeight={"normal"}
        //             onChangeText={(value) => { handleChange(value, "description") }}
        //             type="text" value={patchedProject.description} autocorrect={true}
        //             h={scale(96)} multiline={true} />

        //         <StandardDivider />

        //         <Text color={"tertiary.500"}>
        //             {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
        //         </Text>
        //     </Box>
        //     <Center ml={scale(8)} w={"5%"} >
        //         <IconButton
        //             icon={<Icon as={MaterialIcons} name="done" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
        //             onPress={handleSubmitEdit}
        //         />
        //     </Center>
        // </Flex>

    )
}

export default EditProjectForm;
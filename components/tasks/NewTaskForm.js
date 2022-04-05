import React, { useState, useContext } from 'react';
// import { HStack, VStack, Icon, Center, Box, FormControl, Checkbox, Input, IconButton } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { MaterialIcons } from '@expo/vector-icons';
import { ProjectContext } from '../../utils/ProjectManager';

import { ThemeContext } from '../../utils/ThemeManager';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

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

const NewTaskForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);

    const [newTask, setNewTask] = useState({ name: "", description: "", active: true, completion: false, image: "" });

    const [alertMessages, setAlertMessages] = useState({
        genericForm: {
            show: false,
            content: "Alert goes here"
        }
    })


    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        rowContainer: {
            flexDirection: "row"
        },
        classContainer: {
            flexDirection: "column"
        },
        formContainer: {
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
            maxHeight: theme.dimensions.methods.moderateVerticalScale(48),
            marginVertical: theme.dimensions.methods.moderateVerticalScale(4.8),
            borderRadius: 16,
            borderWidth: 2,
            borderColor: theme.colors.primary[500],
            backgroundColor: theme.colors.secondary[50],
            // paddingVertical: theme.dimensions.methods.moderateScale(10)
        },
        mainRow: {
            justifyContent: "center",
            alignItems: "center"
        },
        inputFormContainer: {
            width: "90%",
            maxWidth: "90%",
            minWidth: "90%",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: theme.dimensions.methods.moderateScale(48),
            height: "100%"
        },
        inputForm: {
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            fontSize: 20,
            fontWeight: "400",
            paddingHorizontal: 12,
            paddingVertical: 4,
            // marginTop: theme.dimensions.methods.moderateScale(8),
            // height: theme.dimensions.methods.moderateScale(32),
            // minHeight: 48,
            height: "100%",
            minHeight: "100%",
            borderRadius: theme.dimensions.methods.moderateScale(16),
            color: theme.colors.primary[700],
        },
        buttonContainer: {
            width: "10%",
            minWidth: "10%",
            maxWidth: "10%",
            alignItems: "center",
            justifyContent: "center"
        },
        button: {
            // backgroundColor: "red",
        },
        buttonIcon: {
            // backgroundColor: "pink",
            width: 32 - 1,
            height: 32 - 1,
            color: theme.colors.primary[700]
        },
        errorMessageContainer: {
            display: alertMessages.genericForm.show ? "flex" : "none",
            marginTop: 12
        },
        errorMessage: {
            color: theme.colors.tertiary[500],
            fontSize: 18
        }
    })


    function handleChange(value, fieldName) {
        setNewTask(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        if (newTask.name.length >= inputRules.name.minLength) {
            if (newTask.description.length >= inputRules.description.minLength) {

                const response = await ProjectFunctions.createTaskInProjectFunc(ProjectFunctions.currentProjectData._id, newTask);

                if (response.status !== 201) {
                    toSetInAlertMessages.genericForm = { show: true, content: response.data.message }
                } else {
                    // SUCCESS HERE
                    setNewTask({ name: "", description: "", active: true, completion: false, image: "" });
                    toSetInAlertMessages = { genericForm: { show: false, content: "Alert goes here" } };
                    await ProjectFunctions.reloadCurrentProjectDataFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task description should be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task name should be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    return (
        <>
            <View style={[styles.formContainer, styles.columnContainer, styles.onShowError]}>
                <View style={[styles.rowContainer, styles.mainRow]}>
                    <View style={styles.inputFormContainer}>
                        <TextInput
                            placeholder="Add a new task" value={newTask.name} autocorrect={true}
                            onChangeText={(value) => { handleChange(value, "name") }}
                            style={styles.inputForm} />
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} >
                        <View style={styles.button}>
                            <MaterialIcons style={styles.buttonIcon} name="playlist-add" size={32} />
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

export default NewTaskForm;
//     return (
//         <VStack w={"full"} minW={"full"} display={"flex"} minH={scale(32)} borderWidth={2} borderColor={"primary.500"} backgroundColor={"primary.50"} borderRadius={"lg"}>
//             <HStack w={"full"} minW={"full"}>
//                 <Input placeholder="Add a new task" w={"90%"} borderWidth={0} fontSize={"lg"} color={"primary.800"}
//                     onChangeText={(value) => { handleChange(value, "name") }} type="text" value={newTask.name} autocorrect={true} />
//                 {/* <Input placeholder="New Task Description" onChangeText={(value) => { handleChange(value, "description") }} type="text" value={newTask.description} autocorrect={true}></Input> */}
//                 <Center w={"10%"}>
//                     <IconButton icon={<Icon color={"primary.500"} as={<MaterialIcons name="playlist-add" size="sm" />} />}
//                         mt="2" colorScheme="primary"
//                         onPress={handleSubmit} title={"Add task"} />
//                 </Center>
//             </HStack>
//             <FormControl isInvalid={alertMessages.genericForm.show} >
//                 <FormControl.ErrorMessage leftIcon={<Center><Icon as={MaterialIcons} name="error" size="xs" /></Center>}>
//                     {alertMessages.genericForm.content}
//                 </FormControl.ErrorMessage>
//             </FormControl>

//         </VStack >
//     )
// }

// export default NewTaskForm;
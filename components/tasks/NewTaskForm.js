import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Icon, Text, Center, Box, Heading, FormControl, Link, Checkbox, Input, IconButton } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { MaterialIcons } from "@native-base/icons";
import FormField from '../users/UserForms/FormComponents/FormField';
import { ProjectContext } from '../../utils/ProjectManager';

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

const NewTaskForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const ViewFunctions = useContext(ViewManagerContext);


    const [newTask, setNewTask] = useState({ name: "", description: "", active: true, completion: false, image: "" });

    const [alertMessages, setAlertMessages] = useState({
        name: {
            show: false,
            content: "Alert goes here"
        },
        description: {
            show: false,
            content: "Alert goes here"
        },
        active: {
            show: false,
            content: "Alert goes here"
        },
        completion: {
            show: false,
            content: "Alert goes here"
        },
        image: {
            show: false,
            content: "Alert goes here"
        },
        genericForm: {
            show: false,
            content: "Alert goes here"
        },
    })

    const userDataContext = useContext(LoggedUserContext);

    function checkFields() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        newTask.name.length < inputRules.name.minLength ? toSetInAlertMessages.name = {
            show: true,
            content: `Name must be at least ${inputRules.name.minLength} characters long`
        } : toSetInAlertMessages.name = { show: false, content: "Alert goes here" };
        newTask.description.length < inputRules.description.minLength ? toSetInAlertMessages.description = {
            show: true,
            content: `Descriptions must be at least ${inputRules.description.minLength} characters long`
        } : toSetInAlertMessages.description = { show: false, content: "Alert goes here" };
        newTask.image.length === 0 ? toSetInAlertMessages.image = {
            show: true, content: "Image cannot be empty"
        } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        newTask.completion === null ? toSetInAlertMessages.completion = {
            show: true,
            content: `Completion must be set`
        } : toSetInAlertMessages.completion = { show: false, content: "Alert goes here" };
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setNewTask(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        let toSetInAlertMessages = alertMessages;
        if (newTask.name.length >= inputRules.name.minLength) {
            if (newTask.description.length >= inputRules.description.minLength) {

                const response = await ProjectFunctions.createTaskInProjectFunc(ProjectFunctions.currentProjectData._id, newTask);
                console.log(response);

                // TODO Redirect here to the ProjectView of new Project

                if (response.status !== 201) {
                    console.log(response.data);
                    toSetInAlertMessages.genericForm = { show: true, content: response.data.message }
                } else {
                    // SUCCESS HERE
                    await ProjectFunctions.reloadCurrentProjectDataFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task description should be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task name should be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();

    }

    return (
        <VStack w={"full"} minW={"full"} justifyContent={"center"} display={"block"}>

            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Add a new Task
            </Heading>
            <Box size="lg" alignSelf={"auto"} w={"full"} h={"100%"}>
                <HStack>
                    <Center>
                        <Checkbox w={"1/6"} colorScheme="orange" size="lg" p={0} m={0}
                            icon={<Icon as={<MaterialIcons name="celebration" />} />} defaultIsChecked={false}
                            isChecked={newTask.completion} onChange={(isChecked) => { handleChange(isChecked, "completion"); console.log(newTask.completion) }}
                        />
                    </Center>
                    <VStack w={"5/6"} pl={9} >
                        <Input placeholder="Task Name" onChangeText={(value) => { handleChange(value, "name") }} type="text" value={newTask.name} autocorrect={true}></Input>
                        <Input placeholder="Task Description" onChangeText={(value) => { handleChange(value, "description") }} type="text" value={newTask.description} autocorrect={true}></Input>


                        <FormControl isInvalid={alertMessages.genericForm.show} >
                            <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                                {alertMessages.genericForm.content}
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </VStack>
                    <IconButton icon={<Icon as={<MaterialIcons name="playlist-add" />} />}
                        w={"1/6"} mt="2" colorScheme="indigo"
                        onPress={handleSubmit} title={"Add task"} />

                </HStack>
            </Box>
        </VStack >
    )
}

export default NewTaskForm;


{/*             
            <VStack space={3} mt="5">
                <FormField
                    isInvalid={alertMessages.name.show} isRequired={alertMessages.name.show} value={newTask.name} type="text"
                    autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "name") }}
                    inputRightElement={false}
                    text={{
                        label: "name", name: "name", placeholder: "name", alertMessage: alertMessages.name.content,
                        iconName: "error"
                    }} >
                </FormField>
                <FormField
                    isInvalid={alertMessages.description.show} isRequired={alertMessages.description.show} value={newTask.description} type="text"
                    autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "description") }}
                    inputRightElement={false}
                    text={{
                        label: "Description", name: "description", autocomplete: "description", placeholder: "Description", alertMessage: alertMessages.description.content,
                        iconName: "error"
                    }} >
                </FormField>
                <FormField
                    isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={newTask.image} type="text"
                    autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
                    inputRightElement={false}
                    text={{
                        label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
                        iconName: "error"
                    }} >
                </FormField>
                <FormField
                    isInvalid={alertMessages.completion.show} isRequired={alertMessages.completion.show} value={newTask.completion} type="text"
                    autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "completion") }}
                    inputRightElement={false}
                    text={{
                        label: "completion", name: "completion", autocomplete: "completion", placeholder: "completion", alertMessage: alertMessages.completion.content,
                        iconName: "error"
                    }} >
                </FormField>

                <FormControl isInvalid={alertMessages.genericForm.show} >
                    <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
                        {alertMessages.genericForm.content}
                    </FormControl.ErrorMessage>
                </FormControl>

                <Button mt="2" colorScheme="indigo"
                    onPress={handleSubmit} title={"Add task"}>
                    Add task
                </Button>
            </VStack> */}
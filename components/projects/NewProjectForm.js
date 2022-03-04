import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Icon, Text, Center, Box, Heading, FormControl, Link } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";
import FormField from '../users/UserForms/FormComponents/FormField';
import { ProjectContext } from '../../utils/ProjectManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';

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
    const ViewFunctions = useContext(ViewManagerContext);

    const [newProject, setNewProject] = useState({ name: "", description: "", status: "", completion: "", image: "" });

    const [alertMessages, setAlertMessages] = useState({
        name: {
            show: false,
            content: "Alert goes here"
        },
        description: {
            show: false,
            content: "Alert goes here"
        },
        status: {
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
        newProject.name.length < inputRules.name.minLength ? toSetInAlertMessages.name = {
            show: true,
            content: `Name must be at least ${inputRules.name.minLength} characters long`
        } : toSetInAlertMessages.name = { show: false, content: "Alert goes here" };
        newProject.description.length < inputRules.description.minLength ? toSetInAlertMessages.description = {
            show: true,
            content: `Descriptions must be at least ${inputRules.description.minLength} characters long`
        } : toSetInAlertMessages.description = { show: false, content: "Alert goes here" };
        newProject.image.length === 0 ? toSetInAlertMessages.image = {
            show: true, content: "Image cannot be empty"
        } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        newProject.completion === null ? toSetInAlertMessages.completion = {
            show: true,
            content: `Completion must be set`
        } : toSetInAlertMessages.completion = { show: false, content: "Alert goes here" };
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setNewProject(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        let toSetInAlertMessages = alertMessages;
        if (newProject.name.length >= inputRules.name.minLength) {
            if (newProject.description.length >= inputRules.description.minLength) {
                if (newProject.image.length >= inputRules.image.minLength) {
                    if (newProject.completion !== null) {


                        const response = await ProjectFunctions.createProjectFunc(newProject);
                        console.log(response);

                        // TODO Redirect here to the ProjectView of new Project

                        if (response.status !== 201) {
                            console.log(response.data);
                            toSetInAlertMessages.genericForm = { show: true, content: response.data }
                        } else {
                            // The project has already been set by the Projectfunction CreateProjectFunc function
                            ViewFunctions.changeCurrentViewTo('ViewProject');
                        }
                    } else {
                        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                    }
                } else {
                    toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();

    }

    return (
        <VStack h={"100%"} justifyContent={"center"}>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading> */}
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Create a new Project
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormField
                            isInvalid={alertMessages.name.show} isRequired={alertMessages.name.show} value={newProject.name} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "name") }}
                            inputRightElement={false}
                            text={{
                                label: "name", name: "name", placeholder: "name", alertMessage: alertMessages.name.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.description.show} isRequired={alertMessages.description.show} value={newProject.description} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "description") }}
                            inputRightElement={false}
                            text={{
                                label: "Description", name: "description", autocomplete: "description", placeholder: "Description", alertMessage: alertMessages.description.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={newProject.image} type="text"
                            autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
                            inputRightElement={false}
                            text={{
                                label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
                                iconName: "error"
                            }} >
                        </FormField>
                        <FormField
                            isInvalid={alertMessages.completion.show} isRequired={alertMessages.completion.show} value={newProject.completion} type="text"
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
                            onPress={handleSubmit} title={"Add project"}>
                            Create Project
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </VStack >
    )
}

export default NewProjectForm;

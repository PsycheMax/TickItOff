import React, { useState, useEffect, useContext } from 'react';
import { HStack, VStack, Button, Icon, Text, Center, Box, Heading, FormControl, Link, Input, IconButton } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
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


const EditProjectForm = (props) => {

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
        // status: {
        //     show: false,
        //     content: "Alert goes here"
        // },
        // completion: {
        //     show: false,
        //     content: "Alert goes here"
        // },
        // image: {
        //     show: false,
        //     content: "Alert goes here"
        // },
        genericForm: {
            show: false,
            content: "Alert goes here"
        },
    })

    function checkFields() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        patchedProject.name.length < inputRules.name.minLength ? toSetInAlertMessages.name = {
            show: true,
            content: `Name must be at least ${inputRules.name.minLength} characters long`
        } : toSetInAlertMessages.name = { show: false, content: "Alert goes here" };
        patchedProject.description.length < inputRules.description.minLength ? toSetInAlertMessages.description = {
            show: true,
            content: `Descriptions must be at least ${inputRules.description.minLength} characters long`
        } : toSetInAlertMessages.description = { show: false, content: "Alert goes here" };
        // patchedProject.image.length === 0 ? toSetInAlertMessages.image = {
        //     show: true, content: "Image cannot be empty"
        // } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        // patchedProject.completion === null ? toSetInAlertMessages.completion = {
        //     show: true,
        //     content: `Completion must be set`
        // } : toSetInAlertMessages.completion = { show: false, content: "Alert goes here" };
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setPatchedProject(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmitEdit() {
        console.log("MMOCCAMMAMMETA");
        let toSetInAlertMessages = alertMessages;
        if (patchedProject.name.length >= inputRules.name.minLength) {
            if (patchedProject.description.length >= inputRules.description.minLength) {
                console.log(ProjectData._id);
                console.log(patchedProject);
                const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, patchedProject);
                console.log(response);
                if (response.status !== 200) {
                    console.log(response.data);
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    props.toggleFormFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "DEscription not long enough" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Name not long enough" };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();
    }

    return (
        <HStack>
            <VStack w={"5/6"} h={"100%"}>
                <Input placeholder="Edit Project Title"
                    fontSize={"lg"} fontWeight={"bold"}
                    onChangeText={(value) => { handleChange(value, "name") }}
                    type="text" value={patchedProject.name} autocorrect={true}
                />
                <Input placeholder="Edit Project Description"
                    fontSize={"md"} fontWeight={"normal"}
                    onChangeText={(value) => { handleChange(value, "description") }}
                    type="text" value={patchedProject.description} autocorrect={true} />
            </VStack >
            <Center w={"1/6"}>
                <IconButton
                    icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "sm" }}
                    onPress={handleSubmitEdit}
                />
            </Center>
        </HStack>
    )
}

export default EditProjectForm;

// // <Box safeArea p="2" py="8" w="90%" maxW="290">
//                     {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
//                         color: "warmGray.50"
//                     }}>
//                         Welcome
//                     </Heading> */}
//                     <Heading mt="1" _dark={{
//                         color: "warmGray.200"
//                     }} color="coolGray.600" fontWeight="medium" size="xs">
//                         Edit {patchedProject.name}
//                     </Heading>

//                     <VStack space={3} mt="5">
//                         <FormField
//                             isInvalid={alertMessages.name.show} isRequired={alertMessages.name.show} value={patchedProject.name} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "name") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "name", name: "name", placeholder: "name", alertMessage: alertMessages.name.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.description.show} isRequired={alertMessages.description.show} value={patchedProject.description} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "description") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "Description", name: "description", autocomplete: "description", placeholder: "Description", alertMessage: alertMessages.description.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={patchedProject.image} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.completion.show} isRequired={alertMessages.completion.show} value={patchedProject.completion} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "completion") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "completion", name: "completion", autocomplete: "completion", placeholder: "completion", alertMessage: alertMessages.completion.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>

//                         <FormControl isInvalid={alertMessages.genericForm.show} >
//                             <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
//                                 {alertMessages.genericForm.content}
//                             </FormControl.ErrorMessage>
//                         </FormControl>

//                         <Button mt="2" colorScheme="indigo"
//                             onPress={handleSubmit} title={"Edit Project"}>
//                             Edit Project
//                         </Button>
//                     </VStack>
//                 </Box>
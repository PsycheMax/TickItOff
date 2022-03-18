import React, { useState, useContext } from 'react';
import { HStack, VStack, IconButton, Icon, Center, Input, Text } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
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

    const [newProject, setNewProject] = useState({ name: "", description: ""});

    const [alertMessages, setAlertMessages] = useState({
        genericForm: {
            show: false,
            content: "Alert goes here"
        }
    })

    function handleChange(value, fieldName) {
        setNewProject(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill the form correctly"}
        if (newProject.name.length >= inputRules.name.minLength) {
            if (newProject.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.createProjectFunc(newProject);
                if (response.status !== 201) {
                    console.log(response.data);
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    // The project has already been set by the Projectfunction CreateProjectFunc function
                    ViewFunctions.changeCurrentViewTo('ViewProject');
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Descriptions must be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Name must be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    return (
        <HStack>
            <VStack w={"5/6"} h={"100%"}>
                <Input placeholder="New Project Title"
                    fontSize={"lg"} fontWeight={"bold"}
                    onChangeText={(value) => { handleChange(value, "name") }}
                    type="text" value={newProject.name} autocorrect={true}
                />
                <Input placeholder="New Project Description"
                    fontSize={"md"} fontWeight={"normal"}
                    onChangeText={(value) => { handleChange(value, "description") }}
                    type="text" value={newProject.description} autocorrect={true} />
                <Center display={alertMessages.genericForm.show?"block":"none"}>
                    <Icon as={MaterialIcons} name="error" color={"danger.500"} size="sm" />
                    <Text pl={"4"} color={"danger.500"}>
                        {alertMessages.genericForm.show? alertMessages.genericForm.content:""}
                    </Text>
                </Center>
            </VStack >
            <Center w={"1/6"}>
                <IconButton
                    icon={<Icon as={MaterialIcons} name="playlist-add" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
                    onPress={handleSubmit}
                />
            </Center>
        </HStack >
    )
}

export default NewProjectForm;


//     return (
//         <VStack h={"100%"} justifyContent={"center"}>
//             <Center w="100%">
//                 <Box safeArea p="2" py="8" w="90%" maxW="290">
    
//                     <Heading mt="1" _dark={{
//                         color: "warmGray.200"
//                     }} color="coolGray.600" fontWeight="medium" size="xs">
//                         Create a new Project
//                     </Heading>

//                     <VStack space={3} mt="5">
//                         <FormField
//                             isInvalid={alertMessages.name.show} isRequired={alertMessages.name.show} value={newProject.name} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "name") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "name", name: "name", placeholder: "name", alertMessage: alertMessages.name.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.description.show} isRequired={alertMessages.description.show} value={newProject.description} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "description") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "Description", name: "description", autocomplete: "description", placeholder: "Description", alertMessage: alertMessages.description.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={newProject.image} type="text"
//                             autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
//                             inputRightElement={false}
//                             text={{
//                                 label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
//                                 iconName: "error"
//                             }} >
//                         </FormField>
//                         <FormField
//                             isInvalid={alertMessages.completion.show} isRequired={alertMessages.completion.show} value={newProject.completion} type="text"
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
//                             onPress={handleSubmit} title={"Add project"}>
//                             Create Project
//                         </Button>
//                     </VStack>
//                 </Box>
//             </Center>
//         </VStack >
//     )
// }

// export default NewProjectForm;

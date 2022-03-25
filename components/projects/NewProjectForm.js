import React, { useState, useContext } from 'react';
import { HStack, VStack, IconButton, Icon, Center, Input, Text, Flex, Box } from 'native-base';
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

    const [newProject, setNewProject] = useState({ name: "", description: "" });

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
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill the form correctly" }
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
        <Flex direction='row' wrap='nowrap' justifyContent={"center"} backgroundColor={"primary.500"} borderRadius={"lg"} minH={"6rem"} h={"6rem"} >
            <VStack flexGrow={7} w={"75%"} h={"100%"} ml={"0.7rem"} my={"0.7rem"}>
                <Box backgroundColor={"secondary.50"} borderRadius={"lg"} mb={"0.5rem"}>
                    <Input placeholder="New Project Title" variant="unstyled" h={"2rem"}
                        fontSize={"lg"} fontWeight={"bold"}
                        onChangeText={(value) => { handleChange(value, "name") }}
                        type="text" value={newProject.name} autocorrect={true}
                    />
                </Box>
                <Box backgroundColor={"secondary.50"} borderRadius={"lg"}>
                    <Input placeholder="New Project Description" variant="unstyled" h={"2rem"}
                        fontSize={"md"} fontWeight={"normal"}
                        onChangeText={(value) => { handleChange(value, "description") }}
                        type="text" value={newProject.description} autocorrect={true} />
                </Box>
                <Center display={alertMessages.genericForm.show ? "block" : "none"} mt={"0.7rem"}>
                    <Icon as={MaterialIcons} name="error" color={"tertiary.500"} size="sm" />
                    <Text color={"tertiary.500"}>
                        {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
                    </Text>
                </Center>
            </VStack >
            <Center flexGrow={1} w={"11%"} maxW={"36px"} backgroundColor="tertiary.500" borderRadius={"lg"} mx={"0.3rem"} my={"0.7rem"} px={"0.3rem"}>
                <IconButton
                    icon={<Icon as={MaterialIcons} name="playlist-add" />} borderRadius="full" _icon={{ color: "primary.50", size: "md" }}
                    onPress={handleSubmit}
                />
            </Center>
        </Flex>
    )
}

export default NewProjectForm;


//     return (
//         <HStack>
//             <VStack w={"5/6"} h={"100%"}>
//                 <Input placeholder="New Project Title"
//                     fontSize={"lg"} fontWeight={"bold"}
//                     onChangeText={(value) => { handleChange(value, "name") }}
//                     type="text" value={newProject.name} autocorrect={true}
//                 />
//                 <Input placeholder="New Project Description"
//                     fontSize={"md"} fontWeight={"normal"}
//                     onChangeText={(value) => { handleChange(value, "description") }}
//                     type="text" value={newProject.description} autocorrect={true} />
//                 <Center display={alertMessages.genericForm.show ? "block" : "none"}>
//                     <Icon as={MaterialIcons} name="error" color={"danger.500"} size="sm" />
//                     <Text pl={"4"} color={"danger.500"}>
//                         {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
//                     </Text>
//                 </Center>
//             </VStack >
//             <Center w={"1/6"}>
//                 <IconButton
//                     icon={<Icon as={MaterialIcons} name="playlist-add" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
//                     onPress={handleSubmit}
//                 />
//             </Center>
//         </HStack >
//     )
// }

// export default NewProjectForm;
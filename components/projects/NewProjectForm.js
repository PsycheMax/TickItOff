import React, { useState, useContext } from 'react';
// import { VStack, IconButton, Icon, Center, Input, Text, Flex, Box } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import { ProjectContext } from '../../utils/ProjectManager';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

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
                    props.navigation.navigate('ViewProject');
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
        <></>
        // <Flex direction='row' wrap='nowrap' justifyContent={"center"} backgroundColor={"primary.500"} borderRadius={"lg"} minH={scale(96)} h={scale(96)}
        //     mb={alertMessages.genericForm.show ? scale(40) : 0} >
        //     <VStack flexGrow={7} w={"75%"} h={"100%"} ml={scale(11.2)} my={scale(11.2)}>
        //         <Box backgroundColor={"secondary.50"} borderRadius={"lg"} mb={scale(8)}>
        //             <Input placeholder="New Project Title" variant="unstyled" h={scale(32)}
        //                 fontSize={"lg"} fontWeight={"bold"}
        //                 onChangeText={(value) => { handleChange(value, "name") }}
        //                 type="text" value={newProject.name} autocorrect={true}
        //             />
        //         </Box>
        //         <Box backgroundColor={"secondary.50"} borderRadius={"lg"}>
        //             <Input placeholder="New Project Description" variant="unstyled" h={scale(32)}
        //                 fontSize={"md"} fontWeight={"normal"}
        //                 onChangeText={(value) => { handleChange(value, "description") }}
        //                 type="text" value={newProject.description} autocorrect={true} />
        //         </Box>
        //         <Center display={alertMessages.genericForm.show ? "flex" : "none"} mt={scale(11.2)}>
        //             <Icon as={MaterialIcons} name="error" color={"tertiary.500"} size="sm" />
        //             <Text color={"tertiary.500"}>
        //                 {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
        //             </Text>
        //         </Center>
        //     </VStack >
        //     <Center flexGrow={1} w={"11%"} maxW={"36px"} backgroundColor="tertiary.500" borderRadius={"lg"} mx={scale(4.8)} my={scale(11.2)} px={scale(4.8)}>
        //         <IconButton
        //             icon={<Icon as={MaterialIcons} name="playlist-add" />} borderRadius="full" _icon={{ color: "primary.50", size: "md" }}
        //             onPress={handleSubmit}
        //         />
        //     </Center>
        // </Flex>
    )
}

export default NewProjectForm;
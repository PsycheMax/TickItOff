import React, { useState, useContext } from 'react';
import { Icon, Center, Input, IconButton, Box, Flex, Text } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import { ProjectContext } from '../../utils/ProjectManager';
import StandardDivider from '../StandardDivider';

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
        <Flex direction={"row"}>
            <Box w={"95%"}>

                <Input placeholder="Edit Project Title"
                    fontSize={"lg"} fontWeight={"bold"}
                    onChangeText={(value) => { handleChange(value, "name") }}
                    type="text" value={patchedProject.name} autocorrect={true}
                />

                <StandardDivider />

                <Input placeholder="Edit Project Description"
                    fontSize={"md"} fontWeight={"normal"}
                    onChangeText={(value) => { handleChange(value, "description") }}
                    type="text" value={patchedProject.description} autocorrect={true}
                    h={scale(96)} multiline={true} />

                <StandardDivider />

                <Text color={"tertiary.500"}>
                    {alertMessages.genericForm.show ? alertMessages.genericForm.content : ""}
                </Text>
            </Box>
            <Center ml={scale(8)} w={"5%"} >
                <IconButton
                    icon={<Icon as={MaterialIcons} name="done" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
                    onPress={handleSubmitEdit}
                />
            </Center>
        </Flex>
    )
}

export default EditProjectForm;
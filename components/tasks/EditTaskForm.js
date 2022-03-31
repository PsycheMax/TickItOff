import React, { useState, useContext } from 'react';
import { VStack, Icon, FormControl, Box, HStack, Input, Center, IconButton, Text } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import { ProjectContext } from '../../utils/ProjectManager';
import StandardDivider from '../StandardDivider';

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

/**
 * This has to be given a taskid prop, otherwise it won't be autofilled.
 * @param {*} props 
 * @returns 
 */
const EditTaskForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);

    const [patchedTask, setPatchedTask] = useState({ name: props.task.name, description: props.task.description });

    const [alertMessages, setAlertMessages] = useState({
        genericForm: {
            show: false,
            content: "Alert goes here"
        }
    })

    function handleChange(value, fieldName) {
        setPatchedTask(prevState => { return { ...prevState, [fieldName]: value } });
    }

    async function handleSubmit() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        if (patchedTask.name.length >= inputRules.name.minLength) {
            if (patchedTask.description.length >= inputRules.description.minLength) {
                const response = await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id, patchedTask);

                if (response.status !== 200) {
                    toSetInAlertMessages.genericForm = { show: true, content: response.data }
                } else {
                    toSetInAlertMessages.genericForm = { show: false, content: "Alert goes here" };
                    await props.updateTaskFunc();
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task description should be at least ${inputRules.description.minLength} characters long` };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: `Please fill in the form correctly - the task name should be at least ${inputRules.name.minLength} characters long` };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    console.log(props.task)

    return (
        <VStack w={"100%"} minW={"100%"}>
            <HStack maxW={"100%"} minW={"100%"} >

                <Box w={"85%"} my={"1rem"} mx={"0.2rem"}>
                    <Input placeholder="Edit task name" fontSize={"lg"} color={props.task.completion ? "primary.50" : "primary.500"}
                        onChangeText={(value) => { handleChange(value, "name") }} type="text" value={patchedTask.name} autocorrect={true} />

                    <StandardDivider color={"tertiary.500"} />

                    <Input placeholder="Edit task Description" fontSize={"md"} color={props.task.completion ? "primary.50" : "primary.500"}
                        onChangeText={(value) => { handleChange(value, "description") }} type="text" value={patchedTask.description} autocorrect={true} />


                    <StandardDivider color={"tertiary.500"} />
                    <Text fontSize={"0.6rem"} lineBreakMode={"head"} color={props.task.completion ? "primary.50" : "primary.500"} >
                        <Icon as={MaterialIcons} name="more-time" size={"2xs"} color={props.task.completion ? "primary.50" : "primary.500"}
                        />: {Date(props.task.creationDate)}
                    </Text>
                    <Text fontSize={"0.6rem"} lineBreakMode={"head"} color={props.task.completion ? "primary.50" : "primary.500"} >
                        <Icon as={MaterialIcons} name="edit" size={"2xs"} color={props.task.completion ? "primary.50" : "primary.500"}
                        />: {Date(props.task.modificationDate)}
                    </Text>
                </Box>
                <Center w={"10%"} maxW={"10%"} minW={"10%"} >
                    <IconButton icon={<Icon as={<MaterialIcons name="done" size="sm" />} />}
                        mt="2" colorScheme="primary"
                        onPress={handleSubmit} title={"Edit task"} />
                </Center>
            </HStack>

            <FormControl isInvalid={alertMessages.genericForm.show} >
                <FormControl.ErrorMessage leftIcon={<Center><Icon as={MaterialIcons} name="error" size="xs" /></Center>}>
                    {alertMessages.genericForm.content}
                </FormControl.ErrorMessage>
            </FormControl>

        </VStack>

    )
}

export default EditTaskForm;
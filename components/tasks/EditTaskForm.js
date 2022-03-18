import React, { useState, useContext } from 'react';
import { VStack, Icon, FormControl, Box, HStack, Input, Center, IconButton } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
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

/**
 * This has to be given a taskid props, otherwise it won't be autofilled.
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
                    props.updateTaskFunc();
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
        <VStack w={"full"} minW={"full"} justifyContent={"center"} display={"block"}>
            <Box size="lg" alignSelf={"auto"} w={"full"} h={"100%"} py={"6"}>
                <HStack>
                    <VStack w={"5/6"} pl={9} >
                        <Input placeholder="Edit task name" onChangeText={(value) => { handleChange(value, "name") }} type="text" value={patchedTask.name} autocorrect={true} />
                        <Input placeholder="Edit task Description" onChangeText={(value) => { handleChange(value, "description") }} type="text" value={patchedTask.description} autocorrect={true} />

                        <FormControl isInvalid={alertMessages.genericForm.show} >
                            <FormControl.ErrorMessage leftIcon={<Center><Icon as={MaterialIcons} name="error" size="xs" /></Center>}>
                                {alertMessages.genericForm.content}
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </VStack>
                    <Center>
                        <IconButton icon={<Icon as={<MaterialIcons name="done" size="sm" />} />}
                            mt="2" colorScheme="indigo"
                            onPress={handleSubmit} title={"Edit task"} />
                    </Center>
                </HStack>
            </Box>
        </VStack>
    )
}

export default EditTaskForm;


//     return (
//         <VStack w={"full"} minW={"full"} maxW={"768"} h={"100%"} justifyContent={"center"}>

//             <Heading mt="1" _dark={{
//                 color: "warmGray.200"
//             }} color="coolGray.600" fontWeight="medium" size="xs">
//                 Edit the task
//             </Heading>

//             <VStack space={3} mt="5">
//                 <FormField
//                     isInvalid={alertMessages.name.show} isRequired={alertMessages.name.show} value={patchedTask.name} type="text"
//                     autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "name") }}
//                     inputRightElement={false}
//                     text={{
//                         label: "name", name: "name", placeholder: "name", alertMessage: alertMessages.name.content,
//                         iconName: "error"
//                     }} >
//                 </FormField>
//                 <FormField
//                     isInvalid={alertMessages.description.show} isRequired={alertMessages.description.show} value={patchedTask.description} type="text"
//                     autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "description") }}
//                     inputRightElement={false}
//                     text={{
//                         label: "Description", name: "description", autocomplete: "description", placeholder: "Description", alertMessage: alertMessages.description.content,
//                         iconName: "error"
//                     }} >
//                 </FormField>
//                 <FormField
//                     isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={patchedTask.image} type="text"
//                     autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
//                     inputRightElement={false}
//                     text={{
//                         label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
//                         iconName: "error"
//                     }} >
//                 </FormField>
//                 <FormField
//                     isInvalid={alertMessages.completion.show} isRequired={alertMessages.completion.show} value={patchedTask.completion} type="text"
//                     autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "completion") }}
//                     inputRightElement={false}
//                     text={{
//                         label: "completion", name: "completion", autocomplete: "completion", placeholder: "completion", alertMessage: alertMessages.completion.content,
//                         iconName: "error"
//                     }} >
//                 </FormField>

//                 <FormControl isInvalid={alertMessages.genericForm.show} >
//                     <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name="error" size="xs" />}>
//                         {alertMessages.genericForm.content}
//                     </FormControl.ErrorMessage>
//                 </FormControl>

//                 <Button mt="2" colorScheme="indigo"
//                     onPress={handleSubmit} title={"EditTask"}>
//                     Submit edits
//                 </Button>
//             </VStack>

//         </VStack >
//     )
// }

// export default EditTaskForm;
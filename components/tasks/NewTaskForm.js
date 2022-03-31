import React, { useState, useContext } from 'react';
import { HStack, VStack, Icon, Center, Box, FormControl, Checkbox, Input, IconButton } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";
import { ProjectContext } from '../../utils/ProjectManager';

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
        <VStack w={"full"} minW={"full"} display={"block"} minH={"2rem"} borderWidth={2} borderColor={"primary.500"} backgroundColor={"primary.50"} borderRadius={"lg"}>
            <HStack w={"full"} minW={"full"}>
                <Input placeholder="Add a new task" w={"90%"} borderWidth={0} fontSize={"lg"} color={"primary.800"}
                    onChangeText={(value) => { handleChange(value, "name") }} type="text" value={newTask.name} autocorrect={true} />
                {/* <Input placeholder="New Task Description" onChangeText={(value) => { handleChange(value, "description") }} type="text" value={newTask.description} autocorrect={true}></Input> */}
                <Center w={"10%"}>
                    <IconButton icon={<Icon color={"primary.500"} as={<MaterialIcons name="playlist-add" size="sm" />} />}
                        mt="2" colorScheme="primary"
                        onPress={handleSubmit} title={"Add task"} />
                </Center>
            </HStack>
            <FormControl isInvalid={alertMessages.genericForm.show} >
                <FormControl.ErrorMessage leftIcon={<Center><Icon as={MaterialIcons} name="error" size="xs" /></Center>}>
                    {alertMessages.genericForm.content}
                </FormControl.ErrorMessage>
            </FormControl>

        </VStack >
    )
}

export default NewTaskForm;
//     return (
//         <VStack w={"full"} minW={"full"} justifyContent={"center"} display={"block"}>
//             <Box size="lg" alignSelf={"auto"} w={"full"} h={"100%"} py={"6"}>
//                 <HStack>
//                     <Center>
//                         <Checkbox w={"1/6"} colorScheme="orange" size="lg" p={0} m={0}
//                             icon={<Icon as={<MaterialIcons name="celebration" />} />} defaultIsChecked={false}
//                             isChecked={newTask.completion} onChange={(isChecked) => { handleChange(isChecked, "completion"); }}
//                         />
//                     </Center>
//                     <VStack w={"5/6"} pl={9} >
//                         <Input placeholder="Add a new task" onChangeText={(value) => { handleChange(value, "name") }} type="text" value={newTask.name} autocorrect={true}></Input>
//                         <Input placeholder="New Task Description" onChangeText={(value) => { handleChange(value, "description") }} type="text" value={newTask.description} autocorrect={true}></Input>

//                         <FormControl isInvalid={alertMessages.genericForm.show} >
//                             <FormControl.ErrorMessage leftIcon={<Center><Icon as={MaterialIcons} name="error" size="xs" /></Center>}>
//                                 {alertMessages.genericForm.content}
//                             </FormControl.ErrorMessage>
//                         </FormControl>

//                     </VStack>
//                     <Center>
//                         <IconButton icon={<Icon as={<MaterialIcons name="playlist-add" size="sm" />} />}
//                             mt="2" colorScheme="indigo"
//                             onPress={handleSubmit} title={"Add task"} />
//                     </Center>
//                 </HStack>
//             </Box>
//         </VStack >
//     )
// }

// export default NewTaskForm;
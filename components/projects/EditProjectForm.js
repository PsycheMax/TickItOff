import React, { useState, useContext } from 'react';
import { HStack, VStack, Button, Icon, Center, Input, IconButton, AlertDialog } from 'native-base';
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

const EditProjectForm = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;
    const ViewFunctions = useContext(ViewManagerContext);

    const [patchedProject, setPatchedProject] = useState({ name: ProjectData.name, description: ProjectData.description });
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    async function handleDeleteProject() {
        let toSetInAlertMessages = alertMessages;
        const response = await ProjectFunctions.deleteProjectFunc(ProjectData._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                toSetInAlertMessages.genericForm = { show: true, content: response.data };
            } else {
                // Code 204!
                await ViewFunctions.changeCurrentViewTo("ProjectSelector");
                await ViewFunctions.renderCurrentView();
            }
        } else {
            // Code 200
            await ViewFunctions.changeCurrentViewTo("ProjectSelector");
            await ViewFunctions.renderCurrentView();
        }
        setAlertMessages(toSetInAlertMessages);
    }



    const cancelRef = React.useRef(null);
    return (
        <HStack>
            <Center>
                <IconButton icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full" _icon={{ color: "danger.500", size: "sm" }}
                    onPress={toggleDeletePrompt}
                />
            </Center>
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
                    icon={<Icon as={MaterialIcons} name="done" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
                    onPress={handleSubmitEdit}
                />
            </Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Project</AlertDialog.Header>
                    <AlertDialog.Body>
                        This will remove all data relating to the Project. This action cannot be
                        reversed. Deleted data can not be recovered.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={handleDeleteProject}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </HStack>
    )
}

export default EditProjectForm;
import React, { useContext, useState } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Box, Pressable, Flex, Spacer, Square, AlertDialog, Button } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import { ProjectContext } from '../../utils/ProjectManager';
import EditTaskForm from './EditTaskForm';
import StandardDivider from '../StandardDivider';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const TaskSimple = (props) => {
    const ProjectFunctions = useContext(ProjectContext);

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [showTaskMenu, setShowTaskMenu] = useState(false);
    const [checkState, setCheckState] = useState(props.completion);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    async function toggleCompletion() {
        if (!showEditTaskForm) {
            setCheckState(!checkState);
            await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id, { ...props.task, completion: !props.task.completion });
        }
    }

    async function archiveTask() {
        await ProjectFunctions.deleteTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id);
        await ProjectFunctions.reloadCurrentProjectDataFunc();
    }

    async function updateTaskFunc() {
        toggleEditTaskForm();
        await ProjectFunctions.reloadCurrentProjectDataFunc();

    }

    function toggleTaskMenu() {
        setShowTaskMenu(!showTaskMenu);
    }

    function toggleEditTaskForm() {
        setShowEditTaskForm(!showEditTaskForm);
    }

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    async function handleDeleteTask() {
        const response = await ProjectFunctions.deleteTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                await ProjectFunctions.reloadCurrentProjectDataFunc();
            } else {
                // Code 204!
                await ProjectFunctions.reloadCurrentProjectDataFunc();
            }
        } else {
            // Code 200
            await ProjectFunctions.reloadCurrentProjectDataFunc();
        }
    }

    function decideColor(type) {
        if (props.task.active) {
            switch (type) {
                case "text":
                    if (checkState) {
                        // ACTIVE CHECKED = WHITE
                        return "primary.50";
                    } else {
                        // ACTIVE UNCHECKED = BLUE
                        return "primary.500";
                    }
                    break;
                case "background":
                    if (checkState) {
                        // BORDERS AND BG, WHEN CHECKED = BLUE
                        return "primary.500";
                    } else {
                        // BORDERS AND BG WHEN UNCHECKED = WHITE
                        return "transparent.50";
                    }
                    break;
                case "border":
                    return "primary.500";
                    break;

                default:
                    break;
            }
        } else {
            switch (type) {
                case "text":
                    return "primary.50";
                    break;
                case "background":
                    if (checkState) {
                        return "secondary.300";
                    } else {
                        return "transparent.50";
                    }
                    break;
                case "border":
                    if (checkState) {
                        return "secondary.300";
                    } else {
                        return "primary.50";
                    }
                    break;

                default:
                    break;
            }
        }
    }


    function renderFormOrContent() {
        if (showEditTaskForm) {
            return <EditTaskForm task={props.task} updateTaskFunc={updateTaskFunc} />
        }
        if (!showEditTaskForm) {
            return <HStack maxW={"100%"} minW={"100%"} >

                <Box w={"85%"} my={scale(16)} mx={scale(3.2)}>
                    <Heading size="sm" lineBreakMode={"head"} color={decideColor("text")} >
                        {props.task.name}
                    </Heading>

                    <StandardDivider display={showTaskMenu ? "flex" : "none"} color={"tertiary.500"} />

                    <Text lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
                        {props.task.description.length > 0 ? props.task.description : "If you want to add a description, edit this task to do so"}
                    </Text>

                    <StandardDivider display={showTaskMenu ? "flex" : "none"} color={"tertiary.500"} />
                    <Text fontSize={scale(9.6)} lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
                        <Icon as={MaterialIcons} name="more-time" size={"2xs"} color={decideColor("text")}
                        />: {Date(props.task.creationDate)}
                    </Text>
                    <Text fontSize={scale(9.6)} lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
                        <Icon as={MaterialIcons} name="edit" size={"2xs"} color={decideColor("text")}
                        />: {Date(props.task.modificationDate)}
                    </Text>
                </Box>
                <Center my={"auto"} w={"10%"} mx={scale(1.6)} display={showTaskMenu ? "none" : "flex"}>
                    <IconButton icon={<Icon as={MaterialIcons} name="menu-open" />} borderRadius="full"
                        _icon={{ color: decideColor("text"), size: "md" }}
                        onPress={toggleTaskMenu} />
                </Center>
                <VStack w={"10%"} mx={scale(1.6)} display={showTaskMenu ? "block" : "none"}>
                    <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="zoom-out" />} borderRadius="full"
                        _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
                        onPress={toggleTaskMenu} />
                    <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full"
                        _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
                        onPress={toggleEditTaskForm} />
                    <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full"
                        _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
                        onPress={props.task.active ? archiveTask : toggleDeletePrompt} />
                </VStack>
            </HStack>
        }
    }

    const cancelRef = React.useRef(null);

    return (

        <React.Fragment>

            <Pressable onPress={toggleCompletion}>
                <Flex direction={"row"} maxW={"100%"} w={"100%"} minW={"100%"} my={scale(4.8)}>
                    <Square w={"16%"} borderRadius={"lg"} borderWidth={"2"} borderColor={decideColor("border")} backgroundColor={decideColor("background")}>
                        <Checkbox colorScheme="primary" size="lg" p={0} m={0} borderRadius={"lg"} backgroundColor={"transparent.50"} borderWidth={0}
                            icon={<Icon as={<MaterialIcons name="check" />} />} defaultIsChecked={props.task.completion}
                            isChecked={checkState} accessibilityLabel={"Checkbox for " + props.task.name}
                        />
                    </Square>
                    <Spacer w={"1%"}></Spacer>
                    <Box w={"83%"} maxW={"82%"} minW={"82%"} minH={scale(40)} h={"full"} borderRadius={"lg"} px={scale(16)}
                        borderColor={decideColor("border")} borderWidth={"2"} backgroundColor={decideColor("background")} >

                        {/* If showEditTaskForm is true, the following HStack is not displayed */}
                        {renderFormOrContent()}
                    </Box>

                </Flex>
            </Pressable>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Archive Project</AlertDialog.Header>
                    <AlertDialog.Body>
                        {/* This will Archive your project - it will still be visible but read-only in your archived projects. */}
                        This will remove all data relating to the Task. This action cannot be
                        reversed. Deleted data can not be recovered.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={handleDeleteTask}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

        </React.Fragment >
    )
}

export default TaskSimple;
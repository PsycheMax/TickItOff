import React, { useContext, useState } from 'react';
// import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Box, Pressable, Flex, Spacer, Square, AlertDialog, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectContext } from '../../utils/ProjectManager';
import EditTaskForm from './EditTaskForm';
import StandardDivider from '../StandardDivider';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { ThemeContext } from '../../utils/ThemeManager';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


var heightForEditForm;

const ViewTask = (props) => {
    const ProjectFunctions = useContext(ProjectContext);

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [showTaskMenu, setShowTaskMenu] = useState(false);
    const [checkState, setCheckState] = useState(props.task.completion);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        rowContainer: {
            flexDirection: "row"
        },
        columnContainer: {
            flexDirection: "column"
        },
        toggledEditTaskForm: {
            flexDirection: showEditTaskForm ? "column" : "row"
        },
        taskContainer: {
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
            marginVertical: theme.dimensions.methods.moderateVerticalScale(4.8),

        },
        leftColumn: {
            flexGrow: 1,
            borderRadius: 16,
            // width: "16%",
            // minWidth: "16%",
            borderWidth: 2,
            marginRight: theme.dimensions.methods.moderateScale(8),
            borderColor: decideColor("border"),
            backgroundColor: decideColor("background")
        },
        checkboxContainer: {
            justifyContent: "center",
            alignItems: "center",
            minHeight: 48,
            minWidth: 48,
        },
        checkboxIcon: {
            display: checkState ? "flex" : "none",
            width: 32 - 1,
            height: 32 - 1,
            color: decideColor("text")
        },
        rightColumn: {
            flexDirection: "row",
            flexGrow: 8,
            borderRadius: 16,
            width: "80%",
            minWidth: "80%",
            borderWidth: 2,
            borderColor: decideColor("border"),
            backgroundColor: decideColor("background"),
            justifyContent: "space-between",
            alignItems: showTaskMenu ? "flex-start" : "center",
            paddingVertical: showTaskMenu ? theme.dimensions.methods.moderateScale(10) : 0
        },
        rightColumnTextContainer: {
            flexBasis: "85%",
            width: "85%",
            maxWidth: "85%",
            justifyContent: "center",
            marginLeft: theme.dimensions.methods.moderateScale(8)
        },
        rightColumnTextName: {
            color: decideColor("text"),
            fontSize: 20
        },
        detailedTaskContainer: {
            display: showTaskMenu ? "flex" : "none",
        },
        rightColumnTextDescription: {
            color: decideColor("text"),
            fontSize: 16
        },
        rightColumnButtonContainer: {

            justifyContent: showTaskMenu ? "flex-start" : "center"
        },
        rightColumnButton: {


        },
        rightColumnButtonIcon: {
            height: 32 - 1,
            width: 32 - 1,
            color: decideColor("text")
        },
        oneButtonContainer: {
            display: showTaskMenu ? "none" : "flex",
            flexBasis: "10%",
            width: "10%",
            minWidth: "10%",
        },
        additionalButtonsContainer: {
            display: showTaskMenu ? "flex" : "none",
            flexBasis: "10%",
            width: "10%",
            minWidth: "10%",
        },
        marginVertical: {
            marginVertical: theme.dimensions.methods.moderateScale(16)
        },
        backgroundForModal: {
            backgroundColor: theme.colors.primary[800],
            opacity: 0.4,
            width: theme.dimensions.screenWidth,
            height: theme.dimensions.screenHeight,
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalWindow: {
            position: "relative",
            zIndex: 10,
            margin: 20,
            backgroundColor: theme.colors.secondary[300],
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        modalButtonsContainer: {
            flexDirection: "row",
            marginTop: theme.dimensions.methods.moderateScale(16)
        },
        modalButtons: {
            paddingHorizontal: theme.dimensions.methods.moderateScale(24),
            paddingVertical: theme.dimensions.methods.moderateScale(18),
            marginHorizontal: theme.dimensions.methods.moderateScale(12),
            borderRadius: 50
        },
        modalText: {
            fontSize: theme.dimensions.methods.moderateScale(18),
            color: theme.colors.primary[50]
        }
    })

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
                toggleDeletePrompt();
            }
        } else {
            // Code 200
            await ProjectFunctions.reloadCurrentProjectDataFunc();
            toggleDeletePrompt();
        }
    }

    function decideColor(type) {
        if (props.task.active) {
            switch (type) {
                case "text":
                    if (checkState) {
                        // ACTIVE CHECKED = WHITE
                        return theme.colors.primary[50];
                    } else {
                        // ACTIVE UNCHECKED = BLUE
                        return theme.colors.primary[500];
                    }
                    break;
                case "background":
                    if (checkState) {
                        // BORDERS AND BG, WHEN CHECKED = BLUE
                        return theme.colors.primary[500];
                    } else {
                        // BORDERS AND BG WHEN UNCHECKED = WHITE
                        return theme.colors.transparent[50];
                    }
                    break;
                case "border":
                    return theme.colors.primary[500];
                    break;

                default:
                    break;
            }
        } else {
            switch (type) {
                case "text":
                    return theme.colors.primary[50];
                    break;
                case "background":
                    if (checkState) {
                        return theme.colors.secondary[300];
                    } else {
                        return theme.colors.transparent[50];
                    }
                    break;
                case "border":
                    if (checkState) {
                        return theme.colors.secondary[300];
                    } else {
                        return theme.colors.primary[50];
                    }
                    break;

                default:
                    break;
            }
        }
    }

    return (

        <React.Fragment>

            <View style={[styles.rowContainer, styles.taskContainer]}>
                <Pressable onPress={toggleCompletion}>
                    <View style={[styles.leftColumn, styles.checkboxContainer]} >
                        <View style={styles.checkboxContainer}>
                            <MaterialIcons name="done" size={32} style={styles.checkboxIcon} />
                        </View>
                    </View>
                </Pressable>

                <View style={[styles.rightColumn, styles.toggledEditTaskForm]} onLayout={(event) => {
                    !showEditTaskForm ? heightForEditForm = event.nativeEvent.layout.height : null;
                    console.log("heightForEditForm");
                    console.log(heightForEditForm);
                }} >
                    {showEditTaskForm ? <EditTaskForm task={props.task} updateTaskFunc={updateTaskFunc} maxHeight={heightForEditForm} /> :
                        <>
                            <View style={styles.rightColumnTextContainer}>
                                <Text style={styles.rightColumnTextName}
                                    lineBreakMode="head" numberOfLines={1}>
                                    {props.task.name}
                                </Text>
                                <View style={styles.detailedTaskContainer}>
                                    <StandardDivider color={theme.colors.tertiary[300]} />
                                    <Text style={styles.rightColumnTextDescription}
                                        lineBreakMode="head" numberOfLines={1}>
                                        {props.task.description && props.task.description.length > 0 ? props.task.description : "Add description"}
                                    </Text>
                                    <StandardDivider color={theme.colors.tertiary[300]} />
                                    <Text style={[styles.rightColumnTextDescription]}>
                                        <MaterialIcons name="more-time" size={18} />:{props.task.creationDate}
                                    </Text>
                                    <Text style={[styles.rightColumnTextDescription]}>
                                        <MaterialIcons name="edit" size={18} />: {props.task.modificationDate}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.oneButtonContainer}>
                                <TouchableOpacity style={styles.rightColumnButtonContainer} onPress={toggleTaskMenu}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="menu" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.additionalButtonsContainer}>
                                <TouchableOpacity onPress={toggleTaskMenu}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="menu-open" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.marginVertical} onPress={toggleEditTaskForm}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="edit" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.task.active ? archiveTask : toggleDeletePrompt}>
                                    <View style={styles.rightColumnButton}>
                                        <MaterialIcons name="delete" size={32} style={styles.rightColumnButtonIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>}

                </View>

            </View>

            <Modal visible={showDeletePrompt} transparent={true} >

                <View style={styles.centeredView}>
                    <View style={styles.backgroundForModal}>
                    </View>
                    <View style={styles.modalWindow}>
                        <Text style={styles.modalText} >Want to permanently delete this task?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                onPress={handleDeleteTask}
                            >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.tertiary[500] }]}>
                                    <Text style={styles.modalText} >Yes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleDeletePrompt}
                            >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.secondary[500] }]}>
                                    <Text style={styles.modalText} >No</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>

            {/* <Pressable onPress={toggleCompletion}>
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


                        {renderFormOrContent()}
                    </Box>

                </Flex>
            </Pressable>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Archive Project</AlertDialog.Header>
                    <AlertDialog.Body>


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
            </AlertDialog> */}

        </React.Fragment >
    )
}

export default ViewTask;
//     function renderFormOrContent() {
//         if (showEditTaskForm) {
//             return <EditTaskForm task={props.task} updateTaskFunc={updateTaskFunc} />
//         }
//         if (!showEditTaskForm) {
//             return <HStack maxW={"100%"} minW={"100%"} >

//                 <Box w={"85%"} my={scale(16)} mx={scale(3.2)}>
//                     <Heading size="sm" lineBreakMode={"head"} color={decideColor("text")} >
//                         {props.task.name}
//                     </Heading>

//                     <StandardDivider display={showTaskMenu ? "flex" : "none"} color={"tertiary.500"} />

//                     <Text lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
//                         {props.task.description.length > 0 ? props.task.description : "If you want to add a description, edit this task to do so"}
//                     </Text>

//                     <StandardDivider display={showTaskMenu ? "flex" : "none"} color={"tertiary.500"} />
//                     <Text fontSize={scale(9.6)} lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
//                         <Icon as={MaterialIcons} name="more-time" size={"2xs"} color={decideColor("text")}
//                         />: {Date(props.task.creationDate)}
//                     </Text>
//                     <Text fontSize={scale(9.6)} lineBreakMode={"head"} color={decideColor("text")} display={showTaskMenu ? "flex" : "none"}>
//                         <Icon as={MaterialIcons} name="edit" size={"2xs"} color={decideColor("text")}
//                         />: {Date(props.task.modificationDate)}
//                     </Text>
//                 </Box>
//                 <Center my={"auto"} w={"10%"} mx={scale(1.6)} display={showTaskMenu ? "none" : "flex"}>
//                     <IconButton icon={<Icon as={MaterialIcons} name="menu-open" />} borderRadius="full"
//                         _icon={{ color: decideColor("text"), size: "md" }}
//                         onPress={toggleTaskMenu} />
//                 </Center>
//                 <VStack w={"10%"} mx={scale(1.6)} display={showTaskMenu ? "block" : "none"}>
//                     <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="zoom-out" />} borderRadius="full"
//                         _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
//                         onPress={toggleTaskMenu} />
//                     <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full"
//                         _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
//                         onPress={toggleEditTaskForm} />
//                     <IconButton w={"100%"} icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full"
//                         _icon={{ color: checkState ? "tertiary.400" : "tertiary.500", size: "md" }}
//                         onPress={props.task.active ? archiveTask : toggleDeletePrompt} />
//                 </VStack>
//             </HStack>
//         }
//     }

//     const cancelRef = React.useRef(null);

//     return (

//         <React.Fragment>

//             <Pressable onPress={toggleCompletion}>
//                 <Flex direction={"row"} maxW={"100%"} w={"100%"} minW={"100%"} my={scale(4.8)}>
//                     <Square w={"16%"} borderRadius={"lg"} borderWidth={"2"} borderColor={decideColor("border")} backgroundColor={decideColor("background")}>
//                         <Checkbox colorScheme="primary" size="lg" p={0} m={0} borderRadius={"lg"} backgroundColor={"transparent.50"} borderWidth={0}
//                             icon={<Icon as={<MaterialIcons name="check" />} />} defaultIsChecked={props.task.completion}
//                             isChecked={checkState} accessibilityLabel={"Checkbox for " + props.task.name}
//                         />
//                     </Square>
//                     <Spacer w={"1%"}></Spacer>
//                     <Box w={"83%"} maxW={"82%"} minW={"82%"} minH={scale(40)} h={"full"} borderRadius={"lg"} px={scale(16)}
//                         borderColor={decideColor("border")} borderWidth={"2"} backgroundColor={decideColor("background")} >

//                         {/* If showEditTaskForm is true, the following HStack is not displayed */}
//                         {renderFormOrContent()}
//                     </Box>

//                 </Flex>
//             </Pressable>

//             <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
//                 <AlertDialog.Content>
//                     <AlertDialog.CloseButton />
//                     <AlertDialog.Header>Archive Project</AlertDialog.Header>
//                     <AlertDialog.Body>
//                         {/* This will Archive your project - it will still be visible but read-only in your archived projects. */}
//                         This will remove all data relating to the Task. This action cannot be
//                         reversed. Deleted data can not be recovered.
//                     </AlertDialog.Body>
//                     <AlertDialog.Footer>
//                         <Button.Group space={2}>
//                             <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
//                                 Cancel
//                             </Button>
//                             <Button colorScheme="danger" onPress={handleDeleteTask}>
//                                 Delete
//                             </Button>
//                         </Button.Group>
//                     </AlertDialog.Footer>
//                 </AlertDialog.Content>
//             </AlertDialog>

//         </React.Fragment >
//     )
// }

// export default TaskSimple;
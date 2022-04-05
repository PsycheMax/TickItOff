import React, { useContext, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, Modal, Pressable, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProjectContext } from '../../utils/ProjectManager';

import ViewTask from '../tasks/ViewTask';
import NewTaskForm from '../tasks/NewTaskForm';
import EditProjectForm from './EditProjectForm';
import StandardDivider from '../StandardDivider';
import { ThemeContext } from '../../utils/ThemeManager';

const ViewProject = (props) => {

    const theme = useContext(ThemeContext);
    const { methods } = theme.dimensions;

    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [showUserManagement, setShowUserManagement] = useState(false);
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);

    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const styles = StyleSheet.create({
        columnContainer: {
            flexDirection: "column"
        },
        rowContainer: {
            flexDirection: "row"
        },
        darkText: {
            color: theme.colors.primary[700]
        },
        whiteText: {
            color: theme.colors.secondary[50]
        },
        spaceBetween: {
            alignContent: "space-between",
            justifyContent: "space-between"
        },
        centered: {
            justifyContent: "center",
            alignItems: "center"
        },
        mainHMarginSize: {
            marginHorizontal: 18
        },
        mainHPaddingSize: {
            paddingHorizontal: 18
        },
        topSection: {
            // minHeight: methods.moderateVerticalScale(48),
            justifyContent: "space-between",
            alignContent: "space-between"
        },
        nameContainer: {
            flexGrow: 8,
            maxWidth: "87%",
            minWidth: "87%"
        },
        buttonsContainer: {
            flexGrow: 1,
            minWidth: "10%"
        },
        name: {
            fontSize: 32,
            fontWeight: "700"
        },
        description: {
            fontSize: 18,
            fontWeight: "500"
        },
        projectIcons: {
            width: 32 - 1,
            height: 32 - 1
        },
        formContainer: {

        },
        showOnProjectEditForm: {
            display: showProjectEditForm ? "flex" : "none"
        },
        hideOnProjectEditForm: {
            display: showProjectEditForm ? "none" : "flex"
        },
        projectListContainer: {
            marginTop: methods.moderateVerticalScale(16),
            maxWidth: "100%",
            width: "100%",
            minWidth: "100%",
        },
        archivedTasksList: {
            borderRadius: 32,
            paddingHorizontal: 18,
            paddingVertical: 18,
        },
        showOnArchivedTasks: {
            display: showArchivedTasks ? "flex" : "none"
        },
        activeListContainerBG: {
            backgroundColor: theme.colors.secondary[50],
        },
        archivedListContainerBG: {
            backgroundColor: theme.colors.primary[800]
        },
        bottomListContainer: {
            paddingBottom: 32,
            height: 32,
            maxHeight: 32,
            minHeight: 32,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
        },
        topListContainer: {
            paddingTop: 32,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
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

    /**
 * The following function processes the ProjectData.tasks and ProjectData.archivedTasks. The final object is an array containing the original data in a SectionList compatible form. 
 * The array looks like this: 
 * 
 * [{ data: [{project}], title:"Section Title"},...{}]
 */
    function processProjectDataForSectionList() {
        // Writing this in a verbose way: copied the two arrays of tasks
        let activeArray = ProjectData.tasks;
        let archivedArray = ProjectData.archivedTasks;
        // For each task in the two arrays, add a key.
        activeArray.forEach(task => {
            task.key = task._id;
        });
        archivedArray.forEach(task => {
            task.key = task._id;
        });
        // Create an object containing a section title, and an array at the key "data", for each category/section.
        let active = {
            data: activeArray,
            title: "Active Tasks"
        };
        let archived = {
            data: archivedArray,
            title: "Archived Tasks"
        }
        // Return the newly created objects in an array;
        return [active, archived];
    }

    async function toggleEditProjectForm() {
        await setShowProjectEditForm(!showProjectEditForm);
    }

    async function toggleUserManagement() {
        await setShowUserManagement(!showUserManagement);
    }

    async function toggleArchivedTasks() {
        await setShowArchivedTasks(!showArchivedTasks);
    }

    function toggleDeletePrompt() {
        setShowDeletePrompt(!showDeletePrompt);
    }

    async function handleDeleteProject() {
        if (ProjectData.active) {
            const response = await ProjectFunctions.deleteProjectFunc(ProjectData._id);
            if (response.status !== 200) {
                if (response.status !== 204) {
                    // ERROR
                    // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                    props.navigation.push('Home');
                } else {
                    // Code 204!
                    props.navigation.push('Home');

                }
            } else {
                // Code 200
                props.navigation.push('Home');
            }
        } else {
            const toSend = ProjectData;
            toSend.active = true;
            const response = await ProjectFunctions.patchProjectFunc(ProjectData._id, toSend);
            if (response.status !== 200) {
                if (response.status !== 204) {
                    // ERROR
                    // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                    console.log(response)
                    props.navigation.push('Home');
                } else {
                    // Code 204!
                    console.log(response)
                    props.navigation.push('Home');

                }
            } else {
                // Code 200
                console.log(response)
                props.navigation.push('Home');
            }
        }

    }

    // In order to make it scrollable and efficient, I decided to convert the whole view in a big SectionList. It lacks readability, sadly, but it works better
    return (
        <>
            <SectionList
                //The data is obtained by a method that parses the ProjectData in a SectionList readable form
                sections={processProjectDataForSectionList()}

                // This is the header of this whole component
                renderSectionHeader={({ section: { title, data } }) => {
                    // The following if statement creates the header only if the data array being represented is the first one, the "active" array
                    if (data[0] && data[0].active) {
                        return <>
                            <View style={[styles.columnContainer, styles.mainHMarginSize]}>
                                <View style={[styles.columnContainer, styles.topSection, styles.hideOnProjectEditForm]}>
                                    <View style={[styles.rowContainer, styles.spaceBetween]}>
                                        <View style={[styles.nameContainer]}>
                                            <Text style={[styles.name, styles.darkText]}>
                                                {ProjectData.name}
                                            </Text>
                                        </View>
                                        <View style={[styles.rowContainer, styles.buttonsContainer]}>
                                            <View style={styles.centered}>
                                                <Pressable onPress={toggleEditProjectForm} >
                                                    <MaterialIcons name="edit" size={32} color={theme.colors.primary[500]} />
                                                </Pressable>
                                            </View>
                                            <View style={styles.centered}>
                                                <Pressable onPress={toggleDeletePrompt} >
                                                    {ProjectData.active ? <MaterialIcons name="delete-outline" size={32} color={theme.colors.primary[500]} /> :
                                                        <MaterialIcons name="power" size={32} color={theme.colors.primary[500]} />}
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        {ProjectData.description}
                                    </Text>
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
                                    </Text>
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
                                    </Text>
                                </View>

                                <View style={[styles.columnContainer, styles.formContainer, styles.showOnProjectEditForm]} >
                                    <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
                                    <StandardDivider color={theme.colors.primary[500]} />
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
                                    </Text>
                                    <Text style={[styles.description, styles.darkText]}>
                                        <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
                                    </Text>
                                </View>
                            </View>
                            <View style={[
                                styles.projectListContainer, styles.topListContainer,
                                data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
                            ]}>
                                <Text style={[
                                    styles.name,
                                    data[0] && data[0].active ? styles.darkText : styles.whiteText]}>{title}
                                </Text>
                                {/* Considering it's the header, the NewTaskForm goes here */}
                                <View style={styles.mainHPaddingSize}>
                                    <NewTaskForm />
                                </View>

                            </View>
                        </>
                        // For every other category, create a regular heading (after checking what color should be used)
                    } else return <View style={[
                        styles.projectListContainer, styles.topListContainer,
                        data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
                    ]}>
                        <Text style={[
                            styles.name,
                            data[0] && data[0].active ? styles.darkText : styles.whiteText]}>{title}</Text>
                    </View>
                }}

                // RenderItem is the method that renders every object found in the sections array objects. See above for the JSON format of these objects
                // Please note that here the BG is dictated by the status of the section: if the section is about active tasks, it'll be lightly colored behind - if archived, dark.
                renderItem={({ item }) => {
                    return <View
                        style={[
                            styles.mainHPaddingSize,
                            item.active ? styles.activeListContainerBG : styles.archivedListContainerBG]}>
                        <ViewTask task={item} />
                    </View>
                }}

                // This renders a simple rounded footer for each section
                renderSectionFooter={({ section: { title, data } }) => {
                    return <View style={[
                        styles.bottomListContainer,
                        data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
                    ]}>
                        <Text >{title} END</Text>
                    </View>
                }}
            />

            {/* The following modal will work both for deletion and reactivation, based on the actual status of the project being viewed */}
            <Modal visible={showDeletePrompt} transparent={true} >
                <View style={styles.centeredView}>
                    <View style={styles.backgroundForModal}>
                    </View>
                    <View style={styles.modalWindow}>

                        {/* If the project is active, it asks "want to archive it" otherwise "want to reactivate it?" */}
                        {ProjectData.active ? <Text style={styles.modalText} >Want to archive this project?</Text> :
                            <Text style={styles.modalText} >Want to reactivate this project?</Text>}

                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                onPress={handleDeleteProject}
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
        </>
    )
}

export default ViewProject;

//             <View style={[styles.columnContainer, styles.mainHMarginSize]}>
//                 <View style={[styles.columnContainer, styles.topSection, styles.hideOnProjectEditForm]}>
//                     {/* <Pressable onPress={toggleUserManagement}> */}
//                     <View style={[styles.rowContainer, styles.spaceBetween]}>
//                         <View style={[styles.nameContainer]}>
//                             <Text style={[styles.name, styles.darkText]}>
//                                 {ProjectData.name}
//                             </Text>
//                         </View>
//                         <View style={[styles.rowContainer, styles.buttonsContainer]}>
//                             <View style={styles.centered}>
//                                 <Pressable onPress={toggleEditProjectForm} >
//                                     <MaterialIcons name="edit" size={32} color={theme.colors.primary[500]} />
//                                 </Pressable>
//                             </View>
//                             <View style={styles.centered}>
//                                 <Pressable onPress={toggleDeletePrompt} >
//                                     <MaterialIcons name="delete-outline" size={32} color={theme.colors.primary[500]} />
//                                 </Pressable>
//                             </View>
//                         </View>
//                     </View>
//                     <StandardDivider color={theme.colors.primary[500]} />
//                     <Text style={[styles.description, styles.darkText]}>
//                         {ProjectData.description}
//                     </Text>
//                     <StandardDivider color={theme.colors.primary[500]} />
//                     <Text style={[styles.description, styles.darkText]}>
//                         <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
//                     </Text>
//                     <Text style={[styles.description, styles.darkText]}>
//                         <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
//                     </Text>
//                 </View>

//                 <View style={[styles.columnContainer, styles.formContainer, styles.showOnProjectEditForm]} >
//                     <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
//                     <StandardDivider color={theme.colors.primary[500]} />
//                     <Text style={[styles.description, styles.darkText]}>
//                         <MaterialIcons name="more-time" size={18} />:{ProjectData.creationDate}
//                     </Text>
//                     <Text style={[styles.description, styles.darkText]}>
//                         <MaterialIcons name="edit" size={18} />: {ProjectData.modificationDate}
//                     </Text>
//                 </View>
//             </View>

//             <SectionList
//                 sections={processProjectDataForSectionList()}
//                 renderItem={({ item }) => {
//                     return <View style={[
//                         styles.mainHPaddingSize,
//                         item.active ? styles.activeListContainerBG : styles.archivedListContainerBG]}>
//                         <ViewTask task={item} />
//                     </View>
//                 }}
//                 renderSectionHeader={({ section: { title, data } }) => {
//                     return <View style={[
//                         styles.projectListContainer, styles.topListContainer,
//                         data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
//                     ]}>
//                         <Text style={[
//                             styles.name,
//                             data[0] && data[0].active ? styles.darkText : styles.whiteText]}>{title}</Text>
//                     </View>
//                 }}
//                 renderSectionFooter={({ section: { title, data } }) => {
//                     return <View style={[
//                         styles.bottomListContainer,
//                         data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
//                     ]}>
//                         <Text >{title} END</Text>
//                     </View>
//                 }}
//             />

//         </View>
//     )
// }









//                 {ProjectData.tasks ?
//                     <View style={styles.projectListContainer}>
//                         <Text style={[styles.name, styles.darkText]}>
//                             Active Tasks
//                         </Text>
//                         <NewTaskForm />
//                         <FlatList data={ProjectData.tasks}
//                             renderItem={({ item }) => {
//                                 return <ViewTask task={item} />
//                             }}
//                             keyExtractor={item => item._id}
//                         />
//                     </View>
//                     :
//                     <NewTaskForm />
//                 }

//             </View>

//             {ProjectData.archivedTasks ?
//                 <View style={[styles.projectListContainer, styles.archivedTasksList]}>
//                     <TouchableOpacity onPress={toggleArchivedTasks} >
//                         <Text style={[styles.name, styles.whiteText]}>
//                             Archived Tasks
//                         </Text>
//                     </TouchableOpacity>
//                     <View style={styles.showOnArchivedTasks}>
//                         <FlatList data={ProjectData.archivedTasks}
//                             renderItem={({ item }) => {
//                                 return <ViewTask task={item} />
//                             }}
//                             keyExtractor={item => item._id}
//                         />
//                     </View>
//                 </View>
//                 :
//                 <></>}
//         </ScrollView>
//     )
// }


// TODO MAKE THIS WHOLE COMPONENT A HUGE SECTION LIST MAYBE

// {/* <Center w={"95%"} maxW={"95%"} > .
//     <VStack w={"100%"}>

//         <VStack minH={scale(48)} maxW={"95%"} minW={"95%"}>
//             <Box display={showProjectEditForm ? "none" : "flex"}>
//                 <Pressable onPress={toggleUserManagement}>
//                     <HStack>
//                         <Heading w={"100%"} maxW={"100%"} overflow={"hidden"} color={"primary.800"} _web={{ style: { whiteSpace: "normal" } }}>
//                             {ProjectData.name}
//                         </Heading>
//                         <Flex direction='row' display={showProjectEditForm ? "none" : "flex"} maxH={scale(32)}>
//                             <Center px={0} mx={0}>
//                                 <IconButton
//                                     px={0} mx={0}
//                                     icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
//                                     onPress={toggleEditProjectForm}
//                                 />
//                             </Center>
//                             <Center px={0} mx={0}>
//                                 <IconButton
//                                     px={0} mx={0}
//                                     icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
//                                     onPress={toggleDeletePrompt}
//                                 />
//                             </Center>
//                         </Flex>
//                     </HStack>


//                     <StandardDivider />
//                     <Text color={"primary.800"}>{ProjectData.description}</Text>
//                     <StandardDivider />
//                     <Text color={"primary.800"}><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
//                     <Text color={"primary.800"}><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>

//                 </Pressable>
//             </Box>
//             <VStack display={showProjectEditForm ? "flex" : "none"}>
//                 <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
//                 <Text><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
//                 <Text><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>
//             </VStack>
//         </VStack>

//         <Box display={showUserManagement ? "flex" : "none"}>
//             <HStack alignItems={"center"}>
//                 <Text>Created by: </Text>
//                 <Avatar.Group size={"sm"} max={4}>
//                     <ProfilePicture zIndex={0} source={ProjectData.users.creators[0].image} username={ProjectData.users.creators[0].username}></ProfilePicture>
//                 </Avatar.Group>
//             </HStack>
//             {ProjectData.users.managers.length > 0 ?
//                 <HStack alignItems={"center"}>
//                     <Text>Managed by: </Text>
//                     <Avatar.Group size={"sm"} max={4}>
//                         <ProfilePicture zIndex={0} source={ProjectData.users.managers[0].image} username={ProjectData.users.managers[0].username}></ProfilePicture>
//                     </Avatar.Group>
//                 </HStack>
//                 : null}
//             {ProjectData.users.joiners.length > 0 ?
//                 <HStack alignItems={"center"}>
//                     <Text>Can be viewed by: </Text>
//                     <Avatar.Group size={"sm"} max={4}>
//                         <ProfilePicture zIndex={0} source={ProjectData.users.joiners[0].image} username={ProjectData.users.joiners[0].username}></ProfilePicture>
//                     </Avatar.Group>
//                 </HStack>
//                 : null}

//         </Box>


//         {ProjectData.tasks ?
//             <Box mt={scale(16)} maxW={"100%"} w={"100%"} minW={"100%"}>
//                 {/* <Heading fontSize="xl" pb="3">
//             Tasks
//         </Heading> */}
//                 <NewTaskForm />
//                 <FlatList data={ProjectData.tasks}
//                     renderItem={({ item }) =>
//                         <TaskSimple task={item} />
//                     } keyExtractor={item => item._id}
//                 />
//             </Box>
//             :
//             <NewTaskForm />
//         }


//         {ProjectData.archivedTasks ?
//             <VStack w={"110%"} ml={-scale(16)}
//                 pl={scale(16)} pr={scale(16)} pb={scale(16)} pt={scale(16)}
//                 bg={"primary.500"}
//             >
//                 <Pressable onPress={toggleArchivedTasks}>
//                     <Box>

//                         <Heading pb={scale(16)} color={"tertiary.50"}
//                             borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
//                             borderBottomWidth={showArchivedTasks ? "0" : "1"}
//                         >
//                             Archived Tasks
//                         </Heading>

//                         <ScrollView display={showArchivedTasks ? "flex" : "none"}>
//                             <FlatList data={ProjectData.archivedTasks}
//                                 renderItem={({ item }) => <TaskSimple task={item} />}
//                                 keyExtractor={item => item._id} />
//                         </ScrollView>
//                     </Box>
//                 </Pressable>
//             </VStack>
//             : <React.Fragment></React.Fragment>}

//     </VStack>

//     <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
//         <AlertDialog.Content>
//             <AlertDialog.CloseButton />
//             <AlertDialog.Header>Archive Project</AlertDialog.Header>
//             <AlertDialog.Body>
//                 This will Archive your project - it will still be visible but read-only in your archived projects.
//                 {/* This will remove all data relating to the Project. This action cannot be
//         reversed. Deleted data can not be recovered. */}
//             </AlertDialog.Body>
//             <AlertDialog.Footer>
//                 <Button.Group space={2}>
//                     <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
//                         Cancel
//                     </Button>
//                     <Button colorScheme="danger" onPress={handleDeleteProject}>
//                         Archive
//                     </Button>
//                 </Button.Group>
//             </AlertDialog.Footer>
//         </AlertDialog.Content>
//     </AlertDialog>
// </Center> */}


//     const cancelRef = React.useRef(null);

//     return (
//         <Center w={"95%"} maxW={"95%"} >
//             <VStack w={"100%"}>
//                 <VStack minH={scale(48)} maxW={"95%"} minW={"95%"}>
//                     <Box display={showProjectEditForm ? "none" : "flex"}>
//                         <Pressable onPress={toggleUserManagement}>
//                             <HStack>
//                                 <Heading w={"100%"} maxW={"100%"} overflow={"hidden"} color={"primary.800"} _web={{ style: { whiteSpace: "normal" } }}>
//                                     {ProjectData.name}
//                                 </Heading>
//                                 <Flex direction='row' display={showProjectEditForm ? "none" : "flex"} maxH={scale(32)}>
//                                     <Center px={0} mx={0}>
//                                         <IconButton
//                                             px={0} mx={0}
//                                             icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
//                                             onPress={toggleEditProjectForm}
//                                         />
//                                     </Center>
//                                     <Center px={0} mx={0}>
//                                         <IconButton
//                                             px={0} mx={0}
//                                             icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
//                                             onPress={toggleDeletePrompt}
//                                         />
//                                     </Center>
//                                 </Flex>
//                             </HStack>


//                             <StandardDivider />
//                             <Text color={"primary.800"}>{ProjectData.description}</Text>
//                             <StandardDivider />
//                             <Text color={"primary.800"}><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
//                             <Text color={"primary.800"}><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>

//                         </Pressable>
//                     </Box>
//                     <VStack display={showProjectEditForm ? "flex" : "none"}>
//                         <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
//                         <Text><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
//                         <Text><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>
//                     </VStack>
//                 </VStack>

//                 <Box display={showUserManagement ? "flex" : "none"}>
//                     <HStack alignItems={"center"}>
//                         <Text>Created by: </Text>
//                         <Avatar.Group size={"sm"} max={4}>
//                             <ProfilePicture zIndex={0} source={ProjectData.users.creators[0].image} username={ProjectData.users.creators[0].username}></ProfilePicture>
//                         </Avatar.Group>
//                     </HStack>
//                     {ProjectData.users.managers.length > 0 ?
//                         <HStack alignItems={"center"}>
//                             <Text>Managed by: </Text>
//                             <Avatar.Group size={"sm"} max={4}>
//                                 <ProfilePicture zIndex={0} source={ProjectData.users.managers[0].image} username={ProjectData.users.managers[0].username}></ProfilePicture>
//                             </Avatar.Group>
//                         </HStack>
//                         : null}
//                     {ProjectData.users.joiners.length > 0 ?
//                         <HStack alignItems={"center"}>
//                             <Text>Can be viewed by: </Text>
//                             <Avatar.Group size={"sm"} max={4}>
//                                 <ProfilePicture zIndex={0} source={ProjectData.users.joiners[0].image} username={ProjectData.users.joiners[0].username}></ProfilePicture>
//                             </Avatar.Group>
//                         </HStack>
//                         : null}

//                 </Box>


//                 {ProjectData.tasks ?
//                     <Box mt={scale(16)} maxW={"100%"} w={"100%"} minW={"100%"}>
//                         {/* <Heading fontSize="xl" pb="3">
//                             Tasks
//                         </Heading> */}
//                         <NewTaskForm />
//                         <FlatList data={ProjectData.tasks}
//                             renderItem={({ item }) =>
//                                 <TaskSimple task={item} />
//                             } keyExtractor={item => item._id}
//                         />
//                     </Box>
//                     :
//                     <NewTaskForm />
//                 }


//                 {ProjectData.archivedTasks ?
//                     <VStack w={"110%"} ml={-scale(16)}
//                         pl={scale(16)} pr={scale(16)} pb={scale(16)} pt={scale(16)}
//                         bg={"primary.500"}
//                     >
//                         <Pressable onPress={toggleArchivedTasks}>
//                             <Box>

//                                 <Heading pb={scale(16)} color={"tertiary.50"}
//                                     borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
//                                     borderBottomWidth={showArchivedTasks ? "0" : "1"}
//                                 >
//                                     Archived Tasks
//                                 </Heading>

//                                 <ScrollView display={showArchivedTasks ? "flex" : "none"}>
//                                     <FlatList data={ProjectData.archivedTasks}
//                                         renderItem={({ item }) => <TaskSimple task={item} />}
//                                         keyExtractor={item => item._id} />
//                                 </ScrollView>
//                             </Box>
//                         </Pressable>
//                     </VStack>
//                     : <React.Fragment></React.Fragment>}

//             </VStack>

//             <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
//                 <AlertDialog.Content>
//                     <AlertDialog.CloseButton />
//                     <AlertDialog.Header>Archive Project</AlertDialog.Header>
//                     <AlertDialog.Body>
//                         This will Archive your project - it will still be visible but read-only in your archived projects.
//                         {/* This will remove all data relating to the Project. This action cannot be
//                         reversed. Deleted data can not be recovered. */}
//                     </AlertDialog.Body>
//                     <AlertDialog.Footer>
//                         <Button.Group space={2}>
//                             <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
//                                 Cancel
//                             </Button>
//                             <Button colorScheme="danger" onPress={handleDeleteProject}>
//                                 Archive
//                             </Button>
//                         </Button.Group>
//                     </AlertDialog.Footer>
//                 </AlertDialog.Content>
//             </AlertDialog>
//         </Center>
//     )
// }

// export default ViewProject;

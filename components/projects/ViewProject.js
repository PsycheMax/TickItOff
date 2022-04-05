import React, { useContext, useState } from 'react';
// import { IconButton, Center, Text, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, Pressable, AlertDialog, Flex, Button, ScrollView } from 'native-base';
// import { MaterialIcons } from "@native-base/icons";
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProjectContext } from '../../utils/ProjectManager';

import ProfilePicture from '../users/UserPanel/ProfilePicture';
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
        viewProjectContainer: {
            marginHorizontal: 18
        },
        topSection: {
            // minHeight: methods.moderateVerticalScale(48),
        },
        nameContainer: {
            flexGrow: 8,
            maxWidth: "90%"
        },
        buttonsContainer: {
            flexGrow: 2
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
            minWidth: "100%"
        },
        archivedTasksList: {
            borderRadius: 32,
            paddingHorizontal: 18,
            paddingVertical: 18,
            backgroundColor: theme.colors.secondary[500]
        },
        showOnArchivedTasks: {
            display: showArchivedTasks ? "flex" : "none"
        }
    })

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
        const response = await ProjectFunctions.deleteProjectFunc(ProjectData._id);
        if (response.status !== 200) {
            if (response.status !== 204) {
                // ERROR
                // toSetInAlertMessages.genericForm = { show: true, content: response.data };
                props.navigation.push('ProjectSelector');
            } else {
                // Code 204!
                props.navigation.push('ProjectSelector');

            }
        } else {
            // Code 200
            props.navigation.push('ProjectSelector');
        }
    }

    return (
        <ScrollView>
            <View style={[styles.columnContainer, styles.viewProjectContainer]}>
                <View style={[styles.columnContainer, styles.topSection, styles.hideOnProjectEditForm]}>
                    {/* <Pressable onPress={toggleUserManagement}> */}
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
                                    <MaterialIcons name="delete-outline" size={32} color={theme.colors.primary[500]} />
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

                {ProjectData.tasks ?
                    <View style={styles.projectListContainer}>
                        <Text style={[styles.name, styles.darkText]}>
                            Active Tasks
                        </Text>
                        <NewTaskForm />
                        <FlatList data={ProjectData.tasks}
                            renderItem={({ item }) => {
                                return <ViewTask task={item} />
                            }}
                            keyExtractor={item => item._id}
                        />
                    </View>
                    :
                    <NewTaskForm />
                }

            </View>

            {ProjectData.archivedTasks ?
                <View style={[styles.projectListContainer, styles.archivedTasksList]}>
                    <TouchableOpacity onPress={toggleArchivedTasks} >
                        <Text style={[styles.name, styles.whiteText]}>
                            Archived Tasks
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.showOnArchivedTasks}>
                        <FlatList data={ProjectData.archivedTasks}
                            renderItem={({ item }) => {
                                return <ViewTask task={item} />
                            }}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </View>
                :
                <></>}
        </ScrollView>
    )
}

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

export default ViewProject;
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

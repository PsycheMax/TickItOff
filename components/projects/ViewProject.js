import React, { useContext, useState } from 'react';
import { IconButton, Center, Text, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, Pressable, AlertDialog, Flex, Button, ScrollView } from 'native-base';
import { MaterialIcons } from "@native-base/icons";;

import { ProjectContext } from '../../utils/ProjectManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';

import ProfilePicture from '../users/UserPanel/ProfilePicture';
import TaskSimple from '../tasks/TaskSimple';
import NewTaskForm from '../tasks/NewTaskForm';
import EditProjectForm from './EditProjectForm';
import StandardDivider from '../StandardDivider';

const ViewProject = (props) => {
    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;
    const ViewFunctions = useContext(ViewManagerContext);

    const [showUserManagement, setShowUserManagement] = useState(false);
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);

    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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
                await ViewFunctions.changeCurrentViewTo("ProjectSelector");
                await ViewFunctions.renderCurrentView();
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
    }

    const cancelRef = React.useRef(null);

    return (
        <Center w={"95%"} maxW={"95%"} >
            <VStack w={"100%"}>
                <VStack minH={"3rem"} maxW={"95%"} minW={"95%"}>
                    <Box display={showProjectEditForm ? "none" : "block"}>
                        <Pressable onPress={toggleUserManagement}>
                            <HStack>
                                <Heading w={"100%"} maxW={"100%"} overflow={"hidden"} whiteSpace={"normal"} color={"primary.800"}>
                                    {ProjectData.name}
                                </Heading>
                                <Flex direction='row' display={showProjectEditForm ? "none" : "flex"} maxH={"2rem"}>
                                    <Center px={0} mx={0}>
                                        <IconButton
                                            px={0} mx={0}
                                            icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
                                            onPress={toggleEditProjectForm}
                                        />
                                    </Center>
                                    <Center px={0} mx={0}>
                                        <IconButton
                                            px={0} mx={0}
                                            icon={<Icon as={MaterialIcons} name="delete" />} borderRadius="full" _icon={{ color: "primary.500", size: "md" }}
                                            onPress={toggleDeletePrompt}
                                        />
                                    </Center>
                                </Flex>
                            </HStack>


                            <StandardDivider />
                            <Text color={"primary.800"}>{ProjectData.description}</Text>
                            <StandardDivider />
                            <Text color={"primary.800"}><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
                            <Text color={"primary.800"}><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>

                        </Pressable>
                    </Box>
                    <VStack display={showProjectEditForm ? "block" : "none"}>
                        <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
                        <Text><Icon as={MaterialIcons} name="more-time" size={"xs"} />: {ProjectData.creationDate}</Text>
                        <Text><Icon as={MaterialIcons} name="edit" size={"xs"} />: {ProjectData.modificationDate}</Text>
                    </VStack>
                </VStack>

                <Box display={showUserManagement ? "block" : "none"}>
                    <HStack alignItems={"center"}>
                        <Text>Created by: </Text>
                        <Avatar.Group size={"sm"} max={4}>
                            <ProfilePicture zIndex={0} source={ProjectData.users.creators[0].image} username={ProjectData.users.creators[0].username}></ProfilePicture>
                        </Avatar.Group>
                    </HStack>
                    {ProjectData.users.managers.length > 0 ?
                        <HStack alignItems={"center"}>
                            <Text>Managed by: </Text>
                            <Avatar.Group size={"sm"} max={4}>
                                <ProfilePicture zIndex={0} source={ProjectData.users.managers[0].image} username={ProjectData.users.managers[0].username}></ProfilePicture>
                            </Avatar.Group>
                        </HStack>
                        : null}
                    {ProjectData.users.joiners.length > 0 ?
                        <HStack alignItems={"center"}>
                            <Text>Can be viewed by: </Text>
                            <Avatar.Group size={"sm"} max={4}>
                                <ProfilePicture zIndex={0} source={ProjectData.users.joiners[0].image} username={ProjectData.users.joiners[0].username}></ProfilePicture>
                            </Avatar.Group>
                        </HStack>
                        : null}

                </Box>


                {ProjectData.tasks ?
                    <Box mt={"1rem"} maxW={"100%"} w={"100%"} minW={"100%"}>
                        {/* <Heading fontSize="xl" pb="3">
                            Tasks
                        </Heading> */}
                        <NewTaskForm />
                        <FlatList data={ProjectData.tasks}
                            renderItem={({ item }) =>
                                <TaskSimple task={item} />
                            } keyExtractor={item => item._id}
                        />
                    </Box>
                    :
                    <NewTaskForm />
                }


                {ProjectData.archivedTasks ?
                    <VStack w={"110%"} ml={"-1rem"}
                        pl={"1rem"} pr={"1rem"} pb={"1rem"} pt={"1rem"}
                        bg={"primary.500"}
                    >
                        <Pressable onPress={toggleArchivedTasks}>
                            <Box>

                                <Heading pb={"1rem"} color={"tertiary.50"}
                                    borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
                                    borderBottomWidth={showArchivedTasks ? "0" : "1"}
                                >
                                    Archived Tasks
                                </Heading>

                                <ScrollView display={showArchivedTasks ? "block" : "none"}>
                                    <FlatList data={ProjectData.archivedTasks}
                                        renderItem={({ item }) => <TaskSimple task={item} />}
                                        keyExtractor={item => item._id} />
                                </ScrollView>
                            </Box>
                        </Pressable>
                    </VStack>
                    : <React.Fragment></React.Fragment>}

            </VStack>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeletePrompt} onClose={toggleDeletePrompt}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Archive Project</AlertDialog.Header>
                    <AlertDialog.Body>
                        This will Archive your project - it will still be visible but read-only in your archived projects.
                        {/* This will remove all data relating to the Project. This action cannot be
                        reversed. Deleted data can not be recovered. */}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={toggleDeletePrompt} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={handleDeleteProject}>
                                Archive
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    )
}

export default ViewProject;
//     return (
//         <Center mawW={"full"} minW={"full"}>
//             <VStack maxW={"full"} minW={"full"} px={"4"} mx={"auto"} mt={"10"}>

//                 <HStack py={"12"}>
//                     <VStack w={"5/6"} h={"3rem"}>
//                         <Box display={showProjectEditForm ? "none" : "block"}>
//                             <Pressable onPress={toggleUserManagement}>
//                                 <Heading size={"lg"} fontSize={"lg"}>{ProjectData.name}</Heading>
//                                 <Text>{ProjectData.description}</Text>

//                                 <Text>{ProjectData.level}</Text>
//                             </Pressable>
//                         </Box>
//                         <Box display={showProjectEditForm ? "block" : "none"}>
//                             <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
//                         </Box>
//                     </VStack>
//                     <HStack w={"1/6"}>
//                         <Center display={showProjectEditForm ? "none" : "block"}>
//                             <IconButton
//                                 icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "sm" }}
//                                 onPress={toggleEditProjectForm}
//                             />
//                         </Center>
//                     </HStack>
//                 </HStack>

//                 <Box display={showUserManagement ? "block" : "none"}>
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


//                 {ProjectData.tasks ? <Box>
//                     <Heading fontSize="xl" pb="3">
//                         Tasks
//                     </Heading>
//                     <NewTaskForm />
//                     <FlatList data={ProjectData.tasks}
//                         renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
//                             borderColor: "gray.600"
//                         }} borderColor="coolGray.200" py="2">
//                             <TaskSimple task={item} />
//                         </Box>} keyExtractor={item => item._id} />
//                 </Box> : <NewTaskForm />}


//                 {ProjectData.archivedTasks ? <Box>
//                     <Pressable onPress={toggleArchivedTasks}>
//                         <Heading fontSize="xl" pb="3" borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
//                             borderBottomWidth={showArchivedTasks ? "0" : "1"}
//                         >
//                             Archived Tasks
//                         </Heading>
//                     </Pressable>
//                     <Box display={showArchivedTasks ? "block" : "none"}>
//                         <FlatList data={ProjectData.archivedTasks}
//                             renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
//                                 borderColor: "gray.600"
//                             }} borderColor="coolGray.200" py="2">
//                                 <TaskSimple task={item} />
//                             </Box>} keyExtractor={item => item._id} />
//                     </Box>
//                 </Box> : <Text>Niente archived tasks</Text>}

//                 <Text>Created on {ProjectData.creationDate}</Text>
//                 <Text>Modificated on {ProjectData.modificationDate}</Text>

//             </VStack>
//         </Center>
//     )
// }

// export default ViewProject;
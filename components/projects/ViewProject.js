import React, { useContext, useState, useEffect } from 'react';
import { IconButton, Center, Text, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, Pressable } from 'native-base';
import { MaterialIcons } from "@native-base/icons";;
import ProfilePicture from '../users/UserPanel/ProfilePicture';
import TaskSimple from '../tasks/TaskSimple';
import { ProjectContext } from '../../utils/ProjectManager';
import NewTaskForm from '../tasks/NewTaskForm';
import EditProjectForm from './EditProjectForm';

const ViewProject = (props) => {
    const ProjectFunctions = useContext(ProjectContext);
    const ProjectData = ProjectFunctions.currentProjectData;

    const [showUserManagement, setShowUserManagement] = useState(false);
    const [showArchivedTasks, setShowArchivedTasks] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);

    async function toggleEditProjectForm() {
        await setShowProjectEditForm(!showProjectEditForm);
    }

    async function toggleUserManagement() {
        await setShowUserManagement(!showUserManagement);
    }

    async function toggleArchivedTasks() {
        await setShowArchivedTasks(!showArchivedTasks);
    }

    return (
        <Center mawW={"full"} minW={"full"}>
            <VStack maxW={"full"} minW={"full"} px={"4"} mx={"auto"} mt={"10"}>

                <HStack py={"12"}>
                    <VStack w={"5/6"} h={"3rem"}>
                        <Box display={showProjectEditForm ? "none" : "block"}>
                            <Pressable onPress={toggleUserManagement}>
                                <Heading size={"lg"} fontSize={"lg"}>{ProjectData.name}</Heading>
                                <Text>{ProjectData.description}</Text>

                                <Text>{ProjectData.level}</Text>
                            </Pressable>
                        </Box>
                        <Box display={showProjectEditForm ? "block" : "none"}>
                            <EditProjectForm toggleFormFunc={toggleEditProjectForm} />
                        </Box>
                    </VStack>
                    <HStack w={"1/6"}>
                        <Center display={showProjectEditForm ? "none" : "block"}>
                            <IconButton
                                icon={<Icon as={MaterialIcons} name="edit" />} borderRadius="full" _icon={{ color: "primary.500", size: "sm" }}
                                onPress={toggleEditProjectForm}
                            />
                        </Center>
                    </HStack>
                </HStack>

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


                {ProjectData.tasks ? <Box>
                    <Heading fontSize="xl" pb="3">
                        Tasks
                    </Heading>
                    <NewTaskForm />
                    <FlatList data={ProjectData.tasks}
                        renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                            borderColor: "gray.600"
                        }} borderColor="coolGray.200" py="2">
                            <TaskSimple task={item} />
                        </Box>} keyExtractor={item => item._id} />
                </Box> : <NewTaskForm />}


                {ProjectData.archivedTasks ? <Box>
                    <Pressable onPress={toggleArchivedTasks}>
                        <Heading fontSize="xl" pb="3" borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
                            borderBottomWidth={showArchivedTasks ? "0" : "1"}
                        >
                            Archived Tasks
                        </Heading>
                    </Pressable>
                    <Box display={showArchivedTasks ? "block" : "none"}>
                        <FlatList data={ProjectData.archivedTasks}
                            renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                                borderColor: "gray.600"
                            }} borderColor="coolGray.200" py="2">
                                <TaskSimple task={item} />
                            </Box>} keyExtractor={item => item._id} />
                    </Box>
                </Box> : <Text>Niente archived tasks</Text>}

                <Text>Created on {ProjectData.creationDate}</Text>
                <Text>Modificated on {ProjectData.modificationDate}</Text>

            </VStack>
        </Center>
    )
}

export default ViewProject;
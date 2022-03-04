import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, View, Container } from 'native-base';
import { MaterialIcons } from "@native-base/icons";;
import ProfilePicture from '../users/UserPanel/ProfilePicture';
import TaskSimple from '../tasks/TaskSimple';

const ProjectSelector = (props) => {

    return (
        <Container maxW={"3/4"} minW={"3/4"} w={"3/4"}>

            <Heading size={"lg"} fontSize={"lg"}>{props.project.name}</Heading>
            <Text>{props.project.description}</Text>

            <Text>{props.project.level}</Text>

            <HStack alignItems={"center"}>
                <Text>Created by: </Text>
                <Avatar.Group size={"sm"} max={4}>
                    <ProfilePicture zIndex={0} source={props.project.users.creators[0].image} username={props.project.users.creators[0].username}></ProfilePicture>
                </Avatar.Group>
            </HStack>
            {props.project.users.managers.length > 0 ?
                <HStack alignItems={"center"}>
                    <Text>Managed by: </Text>
                    <Avatar.Group size={"sm"} max={4}>
                        <ProfilePicture zIndex={0} source={props.project.users.managers[0].image} username={props.project.users.managers[0].username}></ProfilePicture>
                    </Avatar.Group>
                </HStack>
                : null}
            {props.project.users.joiners.length > 0 ?
                <HStack alignItems={"center"}>
                    <Text>Can be viewed by by: </Text>
                    <Avatar.Group size={"sm"} max={4}>
                        <ProfilePicture zIndex={0} source={props.project.users.joiners[0].image} username={props.project.users.joiners[0].username}></ProfilePicture>
                    </Avatar.Group>
                </HStack>
                : null}

            {props.project.tasks ? <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Tasks
                </Heading>
                <FlatList data={props.project.tasks}
                    renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <TaskSimple task={item} />
                    </Box>} keyExtractor={item => item._id} />
            </Box> : <Text>Niente</Text>}



            <Text>Created on {props.project.creationDate}</Text>
            <Text>Modificated on {props.project.modificationDate}</Text>

        </Container>
    )
}

ProjectSelector.defaultProps = {
    project: {
        "users": {
            "creators": [
                {
                    "_id": "620fd2edc7effb0abb07ccbf",
                    "username": "AdminMax",
                    "image": "https://randomuser.me/api/portraits/lego/6.jpg",
                    "status": "Active"
                }
            ],
            "joiners": [],
            "managers": [
                {
                    "_id": "620fd2edc7effb0abb07ccbf",
                    "username": "AdminMax",
                    "image": "https://randomuser.me/api/portraits/lego/6.jpg",
                    "status": "Active"
                }
            ]
        },
        "settings": {
            "colorScheme": "DefaultModified"
        },
        "_id": "620fd33cc7effb0abb07ccca",
        "name": "PostMan name 1 - After MOD",
        "description": "description - AFTER MOD -1",
        "completion": true,
        "image": "reqUser.image - after MOD -1",
        "status": "Active",
        "creationDate": "2022-02-18T17:11:24.637Z",
        "modificationDate": "2022-02-28T10:12:03.650Z",
        "tasks": [
            {
                "_id": "620fdc774c33628925c81365",
                "name": "PostMan name 1",
                "image": "req.image",
                "status": "Active"
            },
            {
                "_id": "620fdc8c0e1e0f5a3b71ae8a",
                "name": "PostMan name 1",
                "image": "req.image",
                "status": "Active"
            },
            {
                "_id": "620fdd072c14c2e8023aa11d",
                "name": "PostMan UPDATE 1",
                "image": "IMAGINE OLL THE PIPOL",
                "status": "active"
            },
            {
                "_id": "621c9ff3f3a9ca7ebd2e112c",
                "name": "Uffa chge wall era",
                "image": "req.image",
                "status": "Active"
            }
        ],
        "notifications": [],
        "__v": 4
    }
}

export default ProjectSelector;
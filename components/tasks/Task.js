import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import ProfilePicture from '../users/UserPanel/ProfilePicture';

const Task = (props) => {



    function handleLogout() {
        context.logoutUserFunc();
    }

    return (

        <Center size="lg" alignSelf={"auto"} w={"full"} h={"100%"}>
            <HStack>
                <Center>
                    <Checkbox value="orange" colorScheme="orange" size="lg" p={0} m={0} icon={<Icon as={<MaterialIcons name="celebration" />} />} defaultIsChecked={props.task.completion}>
                        <VStack pl={"9"}>
                            <Heading size="sm">{props.task.name}</Heading>
                            <Text>{props.task.description}</Text>

                            <Text>{props.task.level}</Text>

                            <HStack alignItems={"center"}>
                                <Text>Created by: </Text>
                                <Avatar.Group size={"sm"} max={4}>
                                    <ProfilePicture zIndex={0} source={props.task.users.creators[0].image} username={props.task.users.creators[0].username}></ProfilePicture>
                                </Avatar.Group>
                            </HStack>
                            {props.task.users.managers.length > 0 ?
                                <HStack alignItems={"center"}>
                                    <Text>Managed by: </Text>
                                    <Avatar.Group size={"sm"} max={4}>
                                        <ProfilePicture zIndex={0} source={props.task.users.managers[0].image} username={props.task.users.managers[0].username}></ProfilePicture>
                                    </Avatar.Group>
                                </HStack>
                                : null}
                            {props.task.users.joiners.length > 0 ?
                                <HStack alignItems={"center"}>
                                    <Text>Can be viewed by by: </Text>
                                    <Avatar.Group size={"sm"} max={4}>
                                        <ProfilePicture zIndex={0} source={props.task.users.joiners[0].image} username={props.task.users.joiners[0].username}></ProfilePicture>
                                    </Avatar.Group>
                                </HStack>
                                : null}


                            <Text>Created on {props.task.creationDate}</Text>
                            <Text>Modificated on {props.task.modificationDate}</Text>
                        </VStack>
                    </Checkbox>
                </Center>
            </HStack>
        </Center>

    )
}

Task.defaultProps = {
    task: {
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
            "colorScheme": "default"
        },
        "_id": "621c9ff3f3a9ca7ebd2e112c",
        "name": "Uffa chge wall era",
        "completion": false,
        "description": "WALLERONA",
        "image": "req.image",
        "level": 5,
        "status": "Active",
        "creationDate": "2022-02-28T10:12:03.521Z",
        "modificationDate": "2022-02-28T10:12:03.654Z",
        "project": {
            "_id": "620fd33cc7effb0abb07ccca",
            "name": "PostMan name 1 - After MOD",
            "image": "reqUser.image - after MOD -1",
            "status": "Active"
        },
        "notifications": [],
        "__v": 0
    }
}

export default Task;
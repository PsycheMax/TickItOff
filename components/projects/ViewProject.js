import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, Spacer } from 'native-base';
import { MaterialIcons } from "@native-base/icons";;
import ProfilePicture from '../users/UserPanel/ProfilePicture';
import Task from '../tasks/Task';
import TaskSimple from '../tasks/TaskSimple';


const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
}, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}];


const ViewProject = (props) => {


    return (

        <Center size={"full"} alignSelf={"auto"} w={"full"} h={"100%"}>
            <HStack>
                <Center>

                    <VStack pl={"9"}>
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
                    </VStack>

                </Center>
            </HStack>
        </Center>

    )
}

ViewProject.defaultProps = {
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

export default ViewProject;
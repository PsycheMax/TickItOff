import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import ProfilePicture from '../users/UserPanel/ProfilePicture';

const TaskSimple = (props) => {

    return (

        <Center size="lg" alignSelf={"auto"} w={"full"} h={"100%"}>
            <HStack>
                <Center>
                    <Checkbox value="orange" colorScheme="orange" size="lg" p={0} m={0} icon={<Icon as={<MaterialIcons name="celebration" />} />} defaultIsChecked={props.task.completion}>
                        <VStack pl={"9"}>
                            <Heading size="sm">{props.task.name}</Heading>
                            <Text>{props.task.description}</Text>

                            <Text>{props.task.level}</Text>

                            <Text>Created on {props.task.creationDate}</Text>
                            <Text>Modificated on {props.task.modificationDate}</Text>
                        </VStack>
                    </Checkbox>
                </Center>
            </HStack>
        </Center>

    )
}

TaskSimple.defaultProps = {
    task: {
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

export default TaskSimple;
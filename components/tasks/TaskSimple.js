import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box } from 'native-base';
import { MaterialIcons } from "@native-base/icons";
import ProfilePicture from '../users/UserPanel/ProfilePicture';
import { ProjectContext } from '../../utils/ProjectManager';

const TaskSimple = (props) => {
    const ProjectFunctions = useContext(ProjectContext);

    async function toggleCompletion() {
        await ProjectFunctions.patchTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id, { ...props.task, completion: !props.task.completion });
    }

    async function archiveTask() {
        await ProjectFunctions.deleteTaskInProjectFunc(ProjectFunctions.currentProjectData._id, props.task._id);
        await ProjectFunctions.reloadCurrentProjectDataFunc();
    }

    console.log(props.task)
    return (

        <Box size="lg" alignSelf={"auto"} w={"full"} h={"100%"}>
            <HStack>

                <Checkbox colorScheme="orange" size="lg" p={0} m={0}
                    icon={<Icon as={<MaterialIcons name="celebration" />} />} defaultIsChecked={props.task.completion}
                    onChange={toggleCompletion}
                >
                    <VStack pl={"9"} maxW={"full"} w={"full"}>
                        <Heading size="sm" >{props.task.name}</Heading>
                        <Text>{props.task.description}</Text>

                        <Text>{props.task.level}</Text>

                        <Text>Created on {props.task.creationDate}</Text>
                        <Text>Modificated on {Date(props.task.modificationDate)}</Text>
                    </VStack>
                </Checkbox>
                <Center w={"1/6"} display={props.task.active ? "block" : "none"} >
                    <IconButton icon={<Icon as={<MaterialIcons name="delete" />} />}
                        onPress={archiveTask} />
                </Center>
            </HStack>
        </Box>

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
        "active": "true",
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
import React, { useContext } from 'react';
import { IconButton, Center, Text, Checkbox, Heading, Icon, VStack, HStack, Avatar, Box, FlatList, View, Container, Button, Spinner } from 'native-base';
import { MaterialIcons } from "@native-base/icons";;
import ProfilePicture from '../users/UserPanel/ProfilePicture';
import TaskSimple from '../tasks/TaskSimple';
import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';

const ProjectSelector = (props) => {

    const UserData = useContext(LoggedUserContext).userData;
    const ViewFunctions = useContext(ViewManagerContext);
    const ProjectFunctions = useContext(ProjectContext);

    let projects = UserData.projects;
    console.log(UserData);
    console.log(projects);

    async function selectProject(targetID) {
        await ProjectFunctions.setCurrentProjectDataFunc(targetID);
        await ViewFunctions.changeCurrentViewTo("ViewProject");
    }

    if (UserData._id !== undefined) {
        return (
            <VStack maxW={"3/4"} minW={"3/4"} w={"3/4"}>

                <FlatList data={projects.managed}
                    renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <Button onPress={selectProject.bind(this, item._id)} >{item.name}</Button>
                    </Box>} keyExtractor={item => item._id} />

            </VStack>
        )
    } else {
        return (
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        );
    }

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
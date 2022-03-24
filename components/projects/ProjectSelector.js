import React, { useContext, useState, useEffect } from 'react';
import { Heading, VStack, HStack, Box, FlatList, View, Button, Spinner, Pressable } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';

const ProjectSelector = (props) => {

    const LoggedUserFunctions = useContext(LoggedUserContext);
    const UserData = LoggedUserFunctions.userData;
    const ViewFunctions = useContext(ViewManagerContext);
    const ProjectFunctions = useContext(ProjectContext);

    const [showArchivedProjects, setShowArchivedProjects] = useState(false);

    let projects = UserData.projects;

    async function selectProject(targetID) {
        await ProjectFunctions.setCurrentProjectDataFunc(targetID);
        await ViewFunctions.changeCurrentViewTo("ViewProject");
    }

    async function toggleShowArchivedProjects() {
        setShowArchivedProjects(!showArchivedProjects);
    }

    useEffect(() => {
        LoggedUserFunctions.updateLoggedUserDataFunc();
    }, [])

    if (UserData._id !== undefined) {
        return (
            <VStack minW={"95%"} maxW={"95%"} w={"95%"} >
                <Heading >Your Active Projects</Heading>
                <NewProjectForm />

                <FlatList data={projects.managed}
                    renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <Button onPress={selectProject.bind(this, item._id)} >{item.name}</Button>
                    </Box>} keyExtractor={item => item._id} />

                <View>
                    <Pressable onPress={toggleShowArchivedProjects}>
                        <Heading
                            borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
                            borderBottomWidth={showArchivedProjects ? "0" : "1"}>
                            Archived Projects
                        </Heading>
                    </Pressable>
                    <View display={showArchivedProjects ? "block" : "none"}>
                        <FlatList pt={"10"} data={projects.archived}
                            renderItem={({ item }) => <Box borderBottomWidth="1" _dark={{
                                borderColor: "gray.600"
                            }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                <Button onPress={selectProject.bind(this, item._id)} >{item.name}</Button>
                            </Box>} keyExtractor={item => item._id} />
                    </View>
                </View>

            </VStack>
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;

// ProjectSelector.defaultProps = {
//     project: {
//         "users": {
//             "creators": [
//                 {
//                     "_id": "620fd2edc7effb0abb07ccbf",
//                     "username": "AdminMax",
//                     "image": "https://randomuser.me/api/portraits/lego/6.jpg",
//                     "status": "Active"
//                 }
//             ],
//             "joiners": [],
//             "managers": [
//                 {
//                     "_id": "620fd2edc7effb0abb07ccbf",
//                     "username": "AdminMax",
//                     "image": "https://randomuser.me/api/portraits/lego/6.jpg",
//                     "status": "Active"
//                 }
//             ]
//         },
//         "settings": {
//             "colorScheme": "DefaultModified"
//         },
//         "_id": "620fd33cc7effb0abb07ccca",
//         "name": "PostMan name 1 - After MOD",
//         "description": "description - AFTER MOD -1",
//         "completion": true,
//         "image": "reqUser.image - after MOD -1",
//         "status": "Active",
//         "creationDate": "2022-02-18T17:11:24.637Z",
//         "modificationDate": "2022-02-28T10:12:03.650Z",
//         "tasks": [
//             {
//                 "_id": "620fdc774c33628925c81365",
//                 "name": "PostMan name 1",
//                 "image": "req.image",
//                 "status": "Active"
//             },
//             {
//                 "_id": "620fdc8c0e1e0f5a3b71ae8a",
//                 "name": "PostMan name 1",
//                 "image": "req.image",
//                 "status": "Active"
//             },
//             {
//                 "_id": "620fdd072c14c2e8023aa11d",
//                 "name": "PostMan UPDATE 1",
//                 "image": "IMAGINE OLL THE PIPOL",
//                 "status": "active"
//             },
//             {
//                 "_id": "621c9ff3f3a9ca7ebd2e112c",
//                 "name": "Uffa chge wall era",
//                 "image": "req.image",
//                 "status": "Active"
//             }
//         ],
//         "notifications": [],
//         "__v": 4
//     }
// }

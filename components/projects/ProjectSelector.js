import React, { useContext, useState, useEffect } from 'react';
import { Heading, VStack, FlatList, Pressable, ScrollView } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';

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
                <VStack pb={"2rem"} borderRadius={"2xl"} h={"auto"}>
                    <Heading mb={"0.5rem"} >Your Active Projects</Heading>
                    <NewProjectForm />
                    <FlatList data={projects.managed}
                        renderItem={({ item }) =>
                            <ProjectSelectionButton name={item.name} description={item.description}
                                selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"primary.500"} />
                        } keyExtractor={item => item._id} />

                </VStack>
                <VStack w={"110%"} ml={"-1rem"}
                    pl={"1rem"} pr={"1rem"} pb={"1rem"} pt={"1rem"}
                    bg={"primary.500"}
                >
                    <Pressable onPress={toggleShowArchivedProjects}>
                        <Heading
                            pb={"1rem"} color={"tertiary.50"}
                            borderBottomStyle={"solid"} borderBottomColor={"primary.500"}
                            borderBottomWidth={showArchivedProjects ? "0" : "1"}>
                            Archived Projects
                        </Heading>
                    </Pressable>
                    <ScrollView display={showArchivedProjects ? "block" : "none"}>
                        <FlatList data={projects.archived}
                            renderItem={({ item }) =>
                                <ProjectSelectionButton name={item.name} description={item.description}
                                    selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"secondary.300"} />
                            } keyExtractor={item => item._id} />
                    </ScrollView>
                </VStack>

            </VStack>
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;
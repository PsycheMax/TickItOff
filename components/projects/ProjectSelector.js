import React, { useContext, useState, useEffect } from 'react';
import { Heading, VStack, FlatList, Pressable, View } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

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
                <VStack pb={scale(32)} borderRadius={"2xl"} h={"auto"}>
                    <Heading mb={scale(8)} >Your Active Projects</Heading>
                    {/* <NewProjectForm /> */}
                    <View>
                        <FlatList data={projects.managed}
                            renderItem={({ item }) =>
                                <ProjectSelectionButton name={item.name} description={item.description}
                                    selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"primary.500"} />
                            } keyExtractor={item => item._id} />
                    </View>

                </VStack>
                {/* <VStack w={"110%"} ml={-scale(16)}
                    p={scale(16)}
                    bg={"primary.500"}
                >
                    <Pressable onPress={toggleShowArchivedProjects}>
                        <Heading
                            pb={scale(16)} color={"tertiary.50"}
                            borderBottomColor={"primary.500"}
                            borderBottomWidth={showArchivedProjects ? "0" : "1"}>
                            Archived Projects
                        </Heading>
                        <View display={showArchivedProjects ? "block" : "none"}>
                            <FlatList data={projects.archived}
                                renderItem={({ item }) =>
                                    <ProjectSelectionButton name={item.name} description={item.description}
                                        selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"secondary.300"} />
                                } keyExtractor={item => item._id} />
                        </View>
                    </Pressable>
                </VStack> */}

            </VStack>
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;
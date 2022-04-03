import React, { useContext, useState, useEffect } from 'react';
// import { Heading, VStack, FlatList, Pressable, View, ScrollView } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const ProjectSelector = (props) => {

    const LoggedUserFunctions = useContext(LoggedUserContext);
    const UserData = LoggedUserFunctions.userData;
    const ProjectFunctions = useContext(ProjectContext);

    const [showArchivedProjects, setShowArchivedProjects] = useState(false);

    let projects = UserData.projects;

    async function selectProject(targetID) {
        await ProjectFunctions.setCurrentProjectDataFunc(targetID);
        props.navigation.navigate('ViewProject');
    }

    async function toggleShowArchivedProjects() {
        setShowArchivedProjects(!showArchivedProjects);
    }

    useEffect(() => {
        LoggedUserFunctions.updateLoggedUserDataFunc();
        props.navigation.reset({
            index: 0,
            routes: [{ name: "ProjectSelector" }]
        })
    }, [])

    if (UserData._id !== undefined) {
        return (
            <></>
            // <View minW={"95%"} maxW={"95%"} w={"95%"} >
            //     <View pb={scale(32)} borderRadius={"2xl"}>
            //         <FlatList data={projects.managed}
            //             renderItem={({ item }) =>
            //                 <ProjectSelectionButton name={item.name} description={item.description}
            //                     selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"primary.500"} />
            //             } keyExtractor={item => item._id}
            //             ListHeaderComponent={<>
            //                 <Heading mb={scale(8)} >Your Active Projects</Heading>
            //                 <NewProjectForm /></>}
            //         />
            //     </View>
            //     <VStack w={"110%"} ml={-scale(16)}
            //         p={scale(16)}
            //         bg={"primary.500"}
            //     >
            //         <Pressable onPress={toggleShowArchivedProjects}>
            //             <FlatList data={projects.archived}
            //                 renderItem={({ item }) =>
            //                     <ProjectSelectionButton name={item.name} description={item.description}
            //                         selectProjectFunc={selectProject.bind(this, item._id)} bgColor={"secondary.300"} />
            //                 } keyExtractor={item => item._id}
            //                 ListHeaderComponent={<>
            //                     <Heading
            //                         pb={scale(16)} color={"tertiary.50"}
            //                         borderBottomColor={"primary.500"}
            //                         borderBottomWidth={showArchivedProjects ? "0" : "1"}>
            //                         Archived Projects
            //                     </Heading>
            //                 </>}
            //             />
            //         </Pressable>
            //     </VStack>

            // </View>
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;
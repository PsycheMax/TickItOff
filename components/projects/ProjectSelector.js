import React, { useContext, useState, useEffect } from 'react';
// import { Heading, VStack, FlatList, Pressable, View, ScrollView } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';

import { ThemeContext } from '../../utils/ThemeManager';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';

const ProjectSelector = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {

            alignSelf: "center",
            minWidth: theme.dimensions.screenWidth,
            width: theme.dimensions.screenWidth,
            maxWidth: theme.dimensions.screenWidth,
        },
        listContainer: {
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            paddingBottom: 32,
            paddingHorizontal: "3.5%"
        },
        activeListContainer: {
            backgroundColor: theme.colors.secondary[50],

        },
        archivedListContainer: {
            backgroundColor: theme.colors.primary[800]
        },
        darkText: {
            color: theme.colors.primary[900]
        },
        whiteText: {
            color: theme.colors.secondary[50]
        },
        title: {
            fontSize: 24,
            fontWeight: "700"
        }

    });

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
            <View style={styles.container}>
                <View style={[styles.listContainer, styles.activeListContainer]}>
                    <FlatList data={projects.managed}
                        renderItem={({ item }) =>
                            <ProjectSelectionButton name={item.name} description={item.description}
                                selectProjectFunc={selectProject.bind(this, item._id)} bgColor={theme.colors.primary[500]}
                            />}
                        keyExtractor={(item => item._id)}
                        ListHeaderComponent={
                            <>
                                <Text style={[styles.darkText, styles.title]}>Your active projects</Text>
                                <NewProjectForm />
                            </>
                        } />
                </View>
                <View style={[styles.listContainer, styles.archivedListContainer]}>
                    <ProjectSelectionButton />
                </View>


            </View>
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
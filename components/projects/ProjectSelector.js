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
            minWidth: theme.dimensions.windowWidth,
            width: theme.dimensions.windowWidth,
            maxWidth: theme.dimensions.windowWidth,
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
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;
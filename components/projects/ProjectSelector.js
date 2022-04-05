import React, { useContext, useState, useEffect } from 'react';
// import { Heading, VStack, FlatList, Pressable, View, ScrollView } from 'native-base';
import { LoggedUserContext } from '../../utils/UserManager';
import { ProjectContext } from '../../utils/ProjectManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';

import { ThemeContext } from '../../utils/ThemeManager';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, SectionList } from 'react-native';

const ProjectSelector = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {

            alignSelf: "center",
            minWidth: theme.dimensions.windowWidth,
            width: theme.dimensions.windowWidth,
            maxWidth: theme.dimensions.windowWidth,
        },
        listContainerStandardPadding: {
            paddingHorizontal: "3.5%"
        },
        bottomListContainer: {
            paddingBottom: 32,
            height: 32,
            maxHeight: 32,
            minHeight: 32,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
        },
        topListContainer: {
            paddingTop: 32,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
        },
        activeListContainerBG: {
            backgroundColor: theme.colors.secondary[50],
        },
        archivedListContainerBG: {
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

    /**
     * The following function processes the UserData.projects. The final object is an array containing the original data in a SectionList compatible form. 
     * The array looks like this: 
     * 
     * [{ data: [{project}], title:"Section Title"},...{}]
     */
    function processUserProjectDataForSectionList() {
        // Writing this in a verbose way: declared two local arrays
        let archivedArray = [];
        let activeArray = [];
        // For each project in the UserData.projects.archived, add a key and push it in the previously created array
        projects.archived.forEach(archivedProject => {
            archivedProject.key = archivedProject._id;
            archivedArray.push(archivedProject);
        });
        // For each project in the UserData.projects.active, add a key and push it in the previously created array
        projects.managed.forEach(activeProject => {
            activeProject.key = activeProject._id;
            activeArray.push(activeProject);
        });
        // Create an object containing a section title, and an array at the key "data", for each category/section.
        let active = {
            data: activeArray,
            title: "Your active Projects"
        };
        let archived = {
            data: archivedArray,
            title: "Your archived Projects"
        };
        // Return the newly created objects in an array;
        return [active, archived];
    }


    async function selectProject(targetID) {
        await ProjectFunctions.setCurrentProjectDataFunc(targetID);
        props.navigation.navigate('ViewProject');
    }

    async function toggleShowArchivedProjects() {
        setShowArchivedProjects(!showArchivedProjects);
    }

    useEffect(() => {
        LoggedUserFunctions.updateLoggedUserDataFunc();
        // props.navigation.reset({
        //     index: 0,
        //     routes: [{ name: "ProjectSelector" }]
        // })
    }, [])

    if (UserData._id !== undefined) {
        return (
            <View style={styles.container}>

                <SectionList
                    sections={processUserProjectDataForSectionList()}
                    renderItem={({ item }) =>
                        <View style={[styles.listContainerStandardPadding, item.active ? styles.activeListContainerBG : styles.archivedListContainerBG]} >
                            <ProjectSelectionButton name={item.name} description={item.description}
                                selectProjectFunc={selectProject.bind(this, item._id)} bgColor={theme.colors.primary[500]}
                            />
                        </View>}
                    renderSectionHeader={({ section: { title, data } }) => {
                        return <View
                            style={[
                                styles.listContainerStandardPadding, styles.topListContainer,
                                data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
                            ]} >
                            <Text style={[styles.title, data[0] && data[0].active ? styles.darkText : styles.whiteText]}>{title}</Text>
                            {title === "Your active Projects" ? <NewProjectForm /> : <></>}
                        </View>
                    }}
                    renderSectionFooter={({ section: { title, data } }) => {
                        return <View style={[
                            styles.listContainerStandardPadding, styles.bottomListContainer,
                            data[0] && data[0].active ? styles.activeListContainerBG : styles.archivedListContainerBG
                        ]}>

                        </View>
                    }}
                />


            </View>
        )
    } else {
        return (
            <LoadingSpinner />
        );
    }

}

export default ProjectSelector;
//     if (UserData._id !== undefined) {
//         return (
//             <View style={styles.container}>
//                 <View style={[styles.listContainer, styles.activeListContainer]}>
//                     <FlatList data={projects.managed}
//                         renderItem={({ item }) =>
//                             <ProjectSelectionButton name={item.name} description={item.description}
//                                 selectProjectFunc={selectProject.bind(this, item._id)} bgColor={theme.colors.primary[500]}
//                             />}
//                         keyExtractor={(item => item._id)}
//                         ListHeaderComponent={
//                             <>
//                                 <Text style={[styles.darkText, styles.title]}>Your active projects</Text>
//                                 <NewProjectForm />
//                             </>
//                         } />
//                 </View>
//                 <View style={[styles.listContainer, styles.archivedListContainer]}>
//                     <FlatList data={projects.archived}
//                         renderItem={({ item }) =>
//                             <ProjectSelectionButton name={item.name} description={item.description}
//                                 selectProjectFunc={selectProject.bind(this, item._id)} bgColor={theme.colors.primary[500]}
//                             />}
//                         keyExtractor={(item => item._id)}
//                         ListHeaderComponent={
//                             <>
//                                 <Text style={[styles.whiteText, styles.title]}>Your archived projects</Text>
//                             </>
//                         } />
//                 </View>


//             </View>
//         )
//     } else {
//         return (
//             <LoadingSpinner />
//         );
//     }

// }

// export default ProjectSelector;
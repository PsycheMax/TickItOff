import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';

import { LoggedUserContext } from '../../utils/UserManager';
import { ProjectContext } from '../../utils/ProjectManager';
import { ThemeContext } from '../../utils/ThemeManager';
import NewProjectForm from './NewProjectForm';
import LoadingSpinner from '../generic/LoadingSpinner';
import ProjectSelectionButton from './ProjectSelectionButton';
import { CommonActions } from '@react-navigation/native';

const ProjectSelector = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            // backgroundColor: "red",
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
            // backgroundColor: theme.colors.primary[50],
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
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 12
        }

    });

    const LoggedUserFunctions = useContext(LoggedUserContext);
    const UserData = LoggedUserFunctions.userData;

    const [showArchivedProjects, setShowArchivedProjects] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false)

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
        // For each project in the UserData.projects.archived, add a key to it, and push it in the previously created array
        if (projects && projects.archived && projects.archived.length !== 0) {
            projects.archived.forEach(archivedProject => {
                let projectWithKey = { ...archivedProject, key: archivedProject._id };
                archivedArray.push(projectWithKey);
            });
        }
        // For each project in the UserData.projects.active, add a key to it, and push it in the previously created array
        if (projects && projects.managed && projects.managed.length !== 0) {
            projects.managed.forEach(activeProject => {
                let projectWithKey = { ...activeProject, key: activeProject._id };
                activeArray.push(projectWithKey);
            });
        }
        // Create an object containing a section title, and an array at the key "data", for each category/section.
        let active = {
            data: activeArray,
            title: "Active Projects",
            tag: "activeProjects",
            requiresFullHeader: true
        };
        let archived = {
            data: archivedArray,
            title: "Archived Projects",
            tag: "archivedProjects",
            requiresFullHeader: false
        };
        // Return the newly created objects in an array;
        return [active, archived];
    }

    async function selectProject(targetID) {
        // await ProjectFunctions.setCurrentProjectDataFunc(targetID);
        props.navigation.navigate('ViewProject', { id: targetID });
    }

    async function onRefreshFunction() {
        setIsRefreshing(true);
        LoggedUserFunctions.updateLoggedUserDataFunc().then((result) => { setIsRefreshing(false) })
    }

    useEffect(() => {
        LoggedUserFunctions.updateLoggedUserDataFunc();
    }, [])

    const artificialNavState = { "stale": true, "routes": [{ "name": "Home" }] }

    // The following useEffect runs only on componentLoad
    useEffect(() => {
        // It checks the navigation state
        let navState = props.navigation.getState();
        // IF the navigation state is not as "artificialNavState" (when it comes to pages visited)
        if (navState.routes[0].name !== artificialNavState.routes[0].name) {
            // It sets a new state, corresponding to the wanted NavigationState
            props.navigation.dispatch((state) => {
                return CommonActions.reset(artificialNavState);
            })
        }

    }, [])

    if (UserData._id !== undefined) {
        return (
            <View style={styles.container}>

                <SectionList
                    // OnRefresh lets mobile user refresh by pulling down the list
                    onRefresh={onRefreshFunction}
                    refreshing={isRefreshing}

                    sections={processUserProjectDataForSectionList()}
                    renderItem={({ item }) =>
                        <View style={[styles.listContainerStandardPadding, item.active ? styles.activeListContainerBG : styles.archivedListContainerBG]} >
                            <ProjectSelectionButton name={item.name} description={item.description}
                                selectProjectFunc={selectProject.bind(this, item._id)} bgColor={theme.colors.primary[500]}
                            />
                        </View>}

                    renderSectionHeader={({ section: { title, data, tag, requiresFullHeader } }) => {
                        return <View
                            style={[
                                styles.listContainerStandardPadding, styles.topListContainer,
                                tag === "activeProjects" ? styles.activeListContainerBG : styles.archivedListContainerBG
                            ]} >
                            <Text style={[
                                styles.title,
                                tag === "activeProjects" ? styles.darkText : styles.whiteText
                            ]}>{title}</Text>
                            {requiresFullHeader ? <NewProjectForm updateProjectSelectorFunc={LoggedUserFunctions.updateLoggedUserDataFunc} /> : <></>}
                        </View>
                    }}

                    renderSectionFooter={({ section: { title, data, tag } }) => {
                        return <View style={[
                            styles.listContainerStandardPadding, styles.bottomListContainer,
                            tag === "activeProjects" ? styles.activeListContainerBG : styles.archivedListContainerBG
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
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewComponent, StyleSheet, Text, View } from 'react-native';

import { Link, NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectSelector from "./components/projects/ProjectSelector";
import ViewProject from "./components/projects/ViewProject";
import UserPanel from "./components/users/UserPanel/UserPanel";

import { ThemeContext } from './utils/ThemeManager';
import { LoggedUserContext } from './utils/UserManager';

import ProfilePicture from './components/users/UserPanel/ProfilePicture';
import LoginForm from './components/users/UserForms/LoginForm';
import SignUpForm from './components/users/UserForms/SignUpForm';
import LoadingWholeApp from './components/LoadingWholeApp';
import { ProjectContext } from './utils/ProjectManager';

export default function Navigator(props) {

    const Stack = createNativeStackNavigator();
    const LoggedUserData = useContext(LoggedUserContext).userData;
    const ProjectContextData = useContext(ProjectContext).currentProjectData;
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        backgroundColored: {
            backgroundColor: theme.colors.primary[50],
            minHeight: theme.dimensions.windowHeight,
            height: "100%"
            // minHeight: "100%"
            // flex: 1
        },
        appContainer: {
            minWidth: theme.dimensions.windowWidth,
            minHeight: theme.dimensions.windowHeight,
            // backgroundColor: theme.colors.transparent[50],
        },
        header: {
            flex: 1,
            minHeight: 50,
            height: theme.dimensions.windowHeight * 0.06,
            // height: 250,
            backgroundColor: theme.colors.tertiary[500],
            borderBottomLeftRadius: theme.dimensions.methods.scale(10),
            borderBottomRightRadius: theme.dimensions.methods.scale(10)
        },
        flexRow: {
            flexDirection: "row",
            display: "flex",
            width: "18%",
            minWidth: "18%",
            justifyContent: "space-between",
        },
        link: {
            // minWidth: 70,
            // minHeight: 70,
            marginRight: 10
        },
        headerOnWeb: {
            // marginBottom: -theme.dimensions.windowHeight * 0.06
        },
        emptySpace: {
            minHeight: theme.dimensions.windowHeight * 0.06,
            paddingBottom: theme.dimensions.windowHeight * 0.06,
        }
    })



    function headerTitle({ navigation, route, options, back }) {

        return <View style={[styles.headerOnWeb]}>

            <Link style={[styles.logoContainer, styles.link]} to={{ screen: 'UserPanel' }} >
                {LoggedUserData && LoggedUserData.username
                    ? <ProfilePicture username={LoggedUserData.username} />
                    : <React.Fragment />}
            </Link>

        </View>
    }


    const linking = {
        prefixes: ['http://192.168.68.131:19006'],
        config: {
            screens: {
                Home: '',
                ViewProject: "project/:id",
                UserPanel: "userPanel"
            }
        }
    }

    const personalizedThemeForNavigator = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.colors.secondary[50]
        }
    }

    function renderNavigator() {
        return (

            <NavigationContainer
                // theme={personalizedThemeForNavigator}
                linking={linking} fallback={LoadingWholeApp}
            >

                {LoggedUserData && LoggedUserData.token && LoggedUserData.token.length > 0 ?
                    <Stack.Navigator initialRouteName={'Home'}
                        style={styles.backgroundColored}

                        screenOptions={{
                            headerRight: headerTitle, headerStyle: styles.header,
                            headerTitleStyle: { color: theme.colors.secondary[50] },
                            // contentStyle: styles.backgroundColored,
                        }}
                    >

                        <Stack.Screen name="Home" component={ProjectSelector} />
                        <Stack.Screen name="ViewProject" component={ViewProject} initialParams={ProjectContextData._id} />
                        <Stack.Screen name="UserPanel" component={UserPanel} />


                    </Stack.Navigator>
                    :
                    <Stack.Navigator initialRouteName={'Loading'}
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Loading" component={LoadingWholeApp} />
                        <Stack.Screen name="Login" component={LoginForm} />
                        <Stack.Screen name="SignUp" component={SignUpForm} />
                    </Stack.Navigator>
                }
            </NavigationContainer >
        )
    }


    return (
        Platform.OS === "android" ?
            <View style={[styles.appContainer, styles.backgroundColored]}
            // behavior={'padding'}
            >
                {renderNavigator()}
            </View>
            :
            <ScrollView
                // StickyHeaderComponent={headerTitle}
                // stickyHeaderHiddenOnScroll={false}
                // stickyHeaderIndices={[0]}
                style={[styles.appContainer, styles.backgroundColored]}

            >
                <View style={[styles.emptySpace]} pointerEvents="none" />
                {renderNavigator()}
            </ScrollView>
    );
}
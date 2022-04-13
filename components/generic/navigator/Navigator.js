import React, { useContext } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Link, NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectSelector from "../../projects/ProjectSelector";
import ViewProject from "../../projects/ViewProject";
import UserPanel from "../../users/UserPanel/UserPanel";

import { ThemeContext } from '../../../utils/ThemeManager';
import { LoggedUserContext } from '../../../utils/UserManager';

import ProfilePicture from '../../users/UserPanel/ProfilePicture';
import LoginForm from '../../users/UserForms/LoginForm';
import SignUpForm from '../../users/UserForms/SignUpForm';
import SplashScreen from '../SplashScreen';
import { ProjectContext } from '../../../utils/ProjectManager';

import * as Linking from 'expo-linking';
import Page404 from '../Page404';


export default function Navigator(props) {

    const Stack = createNativeStackNavigator();
    const UserContextManager = useContext(LoggedUserContext);
    const LoggedUserData = UserContextManager.userData;
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        backgroundColored: {
            backgroundColor: theme.colors.secondary[50],
            minHeight: theme.dimensions.windowHeight,
            height: "100%"
        },
        appContainer: {
            minWidth: theme.dimensions.windowWidth,
            minHeight: theme.dimensions.windowHeight,
        },
        header: {
            minHeight: 50,
            height: theme.dimensions.windowHeight * 0.06,
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
            marginRight: 10
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



    const prefix = Linking.createURL('/');

    const linking = {
        // prefixes: ['http://192.168.68.131:19006'],
        prefixes: [prefix, 'http://192.168.68.131:19006', 'https://maxpace.net/tickitoff'],
        config: {
            screens: {
                Home: '/',
                Home: '',
                ViewProject: "project/:id",
                UserPanel: "userPanel",
                404: '*'
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

    function renderNavigator(props) {
        const { hasCheckedLocalStorage, isLoggedIn } = UserContextManager;
        if (hasCheckedLocalStorage) {
            return (
                <NavigationContainer
                    theme={personalizedThemeForNavigator}
                    linking={linking} fallback={<Text>Loading</Text>}
                // onStateChange={(state) => { stateNavState(state) }}
                >
                    {isLoggedIn ?
                        <Stack.Navigator
                            // initialRouteName={'Home'}
                            style={styles.backgroundColored}

                            screenOptions={{
                                headerRight: headerTitle, headerStyle: styles.header,
                                headerTitleStyle: { color: theme.colors.secondary[50] },
                                // contentStyle: styles.backgroundColored,
                            }}


                        >

                            <Stack.Screen name="Home" component={ProjectSelector} />
                            <Stack.Screen name="ViewProject" component={ViewProject} />
                            <Stack.Screen name="UserPanel" component={UserPanel} />
                            <Stack.Screen options={{ headerShown: false }} name='404' component={Page404} />

                        </Stack.Navigator>
                        :
                        <Stack.Navigator
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="SplashScreen" component={SplashScreen} />
                            <Stack.Screen name="Home" component={LoginForm} />
                            <Stack.Screen name="SignUp" component={SignUpForm} />
                            <Stack.Screen name='404' component={Page404} />

                        </Stack.Navigator>
                    }
                </NavigationContainer >
            )
        } else {
            return (
                <SplashScreen shouldRedirect={false} />
                // <Text>Mammeta</Text>
            )
        }


    }

    return (
        Platform.OS === "android" ?
            <View style={[styles.appContainer, styles.backgroundColored]}
            // behavior={'padding'}
            >
                {renderNavigator(props)}
            </View>
            :
            <ScrollView
                // StickyHeaderComponent={headerTitle}
                // stickyHeaderHiddenOnScroll={false}
                // stickyHeaderIndices={[0]}
                style={[styles.appContainer, styles.backgroundColored]}

            >
                <View style={[styles.emptySpace]} pointerEvents="none" />
                {renderNavigator(props)}
            </ScrollView>
    );
}
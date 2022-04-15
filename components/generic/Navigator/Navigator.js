import React, { useContext, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { ThemeContext } from '../../../utils/ThemeManager';
import { LoggedUserContext } from '../../../utils/UserManager';

import SplashScreen from '../SplashScreen';
import AuthStack from './AuthStack';
import UnAuthStack from './UnAuthStack';

export default function Navigator(props) {

    const { isLoggedIn, hasCheckedLocalStorage } = useContext(LoggedUserContext);

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
        flexRow: {
            flexDirection: "row",
            display: "flex",
            width: "18%",
            minWidth: "18%",
            justifyContent: "space-between",
        },
        emptySpace: {
            minHeight: theme.dimensions.windowHeight * 0.06,
            paddingBottom: theme.dimensions.windowHeight * 0.06,
        }
    })

    const prefix = Linking.createURL('/');

    const linking = {
        // prefixes: ['http://192.168.68.131:19006'],
        prefixes: [prefix, 'http://192.168.68.131:19006', 'https://maxpace.net/tickitoff'],
        config: {
            screens: isLoggedIn ? {
                Home: '/',
                ViewProject: "project/:id",
                UserPanel: "userPanel",
                404: '*'
            } : {
                Home: '/',
                SignUp: 'SignUp',
                Login: 'Login',
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
        return (

            hasCheckedLocalStorage
                ?
                <NavigationContainer
                    theme={personalizedThemeForNavigator}
                    linking={linking} fallback={<Text>Loading</Text>}
                >
                    {isLoggedIn ?
                        <AuthStack />
                        :
                        <UnAuthStack />
                    }
                </NavigationContainer >
                :
                <SplashScreen shouldRedirect={false} />
        )
    }


    return (
        Platform.OS === "android" ?
            <View style={[styles.appContainer, styles.backgroundColored]}>
                {renderNavigator(props)}
            </View>
            :
            <ScrollView style={[styles.appContainer, styles.backgroundColored]}>
                <View style={[styles.emptySpace]} pointerEvents="none" />
                {renderNavigator(props)}
            </ScrollView>
    );
}
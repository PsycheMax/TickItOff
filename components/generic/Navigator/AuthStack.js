import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../../utils/ThemeManager';
import { LoggedUserContext } from '../../../utils/UserManager';

import ProfilePicture from '../../users/ProfilePicture';
import ProjectSelector from '../../projects/selector/ProjectSelector';
import UserPanel from '../../users/UserPanel';
import Page404 from '../Page404';
import ViewProject from '../../projects/ViewProject';
import AboutPage from '../../about/AboutPage';

export default function AuthStack(props) {

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
        headerOnWeb: {
            minHeight: 50,
            display: 'flex',
            flexDirection: 'row'
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
        homeLink: {
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.secondary[50],
            minHeight: 50,
            maxHeight: 50,
            minWidth: 50,
            maxWidth: 50,
            borderRadius: 100
        },
        emptySpace: {
            minHeight: theme.dimensions.windowHeight * 0.06,
            paddingBottom: theme.dimensions.windowHeight * 0.06,
        }
    })



    function headerTitle({ navigation, route, options, back }) {

        return <View style={[styles.headerOnWeb]}>
            <Link style={[styles.link]} to={{ screen: 'UserPanel' }} >
                {LoggedUserData && LoggedUserData.username
                    ? <ProfilePicture username={LoggedUserData.username} />
                    : <React.Fragment />}
            </Link>
            <Link style={[styles.link]} to={{ screen: 'Home' }} >
                <View style={[styles.homeLink]}>
                    <MaterialIcons name='home' size={32} color={theme.colors.primary[500]} />
                </View>
            </Link>
        </View>
    }

    return (
        <Stack.Navigator
            style={styles.backgroundColored}
            screenOptions={{
                headerRight: headerTitle, headerStyle: styles.header,
                headerTitleStyle: { color: theme.colors.secondary[50] }
            }}
        >
            <Stack.Screen name="Home" component={ProjectSelector} />
            <Stack.Screen name="ViewProject" component={ViewProject} />
            <Stack.Screen name="UserPanel" component={UserPanel} />
            <Stack.Screen name="About" component={AboutPage} />
            <Stack.Screen options={{ headerShown: false }} name='404' component={Page404} />
        </Stack.Navigator>
    );
}
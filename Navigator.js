import { LoggedUserContext } from './utils/UserManager';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectSelector from "./components/projects/ProjectSelector";
import ViewProject from "./components/projects/ViewProject";
import UserPanel from "./components/users/UserPanel/UserPanel";
import React, { useContext } from 'react';

import { StyleSheet, Text, View, Pressable } from 'react-native';
import { createBottomTabNavigator, create } from '@react-navigation/bottom-tabs';
import { ThemeContext } from './utils/ThemeManager';
import Logo from './components/logo/Logo';
import ProfilePicture from './components/users/UserPanel/ProfilePicture';
import LoginForm from './components/users/UserForms/LoginForm';
import SignUpForm from './components/users/UserForms/SignUpForm';
import LoadingWholeApp from './components/LoadingWholeApp';
import { Link } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Navigator(props) {

    const Stack = createNativeStackNavigator();
    const LoggedUserData = useContext(LoggedUserContext).userData;
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        backgroundColored: {
            backgroundColor: theme.colors.transparent[50],
        },
        appContainer: {
            minWidth: theme.dimensions.windowWidth,
            minHeight: theme.dimensions.windowHeight,
            height: "100%"
        },
        header: {
            minHeight: 15,
            height: theme.dimensions.screenHeight * 0.06,
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
        }
    })



    function headerTitle({ navigation, route, options, back }) {

        return <View style={[styles.backgroundColored]}>

            <Link style={[styles.logoContainer, styles.link]} to={{ screen: 'UserPanel' }} >
                {LoggedUserData && LoggedUserData.username
                    ? <ProfilePicture username={LoggedUserData.username} />
                    : <React.Fragment />}
            </Link>

        </View>
    }


    return (

        <View style={[styles.appContainer]}>
            <NavigationContainer>

                {LoggedUserData && LoggedUserData.token && LoggedUserData.token.length > 0 ?
                    <Stack.Navigator initialRouteName={'Home'}

                        screenOptions={{ headerRight: headerTitle, headerStyle: styles.header, headerTitleStyle: { color: theme.colors.secondary[50] } }}
                    >

                        <Stack.Screen name="Home" component={ProjectSelector} />
                        <Stack.Screen name="ViewProject" component={ViewProject} />
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
        </View>


    );
}











// export default function Navigator(props) {

//     const Stack = createNativeStackNavigator();
//     const LoggedUserData = useContext(LoggedUserContext).userData;

//     return (

//         <NavigationContainer>

//             <Stack.Navigator initialRouteName={LoggedUserData && LoggedUserData.token > 0 ? "ProjectSelector" : "LoginSignupPanel"}>
//                 <Stack.Screen name="LoginSignupPanel" component={LoginSignupPanel} options={{ title: "Tick It Off" }} />
//                 {/* <Stack.Group navigationKey={LoggedUserData && LoggedUserData.token ? "user" : "guest"}> */}
//                 <Stack.Group >
//                     <Stack.Screen name="UserPanel" component={UserPanel} options={{ title: "Profile" }} />
//                     <Stack.Screen name="ProjectSelector" component={ProjectSelector} options={{ title: "Select your project" }} />
//                     <Stack.Screen name="ViewProject" component={ViewProject} options={{ title: "Project Details" }} />
//                     <Stack.Screen name="LogoutView" component={LogoutView} options={{ title: "Logout" }} />
//                     <Stack.Screen name="LoadingSpinner" component={LoadingSpinner} options={{ title: "Loading..." }} />
//                 </Stack.Group>

//             </Stack.Navigator>

//         </NavigationContainer >


//     );
// }
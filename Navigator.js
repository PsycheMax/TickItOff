import { LoggedUserContext } from './utils/UserManager';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingSpinner from "./components/LoadingSpinner";
import ProjectSelector from "./components/projects/ProjectSelector";
import ViewProject from "./components/projects/ViewProject";
import UserPanel from "./components/users/UserPanel/UserPanel";
import React, { useContext } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, create } from '@react-navigation/bottom-tabs';
import { ThemeContext } from './utils/ThemeManager';
import Logo from './components/logo/Logo';
import ProfilePicture from './components/users/UserPanel/ProfilePicture';
import LoginForm from './components/users/UserForms/LoginForm';
import SignUpForm from './components/users/UserForms/SignUpForm';
import EditUserForm from './components/users/UserForms/EditUserForm';
import StandardDivider from './components/StandardDivider';
import ProjectSelectionButton from './components/projects/ProjectSelectionButton';



function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function Login(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={props.navigation.navigate.bind(this, "Home")}>Login!</Text>
            {console.log(props)}
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function HomeTabs() {
    return (<Tab.Navigator>

        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Projects" }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />


    </Tab.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function Navigator(props) {

    const Stack = createNativeStackNavigator();
    const LoggedUserData = useContext(LoggedUserContext).userData;
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        appContainer: {
            backgroundColor: theme.colors.secondary[50],
            minWidth: theme.dimensions.windowWidth,
            minHeight: theme.dimensions.windowHeight
        },
        header: {
            minHeight: 108,
            height: theme.dimensions.screenHeight * 0.18,
            backgroundColor: theme.colors.primary[500],
            borderBottomLeftRadius: theme.dimensions.methods.scale(110),
            borderBottomRightRadius: theme.dimensions.methods.scale(110),

        },
        flexRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: theme.dimensions.windowWidth - theme.dimensions.windowWidth * 0.20,
            minWidth: theme.dimensions.windowWidth,
            position: "absolute"
        },
        logoContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        profilePictureContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })


    function headerTitle({ navigation, route, options, back }) {

        return <View style={styles.flexRow}>
            <View style={styles.logoContainer}>
                <Logo />
            </View>

            <View style={styles.profilePictureContainer}>
                {/* {LoggedUserData && LoggedUserData.image ? <ProfilePicture /> : <React.Fragment />} */}
                <ProfilePicture />
            </View>

        </View>
    }


    return (

        <View style={styles.appContainer}>
            <NavigationContainer>

                {LoggedUserData && LoggedUserData.token && LoggedUserData.token.length > 0 ?
                    <Stack.Navigator initialRouteName={'Home'}
                    // screenOptions={{ headerTitle: headerTitle, headerStyle: styles.header }}
                    >

                        <Stack.Screen name="Home" component={ProjectSelector} />
                        <Stack.Screen name="ViewProject" component={ViewProject} />


                    </Stack.Navigator>
                    :
                    <Stack.Navigator initialRouteName={'Login'}
                    // screenOptions={{ headerTitle: headerTitle, headerStyle: styles.header }}
                    >
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
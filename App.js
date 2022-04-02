import { NativeBaseProvider, Center, extendTheme, Text, Heading, ScrollView } from "native-base";

import UserManagerContextProvider from "./utils/UserManager";
import ViewManagerContextProvider from "./components/mainView/ViewManagerContextProvider";
import ProjectManagerContextProvider from "./utils/ProjectManager";

import ViewManager from "./components/mainView/ViewManager";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignupPanel from "./components/users/LoginSignupPanel";
import LoadingSpinner from "./components/LoadingSpinner";
import ProjectSelector from "./components/projects/ProjectSelector";
import ViewProject from "./components/projects/ViewProject";
import UserPanel from "./components/users/UserPanel/UserPanel";

export default function App() {

  const theme = extendTheme({
    colors: {
      primary: {
        50: '#def5ff',
        100: '#b5dcfb',
        200: '#8bc2f4',
        300: '#5faaec',
        400: '#3392e5',
        500: '#1a78cc',
        600: '#0e5e9f',
        700: '#044373',
        800: '#002848',
        900: '#000e1e',
      },
      secondary:
      {
        50: '#e0f5ff',
        100: '#b3dfff',
        200: '#84cafc',
        300: '#56b5fb',
        400: '#32a0fa',
        500: '#2387e1',
        600: '#1769af',
        700: '#0c4b7e',
        800: '#002d4d',
        900: '#00101e',
      },
      tertiary:
      {
        50: '#fff6dd',
        100: '#f8e5b5',
        200: '#f1d38b',
        300: '#ebc25f',
        400: '#e5b134',
        500: '#cb971a',
        600: '#9e7611',
        700: '#71540b',
        800: '#453202',
        900: '#1b1000',
      },
      quartiary:
      {
        50: '#edf7f5',
        100: '#d0e6e3',
        200: '#b0d6d2',
        300: '#90c6c5',
        400: '#71b4b6',
        500: '#58969d',
        600: '#46717a',
        700: '#324f57',
        800: '#1e2d34',
        900: '#080e12',
      },
      transparent: {
        50: '#1a78cc00'
      }
    },
    config: {
      initialColorMode: 'light'
    }
  })

  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>

      <UserManagerContextProvider>
        <ProjectManagerContextProvider>

          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginSignupPanel">
              <Stack.Screen name="LoginSignupPanel" component={LoginSignupPanel} options={{ title: "Tick It Off" }} />
              <Stack.Screen name="UserPanel" component={UserPanel} options={{ title: "Profile" }} />
              <Stack.Screen name="ProjectSelector" component={ProjectSelector} options={{ title: "Select your project" }} />
              <Stack.Screen name="ViewProject" component={ViewProject} options={{ title: "Project Details" }} />
              <Stack.Screen name="LoadingSpinner" component={LoadingSpinner} options={{ title: "Loading..." }} />
            </Stack.Navigator>
          </NavigationContainer>


        </ProjectManagerContextProvider>
      </UserManagerContextProvider>

    </NativeBaseProvider >
  );
}
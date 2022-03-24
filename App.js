import { NativeBaseProvider, Center, extendTheme, Text, Heading } from "native-base";

import UserManagerContextProvider from "./utils/UserManager";
import ViewManagerContextProvider from "./components/mainView/ViewManagerContextProvider";
import ProjectManagerContextProvider from "./utils/ProjectManager";

import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import {
  Halant_300Light,
  Halant_400Regular,
  Halant_500Medium,
  Halant_600SemiBold,
  Halant_700Bold
} from '@expo-google-fonts/halant';

import {
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic
} from '@expo-google-fonts/nunito-sans'


import ViewManager from "./components/mainView/ViewManager";

export default function App() {

  let [fontsLoaded] = useFonts({
    'NunitoSans': NunitoSans_400Regular,
    'Halant': Halant_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

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
      }
    },
    fontConfig: {
      NunitoSans: {
        200: {
          normal: NunitoSans_200ExtraLight,
          italic: NunitoSans_200ExtraLight_Italic
        },
        300: {
          normal: NunitoSans_300Light,
          italic: NunitoSans_300Light_Italic
        },
        400: {
          normal: NunitoSans_400Regular,
          italic: NunitoSans_400Regular_Italic
        },
        600: {
          normal: NunitoSans_600SemiBold,
          italic: NunitoSans_600SemiBold_Italic
        },
        700: {
          normal: NunitoSans_700Bold,
          italic: NunitoSans_700Bold_Italic
        },
        800: {
          normal: NunitoSans_800ExtraBold,
          italic: NunitoSans_800ExtraBold_Italic
        },
        900: {
          normal: NunitoSans_900Black,
          italic: NunitoSans_900Black_Italic
        },
      },
      Halant: {
        300: {
          normal: Halant_300Light
        },
        400: {
          normal: Halant_400Regular
        },
        500: {
          normal: Halant_500Medium
        },
        600: {
          normal: Halant_600SemiBold
        },
        700: {
          normal: Halant_700Bold
        }
      },
    },
    fonts: {
      heading: Halant_500Medium,
      body: NunitoSans_400Regular,
      mono: 'NunitoSans'
    },
    config: {
      initialColorMode: 'light'
    }
  })

  return (
    <NativeBaseProvider theme={theme}>
      <Center h={"full"} w={"100%"} maxW={1024} mx={"auto"} backgroundColor={"quartiary.50"}>
        <UserManagerContextProvider>
          <ViewManagerContextProvider>
            <ProjectManagerContextProvider>
              {/* <Text fontFamily="body" fontWeight={600}>Mammeto</Text>
              <Heading fontFamily="heading" fontWeight={600} >CHITESTRAMUORT</Heading> */}
              <ViewManager />
            </ProjectManagerContextProvider>
          </ViewManagerContextProvider>
        </UserManagerContextProvider>
      </Center>
    </NativeBaseProvider>
  );
}
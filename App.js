import { NativeBaseProvider, VStack, Container, Box, ScrollView, View, Center } from "native-base";

import UserPanel from "./components/users/UserPanel/UserPanel";
import UserManagerContextProvider from "./utils/UserManager";
import ViewManagerContextProvider from "./components/mainView/ViewManagerContextProvider";
import ProjectManagerContextProvider from "./utils/ProjectManager";

import LoginSignupPanel from "./components/users/LoginSignupPanel";
import ViewManager from "./components/mainView/ViewManager";

export default function App() {

  return (
    <NativeBaseProvider>
      <Center h={"100%"} w={"100%"} maxW={1024} mx={"auto"} overflowX={"none"}>
        <UserManagerContextProvider>
          <ViewManagerContextProvider>
            <ProjectManagerContextProvider>
              <ViewManager />
            </ProjectManagerContextProvider>
          </ViewManagerContextProvider>
        </UserManagerContextProvider>
      </Center>
    </NativeBaseProvider>
  );
}
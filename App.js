import { NativeBaseProvider, VStack, Container, Box, ScrollView } from "native-base";

import UserPanel from "./components/users/UserPanel/UserPanel";
import UserManagerContextProvider from "./utils/UserManager";
import ViewManagerContextProvider from "./components/mainView/ViewManagerContextProvider";
import ProjectManagerContextProvider from "./utils/ProjectManager";

import Header from "./components/header/Header";

import LoginSignupPanel from "./components/users/LoginSignupPanel";

export default function App() {

  return (
    <NativeBaseProvider>
      <Box h={"100%"} w={"100%"} maxW={1024} mx={"auto"}>
        <VStack h={"100%"}  >
          <Header />
          <UserManagerContextProvider>
            <ViewManagerContextProvider>
              <ProjectManagerContextProvider>


                <LoginSignupPanel>
                  <UserPanel />
                </LoginSignupPanel>

              </ProjectManagerContextProvider>
            </ViewManagerContextProvider>
          </UserManagerContextProvider>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
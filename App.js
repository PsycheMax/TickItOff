import { NativeBaseProvider, VStack, Container, Box } from "native-base";

import UserPanel from "./components/users/UserPanel/UserPanel";
import UserManager from "./utils/UserManager";
import Header from "./components/header/Header";

import LoginSignupPanel from "./components/users/LoginSignupPanel";

export default function App() {

  return (
    <NativeBaseProvider>
      <Box h={"100%"} w={"100%"} maxW={1024} mx={"auto"}>
        <VStack h={"100%"}  >
          <Header />
          <UserManager>
            <LoginSignupPanel>
              <UserPanel />
            </LoginSignupPanel>
          </UserManager>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
import { NativeBaseProvider, VStack, Container, Box } from "native-base";

import UserPanel from "./components/users/UserPanel";
import UserManager from "./utils/UserManager";
import Header from "./components/header/Header";

import SignUpForm from "./components/users/UserForms/SignUpForm";

export default function App() {

  return (
    <NativeBaseProvider>
      <Box h={"100%"} w={"100%"} maxW={1024} mx={"auto"}>
        <VStack h={"100%"}  >


          <Header />
          <UserManager>
            <SignUpForm />
            {/* <UserPanel /> */}

          </UserManager>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
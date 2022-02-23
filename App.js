import { NativeBaseProvider, VStack, Container } from "native-base";

import UserPanel from "./components/users/UserPanel";
import UserManager from "./utils/UserManager";
import Header from "./components/header/Header";

export default function App() {

  return (
    <NativeBaseProvider>
      <VStack h={"100%"}  >
        <Header />
        <UserManager>
          <UserPanel />

        </UserManager>
      </VStack>
    </NativeBaseProvider>
  );
}
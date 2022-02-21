import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";

import AppManager from "./components/AppManager";
import LoginForm from "./components/userManagement/LoginForm";
import useLoggedUserData from "./components/userManagement/useLoggedUserData";
import UserPanel from './components/userManagement/UserPanel';
import UserManager from "./components/userManagement/UserManager";

export default function App() {


  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <AppManager>
        <UserManager>
          {/* <UserPanel> */}

          {/* </UserPanel> */}
        </UserManager>
        {/* <UserPanel />
        <LoginForm /> */}
      </AppManager>
    </SafeAreaView>
  );
}

import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";

import AppManager from "./components/AppManager";
import LoginForm from "./components/userManagement/LoginForm";
import UserPanel from "./components/userManagement/UserPanel";
import UserManager from "./components/userManagement/UserManager";

export default function App() {


  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <AppManager>
        <UserManager>
          <LoginForm />
          <UserPanel />
        </UserManager>
      </AppManager>
    </SafeAreaView>
  );
}

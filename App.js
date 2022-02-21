import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";

import AppManager from "./components/AppManager";
import LoginForm from "./components/userManagement/LoginForm";
import UserManager from "./components/userManagement/UserManager";
import UserPanel from './components/userManagement/UserPanel';

export default function App() {


  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <AppManager>
        {/* <UserManager /> */}
        <UserPanel />
        <LoginForm />
      </AppManager>
    </SafeAreaView>
  );
}

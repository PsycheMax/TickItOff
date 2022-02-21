import { SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";

import AppManager from "./components/AppManager";
import UserManager from "./components/login/UserManager";

export default function App() {

  return (
    <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
      <AppManager>
        <UserManager />
      </AppManager>
    </SafeAreaView>
  );
}

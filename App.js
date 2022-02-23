import { SafeAreaView, Text, View, StyleSheet, ImageBackground } from "react-native";
import tailwind from "tailwind-rn";
import { NativeBaseProvider } from "native-base";

import AppManager from "./components/AppManager";
import LoginForm from "./components/users/LoginForm";
import UserPanel from "./components/users/UserPanel";
import UserManager from "./utils/UserManager";
import Header from "./components/header/Header";

export default function App() {


  return (
    // <SafeAreaView style={tailwind("flex-1 items-center justify-center")}>
    <NativeBaseProvider>
      <View style={style.appManager}>
        {/* <ImageBackground style={style.imageBG} source={require('./img/first.jpg')}> */}
        <Header />
        <AppManager>

          <UserManager>
            <LoginForm />
            <UserPanel />
          </UserManager>
        </AppManager>
        {/* </ImageBackground> */}
      </View>
    </NativeBaseProvider>
  );
}


const style = StyleSheet.create({
  appManager: {
    backgroundColor: '#FFF',
    height: '100%'
  },
  imageBG: {
    // opacity: 0.8,
    width: '100%',
    height: '100%'
  }
})
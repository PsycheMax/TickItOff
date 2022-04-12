import UserManagerContextProvider from "./utils/UserManager";
import ProjectManagerContextProvider from "./utils/ProjectManager";
import ThemeManagerContextProvider from "./utils/ThemeManager";

import Navigator from "./Navigator";
import PaletteViewer from "./PaletteViewer";
import { View } from "react-native";

export default function App() {

  return (
    <UserManagerContextProvider>
      <ProjectManagerContextProvider>
        <ThemeManagerContextProvider>
          {/* <View style={{ backgroundColor: "red" }}> */}
          <Navigator />
          {/* <PaletteViewer /> */}
          {/* </View> */}
        </ThemeManagerContextProvider>
      </ProjectManagerContextProvider>
    </UserManagerContextProvider>
  );
}
import UserManagerContextProvider from "./utils/UserManager";
import ProjectManagerContextProvider from "./utils/ProjectManager";
import ThemeManagerContextProvider from "./utils/ThemeManager";

import Navigator from "./Navigator";
// import PaletteViewer from "./PaletteViewer";

export default function App() {

  return (
    <UserManagerContextProvider>
      <ProjectManagerContextProvider>
        <ThemeManagerContextProvider>

          <Navigator />
          {/* <PaletteViewer /> */}

        </ThemeManagerContextProvider>
      </ProjectManagerContextProvider>
    </UserManagerContextProvider>
  );
}
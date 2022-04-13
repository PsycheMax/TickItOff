import UserManagerContextProvider from "./utils/UserManager";
import ProjectManagerContextProvider from "./utils/ProjectManager";
import ThemeManagerContextProvider from "./utils/ThemeManager";

import Navigator from "./Navigator";

export default function App() {

  return (
    <UserManagerContextProvider>
      <ProjectManagerContextProvider>
        <ThemeManagerContextProvider>

          <Navigator />

        </ThemeManagerContextProvider>
      </ProjectManagerContextProvider>
    </UserManagerContextProvider>
  );
}
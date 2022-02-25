import React, { useContext } from 'react';
import { IconButton, Center } from 'native-base';
import { LoggedUserContext } from '../../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";

const LogoutButton = (props) => {
    // Context here is necessary to call the login and logout functions
    const context = useContext(LoggedUserContext);

    function handleLogout() {
        context.logoutUserFunc();
    }

    return (

        <Center size="xs" alignSelf={"auto"}>
            <IconButton colorScheme='amber' key="logout" variant="solid" size="sm"
                _icon={{
                    as: MaterialIcons, name: "logout", alignSelf: "center", size: "6"
                }}
                onPress={handleLogout} title={"Logout"}
            />
        </Center>

    )
}


export default LogoutButton;
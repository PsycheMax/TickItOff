import React from 'react';
import { IconButton, Center } from 'native-base';
import { MaterialIcons } from "@native-base/icons";

const EditProfileButton = (props) => {
    // Context here is necessary to call the login and logout functions


    function handleLogout() {
        props.buttonFunction();
    }

    return (

        <Center size="sm" alignSelf={"auto"} ml="5%">
            <IconButton colorScheme='indigo' key="logout" variant="solid" size="sm"
                _icon={{
                    as: MaterialIcons, name: "build", alignSelf: "center"
                }}

                onPress={handleLogout} title={"EditProfile"}
            />
        </Center>

    )
}


export default EditProfileButton;
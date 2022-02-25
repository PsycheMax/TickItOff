import React from 'react';
import { IconButton, Center } from 'native-base';
import { MaterialIcons } from "@native-base/icons";

const GenericIconButton = (props) => {
    // Context here is necessary to call the login and logout functions

    function handleAction() {
        console.log("Pressed!")
        props.onPress();
    }

    return (

        <Center size={props.centerSize} alignSelf={"auto"}>
            <IconButton colorScheme={props.colorScheme} variant="solid" size={props.iconButtonSize}
                _icon={{
                    as: MaterialIcons, name: props.iconName, alignSelf: "center", size: props.iconSize
                }}
                onPress={handleAction} title={props.title}
            />
        </Center>

    )
}

GenericIconButton.defaultProps = {
    onPress: "",
    iconName: "",
    iconSize: "6",
    iconButtonSize: "sm",
    centerSize: "sm",
    colorScheme: "indigo",
    title: "button",
}

export default GenericIconButton;
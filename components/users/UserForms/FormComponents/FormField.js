import React from 'react';
import { Input, FormControl, Icon, Square, IconButton } from 'native-base';
import { MaterialIcons } from "@native-base/icons";


const FormField = (props) => {

    return (
        <FormControl isInvalid={props.isInvalid} isRequired={props.isRequired} >
            <FormControl.Label>{props.text.label}</FormControl.Label>
            <Input
                type={props.type}
                name={props.text.name}
                value={props.value}
                placeholder={props.text.placeholder}
                autocomplete={props.text.placeholder}
                autocorrect={props.autocorrect}
                autofocus={props.autofocus}
                onChangeText={props.onChangeText}
                InputRightElement={
                    props.inputRightElement ? <Square size="8">
                        <IconButton
                            _icon={{ as: MaterialIcons, name: "visibility-off" }}
                            colorScheme='indigo' size="xs" rounded="none" w="full" h="full"

                            onPress={props.showPasswordCommand}>  </IconButton>
                    </Square> : null
                }
            />
            <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name={props.text.iconName} size="xs" />}>
                {props.text.alertMessage}
            </FormControl.ErrorMessage>
            {props.children}
        </FormControl>
    )
}

FormField.defaultProps = {
    text: {
        label: "Form Label",
        name: "Form Name",
        placeholder: "Form Placeholder",
        autocomplete: "form Autocomplete",
        alertMessage: "Alert Message Content",
        iconName: "icon Name"
    },
    type: "text",
    value: "",
    isRequired: false,
    isInvalid: false,
    autocorrect: true,
    autofocus: true,
    onChangeText: "",
    inputRightElement: false,
    showPasswordCommand: ""
}

export default FormField;
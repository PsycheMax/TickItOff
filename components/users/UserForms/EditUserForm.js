import React, { useState, useEffect, useContext } from 'react';
import { VStack, Button, Icon, Center, Box, Heading, FormControl, ScrollView } from 'native-base';
import { LoggedUserContext } from '../../../utils/UserManager';
import { MaterialIcons } from "@native-base/icons";
import FormField from './FormComponents/FormField';

// Move this into some UserAction or UserManagement Context
const inputRules = {
    email: {
        minLength: 8,
        regEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    },
    username: {
        minLength: 8,
        regEx: `^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$`
    },
    password: {
        minLength: 8,
        regEx: ``
    }
}
// Username, PW, EMAIL, IMAGE
const EditUserForm = (props) => {
    // The patchUserObj for the API is {patchedUser:{username:"",email:"", password:"", image:""}}
    const [patchedUser, setPatchedUser] = useState({ email: "", oldPassword: "", password: "", passwordRepeat: "", username: "", image: "" });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [identicalPasswords, setIdenticalPasswords] = useState(false);

    const [initialValueModified, setInitialValueModified] = useState(false);

    const [alertMessages, setAlertMessages] = useState({
        email: {
            show: false,
            content: "Alert goes here"
        },
        oldPassword: {
            show: false,
            content: "Alert goes here"
        },
        password: {
            show: false,
            content: "Alert goes here"
        },
        image: {
            show: false,
            content: "Alert goes here"
        },
        username: {
            show: false,
            content: "Alert goes here"
        },
        genericForm: {
            show: false,
            content: "Alert goes here",
            success: false
        },
    })

    const userDataContext = useContext(LoggedUserContext);

    function checkFields() {
        let toSetInAlertMessages = {};
        toSetInAlertMessages.genericForm = alertMessages.genericForm;
        patchedUser.email.length < inputRules.email.minLength ? toSetInAlertMessages.email = {
            show: true,
            content: `Email must be at least ${inputRules.email.minLength} characters long`
        } : toSetInAlertMessages.email = { show: false, content: "Alert goes here" };
        patchedUser.oldPassword.length < inputRules.password.minLength ? toSetInAlertMessages.oldPassword = {
            show: true,
            content: `Passwords must be at least ${inputRules.password.minLength} characters long`
        } : toSetInAlertMessages.oldPassword = { show: false, content: "Alert goes here" };
        patchedUser.username.length < inputRules.username.minLength ? toSetInAlertMessages.username = {
            show: true,
            content: `Username must be at least ${inputRules.username.minLength} characters long`
        } : toSetInAlertMessages.username = { show: false, content: "Alert goes here" };
        patchedUser.image.length === 0 ? toSetInAlertMessages.image = {
            show: true, content: "Image cannot be empty"
        } : toSetInAlertMessages.image = { show: false, content: "Alert goes here" };
        if (patchedUser.password.length !== 0 && patchedUser.passwordRepeat.length !== 0) {
            patchedUser.password.length < inputRules.password.minLength ? toSetInAlertMessages.password = {
                show: true,
                content: `Passwords must be at least ${inputRules.password.minLength} characters long`
            } : toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        } else {
            toSetInAlertMessages.password = { show: false, content: "Alert goes here" };
        }
        setAlertMessages(toSetInAlertMessages);
    }

    function handleChange(value, fieldName) {
        if (alertMessages.genericForm.show) {
            checkFields();
        }
        setPatchedUser(prevState => { return { ...prevState, [fieldName]: value } });
    }

    useEffect(() => {
        if (!initialValueModified) {
            setInitialValues().then(() => { setInitialValueModified(true) });
        }

        if (patchedUser.password !== null) {
            if (patchedUser.password === patchedUser.passwordRepeat) {
                if (!identicalPasswords) {
                    setIdenticalPasswords(true);
                    setAlertMessages({ ...alertMessages, password: { show: false, content: "Alert goes here" } });
                }
            } else {
                if (identicalPasswords) {
                    setIdenticalPasswords(false);
                    setAlertMessages({ ...alertMessages, password: { show: true, content: "Passwords do not match" } })
                }
            }
        }
    })


    async function handlePatching() {
        let toSetInAlertMessages = alertMessages;
        toSetInAlertMessages.genericForm = { show: false, content: "Alert goes here" };
        if (patchedUser.email.length >= inputRules.email.minLength) {
            if (patchedUser.username.length >= inputRules.username.minLength) {
                if ((patchedUser.password.length === 0 && patchedUser.passwordRepeat.length === 0) || patchedUser.password.length >= inputRules.password.minLength) {
                    if (identicalPasswords) {
                        if (patchedUser.image.length !== 0) {
                            const response = await userDataContext.patchUserFunc(patchedUser, userDataContext.userData._id);
                            if (response.status !== 200) {
                                console.log(response.data);
                                switch (response.status) {
                                    case 401:
                                        toSetInAlertMessages.oldPassword = { show: true, content: response.data, success: false };
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 403:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 404:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                    case 500:
                                    default:
                                        toSetInAlertMessages.genericForm = { show: true, content: response.data, success: false };
                                        break;
                                }
                            } else {
                                toSetInAlertMessages.genericForm = { show: true, content: "You successfully updated your profile", success: true };
                            }
                        } else {
                            toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                        }
                    } else {
                        toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                    }
                } else {
                    toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
                }
            } else {
                toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
            }
        } else {
            toSetInAlertMessages.genericForm = { show: true, content: "Please fill in the form correctly" };
        }
        setAlertMessages(toSetInAlertMessages);
        checkFields();
    }

    async function setInitialValues() {
        if (userDataContext.userData._id !== undefined) {
            let response = await userDataContext.getUserDataFunc(userDataContext.userData._id);
            let toSetInState = response.data;
            toSetInState.oldPassword = "";
            toSetInState.password = "";
            toSetInState.passwordRepeat = "";
            setPatchedUser(toSetInState);
        }
    }

    return (
        <ScrollView maxHeight={"100%"} h={"100%"} mt={"0"} pt={"0"} >
            <VStack h={"100%"} justifyContent={"center"} >
                <Center w="100%">
                    <Box safeArea w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Edit your profile
                        </Heading>

                        <VStack space={3} >
                            <FormField
                                isInvalid={alertMessages.username.show} isRequired={alertMessages.username.show} value={patchedUser.username} type="text"
                                autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "username") }}
                                inputRightElement={false}
                                text={{
                                    label: "Public Username", name: "username", autocomplete: "username", placeholder: "Username", alertMessage: alertMessages.username.content,
                                    iconName: "error"
                                }} >
                            </FormField>
                            <FormField
                                isInvalid={alertMessages.email.show} isRequired={alertMessages.email.show} value={patchedUser.email} type="text"
                                autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "email") }}
                                inputRightElement={false}
                                text={{
                                    label: "Email", name: "email", autocomplete: "email", placeholder: "Email", alertMessage: alertMessages.email.content,
                                    iconName: "error"
                                }} >
                            </FormField>
                            <FormField
                                isInvalid={alertMessages.image.show} isRequired={alertMessages.image.show} value={patchedUser.image} type="text"
                                autocorrect={false} autofocus={true} onChangeText={(value) => { handleChange(value, "image") }}
                                inputRightElement={false}
                                text={{
                                    label: "image", name: "image", autocomplete: "image", placeholder: "image", alertMessage: alertMessages.image.content,
                                    iconName: "error"
                                }} >
                            </FormField>
                            <FormField
                                isInvalid={alertMessages.oldPassword.show} isRequired={alertMessages.oldPassword.show} value={patchedUser.oldPassword}
                                autocorrect={false} autofocus={true} type={showOldPassword ? "text" : "password"}
                                onChangeText={(value) => { handleChange(value, "oldPassword") }} showPasswordCommand={() => { setShowOldPassword(!showOldPassword) }}
                                inputRightElement={true} text={{
                                    label: "Old Password", name: "oldPassword", autocomplete: "password", placeholder: "Old Password", alertMessage: alertMessages.oldPassword.content,
                                    iconName: "error"
                                }} >
                            </FormField>
                            <FormField
                                isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={patchedUser.password}
                                autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
                                onChangeText={(value) => { handleChange(value, "password") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
                                inputRightElement={true} text={{
                                    label: "New Password", name: "password", autocomplete: "password", placeholder: "Password", alertMessage: alertMessages.password.content,
                                    iconName: "error"
                                }} >
                            </FormField>
                            <FormField
                                isInvalid={alertMessages.password.show} isRequired={alertMessages.password.show} value={patchedUser.passwordRepeat}
                                autocorrect={false} autofocus={true} type={showPassword ? "text" : "password"}
                                onChangeText={(value) => { handleChange(value, "passwordRepeat") }} showPasswordCommand={() => { setShowPassword(!showPassword) }}
                                inputRightElement={true} text={{
                                    label: "Repeat New Password", name: "password", placeholder: "Repeat Password", alertMessage: alertMessages.password.content,
                                    iconName: "error"
                                }} >
                            </FormField>

                            <FormControl isInvalid={alertMessages.genericForm.show} >
                                <FormControl.ErrorMessage leftIcon={<Icon as={MaterialIcons} name={alertMessages.genericForm.success ? "check-circle" : "error"} size={alertMessages.genericForm.success ? "sm" : "xs"} />}>
                                    {alertMessages.genericForm.content}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Button mt="2" colorScheme="indigo"
                                onPress={handlePatching} title={"patch"}>
                                Modify User
                            </Button>
                        </VStack>
                    </Box>
                </Center>
            </VStack >
        </ScrollView >
    )
}

export default EditUserForm;
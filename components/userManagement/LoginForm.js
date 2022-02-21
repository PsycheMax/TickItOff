import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useOll } from './UserPanel';

const LoginForm = (props) => {
    // The loginUser for the API is loginUser:{email:"", password:""}
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });

    function handleChange(value, fieldName) {
        console.log(JSON.stringify(loginUser));
        setLoginUser(prevState => { return { ...prevState, [fieldName]: value } })
    }

    function handleSubmit() {
        props.happensOnSubmit();
    }

    return (
        <View>

            <TextInput
                style={{ height: 40 }}
                onChangeText={handleChange}
                name="email"
                value={loginUser.email}
                placeholder="Enter your email"
                autocomplete={"email"}
                autocorrect={false}
                autofocus={true}
                onChangeText={(value) => { handleChange(value, "email") }}

            />
            <TextInput
                style={{ height: 40 }}
                onChangeText={handleChange}
                name="password"
                value={loginUser.password}
                placeholder="Enter your password"
                autocomplete={"password"}
                autocorrect={false}
                onChangeText={(value) => { handleChange(value, "password") }}

            />
            <Button onPress={handleSubmit} title={"Mammeta"} > GLIES </Button>
        </View>
    )
}

LoginForm.defaultProps = {
    happensOnSubmit: () => { console.log("Submitted") }
}

export default LoginForm;
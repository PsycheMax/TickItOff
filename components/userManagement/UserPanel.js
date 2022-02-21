import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import LoginForm from './LoginForm';

const UserPanel = (props) => {
    const [oll, setOll] = useState();

    if (oll === undefined) { setOll("Mammeta"); }

    useEffect(() => {
        setOll("MAMMETA");
        console.log(props.uff1)
        return () => {
            console.log("Second stage");
        }
    }, [console.log("Third stage")])


    return (
        <View>
            <Text>{LoginForm ? LoginForm.mammeta : "NIENTE"}</Text>
            <TextInput>

            </TextInput>
        </View>
    )
}

UserPanel.defaultProps = {
    loggedUserData: undefined
}

export const useOll = function (whatever) {
    const [isItWorking, setIsItWorking] = useState(null);

    function doMath(number) {
        setIsItWorking(number + whatever);
    }
    useEffect(() => {
        if (isItWorking === null) {
            doMath(22);
        }
        return () => {
            doMath(32);
        }
    })

    return isItWorking;
}

export default UserPanel;


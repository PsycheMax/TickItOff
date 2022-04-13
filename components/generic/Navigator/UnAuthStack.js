import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginForm from '../../users/UserForms/LoginForm';
import SignUpForm from '../../users/UserForms/SignUpForm';
import SplashScreen from '../SplashScreen';
import Page404 from '../Page404';

export default function UnAuthStack(props) {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Home" component={LoginForm} />
            <Stack.Screen name="SignUp" component={SignUpForm} />
            <Stack.Screen name='404' component={Page404} />

        </Stack.Navigator>
    );
}
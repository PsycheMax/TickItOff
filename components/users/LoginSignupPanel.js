import React, { useState, useContext } from 'react';

import { LoggedUserContext } from '../../utils/UserManager';
import LoginForm from './UserForms/LoginForm';
import SignUpForm from './UserForms/SignUpForm';

const LoginSignupPanel = (props) => {

    const loggedUser = useContext(LoggedUserContext).userData;
    const [showLogin, useShowLogin] = useState(true);

    function showOtherForm() {
        useShowLogin(!showLogin);
    }

    console.log(props);
    console.log(props.navigation.navigate)
    return (
        <React.Fragment>
            {loggedUser._id && loggedUser._id !== "" ? props.children
                : showLogin ? <LoginForm navigation={props.navigation} showOtherFormFunc={showOtherForm} /> : <SignUpForm navigation={props.navigation} showOtherFormFunc={showOtherForm} />}

        </React.Fragment>
    )
}

export default LoginSignupPanel;
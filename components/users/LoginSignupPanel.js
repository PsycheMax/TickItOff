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

    return (
        <React.Fragment>
            {loggedUser._id && loggedUser._id !== "" ? props.children
                : showLogin ? <LoginForm showOtherFormFunc={showOtherForm} /> : <SignUpForm showOtherFormFunc={showOtherForm} />}

        </React.Fragment>
    )
}

export default LoginSignupPanel;
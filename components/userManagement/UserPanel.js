import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { axiosGet } from '../../utils/APIManager';
import LoginForm from './LoginForm';
// import useLoggedUserData from './useLoggedUserData';
import { LoggedUserContext } from './UserManager';

const UserPanel = (props) => {

    const [userData, setUserData] = useState();

    const context = useContext(LoggedUserContext);

    // let loggedUserData = useLoggedUserData();
    useEffect(() => {
        // setUserData(loggedUserData);
        return () => {
            // Called when component destroyed

        }
    }, [])

    function renderProjects() {
        // return useLoggedUserData(false).projects
        return "CULO";
    }

    return (
        <View>
            <Text>UserPanel</Text>
            <Text>
                {/* {JSON.stringify(axiosGet("/user/620fd2edc7effb0abb07ccbf"))} */}
                {/* Welcome {loggedUserData.username}, this is your user Panel <br />
                Here you can find a list of your projects:
                {renderProjects()}
                <br />
                {userData} */}

                {context.jwtToken}
            </Text>
        </View>
    )
}

UserPanel.defaultProps = {
    loggedUserData: undefined
}

export default UserPanel;


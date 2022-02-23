import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StylesContext } from '../AppManager';
import { LoggedUserContext } from '../../utils/UserManager';
import ProfilePicture from './ProfilePicture';
import UserMenu from './UserMenu';

const UserPanel = (props) => {

    const [menuOpen, useMenuOpen] = useState(true);

    const loggedUser = useContext(LoggedUserContext);
    const basicStyle = useContext(StylesContext);

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
        <View style={styles.userPanel}>
            <View style={styles.topContainer}>
                <ProfilePicture source={loggedUser.userData.image} /><Text style={StyleSheet.compose(basicStyle.base.typography, styles.userName)}>
                    {/* {context.userData.username} */}
                    {menuOpen ? <UserMenu username={loggedUser.userData.username} /> : "Figa"}
                </Text>
            </View>

            {/* <Text style={basicStyle.base.typography}>{context.userData.image}</Text> */}

            {/* <Text style={basicStyle.base.typography}>
                {context.jwtToken ? context.userData.username : ""}

                {context.jwtToken ? Date(context.userData.lastOnline) : ""}
            </Text> */}
        </View>
    )
}

UserPanel.defaultProps = {
    loggedUserData: undefined
}

const styles = StyleSheet.create({
    userPanel: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 15,
        marginTop: 15,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: 'center'

    },
    userName: {
        marginLeft: 5,
        paddingLeft: 5,
    }
})

export default UserPanel;


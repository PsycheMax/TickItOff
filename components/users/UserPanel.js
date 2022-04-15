import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../utils/ThemeManager';
import { LoggedUserContext } from '../../utils/UserManager';

import EditUserForm from './UserForms/EditUserForm';
import { CommonActions } from '@react-navigation/native';

const UserPanel = (props) => {

    const [logoutButtonTouched, setLogoutButtonTouched] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const userDataContext = useContext(LoggedUserContext);

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        coloredBackground: {
            backgroundColor: theme.colors.primary[500]
        },
        roundBot: {
            borderBottomEndRadius: 100,
            borderBottomStartRadius: 100
        },
        roundTop: {
            borderTopEndRadius: 100,
            borderTopStartRadius: 100
        },
        pageContainer: {
            width: "100%",
            alignItems: "center",
            paddingBottom: 20,
            flex: 1,
            minHeight: "100%"
        },
        logoutContainer: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            marginVertical: theme.dimensions.methods.moderateVerticalScale(24)
        },
        whiteText: {
            color: theme.colors.secondary[50],
        },
        logoutText: {
            fontSize: Platform.OS === "web" ? 24 : 18,
            fontWeight: "600",
        },
        iconContainer: {
            backgroundColor: logoutButtonTouched ? theme.colors.tertiary[700] : theme.colors.tertiary[500],
            width: "35%",
            minWidth: 120,
            height: 64,
            minHeight: 64,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            width: 26,
            height: 26,

        },
        ...theme.styles.modal
    })

    async function onLogoutConfirm() {
        await userDataContext.logoutUserFunc();
        props.navigation.navigate('Home');
    }


    // The following object is a NavigationState for React Navigation, to be used with the command RESET https://reactnavigation.org/docs/navigation-actions/#reset 
    const artificialNavState = { "stale": true, "routes": [{ "name": "Home" }, { "name": "UserPanel" }] }

    // The following useEffect runs only on componentLoad
    useEffect(() => {
        // It checks the navigation state
        let navState = props.navigation.getState();
        // IF the navigation state is not as "artificialNavState" (when it comes to pages visited)
        if (navState.routes[0].name !== artificialNavState.routes[0].name || navState.routes[1].name !== artificialNavState.routes[1].name) {
            // It sets a new state, corresponding to the wanted NavigationState
            props.navigation.dispatch((state) => {
                return CommonActions.reset(artificialNavState);
            })
        }

    }, [])

    // This dirty trick was necessary to make sure that on android the page is scrollable, but on Web the background is rendered properly
    function renderContent() {
        return (<>
            <View style={[styles.coloredBackground, styles.roundBot, styles.roundTop]}>
                <EditUserForm />
                <View style={styles.logoutContainer}>
                    <TouchableOpacity onPress={() => { setShowLogoutModal(true) }} >
                        <View style={styles.iconContainer}
                            onTouchStart={() => { setLogoutButtonTouched(true) }}
                            onTouchEnd={() => { setLogoutButtonTouched(false) }}
                            onTouchCancel={() => { setLogoutButtonTouched(false) }} >
                            {/* <MaterialIcons name='logout' color={theme.colors.secondary[100]} size={27} style={styles.icon} />*/}
                            <Text style={[styles.whiteText, styles.logoutText]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={showLogoutModal} transparent={true} >

                <View style={styles.modalCenteredView}>
                    <View style={styles.backgroundForModal}>
                    </View>
                    <View style={styles.modalWindow}>
                        <Text style={styles.modalText} >Want to logout?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity onPress={onLogoutConfirm} >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.tertiary[500] }]}>
                                    <Text style={styles.modalText} >Yes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowLogoutModal(false) }} >
                                <View style={[styles.modalButtons, { backgroundColor: theme.colors.secondary[500] }]}>
                                    <Text style={styles.modalText} >No</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
        )
    }

    // Based on the User's device, it will either render a View (for web, it has the proper background) or a Scrollview for android
    return (
        Platform.OS === "web" ?
            <View contentContainerStyle={[styles.pageContainer, styles.coloredBackground]}>
                {renderContent()}
            </View>
            :
            <ScrollView contentContainerStyle={styles.pageContainer}>
                {renderContent()}
            </ScrollView>
    )
}

export default UserPanel;
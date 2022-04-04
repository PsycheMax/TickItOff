import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../../utils/ThemeManager';
import { LoggedUserContext } from '../../../utils/UserManager';

import EditUserForm from '../UserForms/EditUserForm';

const UserPanel = (props) => {

    const [logoutButtonTouched, setLogoutButtonTouched] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const userDataContext = useContext(LoggedUserContext);

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        pageContainer: {
            // height: "100%",
            width: "100%",
            backgroundColor: theme.colors.primary[700],
            alignItems: "center"
        },
        logoutContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginVertical: theme.dimensions.methods.moderateVerticalScale(24)
        },
        whiteText: {
            color: theme.colors.secondary[100],
            fontSize: theme.dimensions.methods.moderateScale(24),
            marginBottom: theme.dimensions.methods.moderateScale(16)
        },
        iconContainer: {
            backgroundColor: logoutButtonTouched ? theme.colors.tertiary[700] : theme.colors.tertiary[500],
            width: "35%",
            minWidth: theme.dimensions.methods.moderateScale(120),
            height: theme.dimensions.methods.moderateScale(32),
            minHeight: theme.dimensions.methods.moderateScale(32),
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            width: 26,
            height: 26,

        },
        backgroundForModal: {
            backgroundColor: theme.colors.primary[800],
            opacity: 0.4,
            width: theme.dimensions.screenWidth,
            height: theme.dimensions.screenHeight,
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalWindow: {
            position: "relative",
            zIndex: 10,
            margin: 20,
            backgroundColor: theme.colors.secondary[300],
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        modalButtonsContainer: {
            flexDirection: "row",
            marginTop: theme.dimensions.methods.moderateScale(16)
        },
        modalButtons: {
            paddingHorizontal: theme.dimensions.methods.moderateScale(24),
            paddingVertical: theme.dimensions.methods.moderateScale(18),
            marginHorizontal: theme.dimensions.methods.moderateScale(12),
            borderRadius: 50
        },
        modalText: {
            fontSize: theme.dimensions.methods.moderateScale(18),
            color: theme.colors.primary[50]
        }
    })

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>


            <EditUserForm />

            <View style={styles.logoutContainer}>
                <Text style={styles.whiteText}>Logout</Text>
                <TouchableOpacity onPress={() => { setShowLogoutModal(true) }} >
                    <View style={styles.iconContainer}
                        onTouchStart={() => { setLogoutButtonTouched(true) }}
                        onTouchEnd={() => { setLogoutButtonTouched(false) }}
                        onTouchCancel={() => { setLogoutButtonTouched(false) }} >
                        <MaterialIcons name='logout' color={theme.colors.secondary[100]} size={27} style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <Modal visible={showLogoutModal} transparent={true} >

                    <View style={styles.centeredView}>
                        <View style={styles.backgroundForModal}>
                        </View>
                        <View style={styles.modalWindow}>
                            <Text style={styles.modalText} >Want to logout?</Text>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity onPress={userDataContext.logoutUserFunc} >
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

            </View>

        </ScrollView>
    )
}

export default UserPanel;
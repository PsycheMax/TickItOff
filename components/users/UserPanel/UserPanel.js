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
        ...theme.styles.modal
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

                    <View style={styles.modalCenteredView}>
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
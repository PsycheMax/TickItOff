import React, { useContext } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';

import { ThemeContext } from '../../../utils/ThemeManager';

const ProfilePicture = (props) => {

    const theme = useContext(ThemeContext);
    var imageSource = (Platform.OS === "android") ? { uri: props.source } : props.source;

    var styles = StyleSheet.create({
        profilePictureContainer: {
            backgroundColor: theme.colors.secondary[500],

            // height: theme.dimensions.methods.scale(60),
            maxHeight: 70,
            height: 70,

            // width: theme.dimensions.methods.scale(60),
            maxWidth: 70,
            width: 70,

            borderRadius: 100,

            justifyContent: "center",
            alignItems: "center"
        },
        profilePicture: {
            width: "100%",
            height: "100%",
            borderRadius: 100
        }
    })

    return (
        <View style={styles.profilePictureContainer} >
            <Image source={imageSource} style={styles.profilePicture} />
        </View>
    )
}

ProfilePicture.defaultProps = {
    source: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "Default Username"
}

export default ProfilePicture;
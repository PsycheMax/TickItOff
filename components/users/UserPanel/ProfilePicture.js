import React, { useContext } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';

import { ThemeContext } from '../../../utils/ThemeManager';

const ProfilePicture = (props) => {

    const theme = useContext(ThemeContext);

    const URISource = `https://identicon-api.herokuapp.com/${props.username}/${props.size}?format=png`;
    var imageSource = (Platform.OS === "android") ? { uri: URISource } : URISource;

    var styles = StyleSheet.create({
        profilePictureContainer: {
            backgroundColor: theme.colors.secondary[50],

            // height: theme.dimensions.methods.scale(60),
            maxHeight: props.size,
            height: props.size,

            // width: theme.dimensions.methods.scale(60),
            maxWidth: props.size,
            width: props.size,

            borderRadius: 100,


            padding: 3,
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
    username: "Default_Username",
    size: 50
}

export default ProfilePicture;
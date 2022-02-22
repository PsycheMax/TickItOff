import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilePicture = (props) => {

    return (
        <Image
            accessibilityLabel={`Profile picture for user ${props.username}`}
            source={props.source}
            style={styles.avatar}
        />
    )
}

ProfilePicture.defaultProps = {
    source: "https://randomuser.me/api/portraits/med/men/75.jpg",
    username: "Default Username"
}

const styles = StyleSheet.create({
    avatar: {
        width: 66,
        height: 66,
        borderRadius: 66 / 2,
        margin: 10,

    }
})

export default ProfilePicture;
import React, { useContext } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { ThemeContext } from '../../../utils/ThemeManager';
// import { Avatar, PresenceTransition, Text } from 'native-base';


const ProfilePicture = (props) => {

    const theme = useContext(ThemeContext);
    var imageSource = (Platform.OS === "android") ? { uri: props.source } : props.source;

    var styles = StyleSheet.create({
        profilePictureContainer: {
            backgroundColor: theme.colors.secondary[500],

            height: theme.dimensions.methods.scale(80),
            maxHeight: 100,

            width: theme.dimensions.methods.scale(80),
            maxWidth: 100,

            borderRadius: 100
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
            {/* <PresenceTransition w="100%" visible={props.makeItBigger} initial={{ scale: 0.66 }}
                animate={{ scale: 1, transition: { duration: 250, overshootClamping: true, bounciness: 5, stiffness: 5 } }}>
                <Avatar
                    source={image}
                    _android={{ source: { uri: image.uri } }}
                    bg="indigo.500"
                    size="xl"
                    borderRadius={100} borderColor={"muted.400"} borderWidth={props.makeItBigger ? "1" : "2"}
                    alt={`Profile picture for user ${props.username}`
                    }
                >
                    {props.username.slice(0, 3)};
                </Avatar >
            </PresenceTransition> */}
        </View>
    )
}

ProfilePicture.defaultProps = {
    source: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "Default Username"
}

export default ProfilePicture;
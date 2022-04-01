import React from 'react';
import { Avatar, PresenceTransition, Text } from 'native-base';

const ProfilePicture = (props) => {

    var image = { uri: props.source }

    return (
        <PresenceTransition w="100%" visible={props.makeItBigger} initial={{ scale: 0.66 }}
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
        </PresenceTransition>
    )
}

ProfilePicture.defaultProps = {
    source: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "Default Username"
}

export default ProfilePicture;
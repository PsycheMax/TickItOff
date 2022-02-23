import React from 'react';
import { Avatar } from 'native-base';

const ProfilePicture = (props) => {

    return (
        <Avatar
            source={{ uri: props.source }}
            bg="green.500"
            size="lg"
            borderRadius={50} margin={5} borderWidth="1" borderColor={"muted.400"}
            alt={`Profile picture for user ${props.username}`
            }
        >
            {props.username.slice(0, 3)};
        </Avatar >
    )
}

ProfilePicture.defaultProps = {
    source: "https://randomuser.me/api/portraits/lego/3.jpg",
    username: "Default Username"
}

export default ProfilePicture;
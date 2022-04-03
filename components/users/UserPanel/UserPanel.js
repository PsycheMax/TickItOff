import React, { useContext } from 'react';
import { Center, Text } from 'native-base';

import EditUserForm from '../UserForms/EditUserForm';
import GenericIconButton from '../UserForms/FormComponents/GenericIconButton';

const UserPanel = (props) => {

    return (
        <React.Fragment>
            {/*  _web={{ pt: 25 }} pt={"5%"} */}

            <EditUserForm />

            <Center>
                <Text>Logout</Text>
                <GenericIconButton
                    onPress={props.navigate("LogoutView")}
                    iconName={"logout"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                    colorScheme={"amber"} key={"Logout"} title={"Logout"} />
            </Center >


        </React.Fragment>
    )
}

export default UserPanel;
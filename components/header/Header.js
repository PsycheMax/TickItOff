import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = (props) => {

    return (
        <View>

            <Text style={styles.view}>Shopping List</Text>

        </View>
    )
}

Header.defaultProps = {
    loggedUserData: undefined
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 2,
        color: '#FFFFFF',
        paddingTop: 25
    },
    text: {

    }
})

export default Header;


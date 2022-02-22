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
        fontSize: 20,
        color: '#FFFFFF',
        backgroundColor: '#674359',
        paddingTop: 25
    },
    text: {

    }
})

export default Header;


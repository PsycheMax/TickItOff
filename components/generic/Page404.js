import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../../utils/ThemeManager';
import Logo from '../logo/Logo';

const Page404 = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        centralContainer: {
            height: theme.dimensions.windowHeight,
            maxHeight: theme.dimensions.windowHeight,
            minHeight: theme.dimensions.windowHeight,
            width: theme.dimensions.windowWidth,
            minWidth: theme.dimensions.windowWidth,
            maxWidth: theme.dimensions.windowWidth,
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center"
        }
    })

    return (
        <View style={[styles.centralContainer]}>
            <Logo color="color" size="full" />
            <TouchableOpacity
                onPress={props.navigation.navigate.bind(this, 'Home')}
            >
                <Text>Something went wrong</Text>
                <Text>The page you are looking for does not exist.</Text>
                <Text>Click here to go to the homepage</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Page404;
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../../utils/ThemeManager';
import LoadingSpinner from './LoadingSpinner';
import Logo from '../logo/Logo';

import { useLinkTo } from '@react-navigation/native';
import { LoggedUserContext } from '../../utils/UserManager';

const Page404 = (props) => {

    const theme = useContext(ThemeContext);
    const linkTo = useLinkTo();

    const { userData } = useContext(LoggedUserContext);

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
                onPress={() => {
                    userData && userData.token && userData.token.length > 10
                        ? props.navigation.navigate('Home')
                        : props.navigation.navigate('Login')
                }}
            >
                <Text>Something went wrong</Text>
                <Text>The page you are looking for does not exist.</Text>
                <Text>Click here to go to the homepage</Text>
            </TouchableOpacity>
            {/* <LoadingSpinner /> */}
        </View>
    )
}

Page404.defaultProps = {
    shouldRedirect: true
}

export default Page404;


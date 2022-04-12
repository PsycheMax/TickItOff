import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../../utils/ThemeManager';
import LoadingSpinner from './LoadingSpinner';
import Logo from '../logo/Logo';

const SplashScreen = (props) => {

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

    useEffect(() => {
        if (props.shouldRedirect) {
            console.log(props.navigation)
            let toCancel = () => {
                return setTimeout(() => {
                    props.navigation.navigate('Login');
                }, 1200)
            };
            toCancel();

            return clearTimeout(toCancel);
        }
    }, [])

    return (
        <View style={[styles.centralContainer]}>
            <Logo color="color" size="full" />
            <LoadingSpinner />
        </View>
    )
}

SplashScreen.defaultProps = {
    shouldRedirect: true
}

export default SplashScreen;


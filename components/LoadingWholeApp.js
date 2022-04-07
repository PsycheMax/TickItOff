import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../utils/ThemeManager';
import LoadingSpinner from './LoadingSpinner';

const LoadingWholeApp = (props) => {

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
            alignItems: "center"
        }
    })

    useEffect(() => {
        let toCancel = setTimeout(() => {
            props.navigation.navigate('Login');
        }, 1000);
        return clearTimeout(toCancel);
    }, [])

    return (
        <View style={[styles.centralContainer]}>
            <LoadingSpinner />
        </View>
    )
}

export default LoadingWholeApp;


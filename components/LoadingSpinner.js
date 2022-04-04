import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../utils/ThemeManager';

const LoadingSpinner = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            width: theme.dimensions.methods.moderateScale(32),
            heigth: theme.dimensions.methods.moderateScale(32)
        }
    })

    return (

        <View>
            <ActivityIndicator size="large" color={props.color ? props.color : theme.colors.primary[500]} />
        </View>
    )
}

export default LoadingSpinner;


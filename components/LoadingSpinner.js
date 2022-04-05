import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ThemeContext } from '../utils/ThemeManager';

const LoadingSpinner = (props) => {

    const theme = useContext(ThemeContext);

    return (
        <View>
            <ActivityIndicator size="large" color={props.color ? props.color : theme.colors.primary[500]} />
        </View>
    )
}

export default LoadingSpinner;


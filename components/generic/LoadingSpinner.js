import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ThemeContext } from '../../utils/ThemeManager';

const LoadingSpinner = (props) => {

    const theme = useContext(ThemeContext);

    return (
        <View>
            <ActivityIndicator size={props.size ? props.size : "large"} color={props.color ? props.color : theme.colors.primary[500]}
                style={{ marginTop: props.marginTop ? props.marginTop : 0 }}
            />
        </View>
    )
}

export default LoadingSpinner;


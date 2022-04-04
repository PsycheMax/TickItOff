import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../utils/ThemeManager';

const StandardDivider = (props) => {

    const theme = useContext(ThemeContext);
    const { scale } = theme.dimensions.methods;

    const styles = StyleSheet.create({
        standardDivider: {
            backgroundColor: props.color ? props.color : theme.colors.primary[500],
            display: props.display ? props.display : "flex",
            width: scale(48),
            maxWidth: scale(48),
            height: scale(8),
            marginVertical: scale(6.4)
        }
    })

    return (
        <View style={styles.standardDivider} ></View>

    )
}

export default StandardDivider;
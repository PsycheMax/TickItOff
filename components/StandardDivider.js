import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../utils/ThemeManager';

const StandardDivider = (props) => {

    const theme = useContext(ThemeContext);
    const { moderateScale } = theme.dimensions.methods;

    const styles = StyleSheet.create({
        standardDivider: {
            backgroundColor: props.color ? props.color : theme.colors.primary[500],
            display: props.display ? props.display : "flex",
            width: moderateScale(48),
            maxWidth: 80,
            height: moderateScale(8),
            maxHeight: 32,
            marginVertical: moderateScale(6.4)
        }
    })

    return (
        <View style={styles.standardDivider} ></View>

    )
}

export default StandardDivider;
import React from 'react';
import { Divider } from 'native-base';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const StandardDivider = (props) => {
    return (
        <Divider bg={props.color} w={scale(48)} maxW={scale(48)} h={scale(8)} my={scale(6.4)} display={props.display} />
    )
}

StandardDivider.defaultProps = {
    color: "primary.500",
    display: "flex"
}
export default StandardDivider;
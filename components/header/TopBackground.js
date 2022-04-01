import React, { useContext } from 'react';
import { useWindowDimensions, Dimensions } from 'react-native';
import { Center, Pressable, Flex, Box, Image, Text } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const bgpic = require('../../img/header/mob_top-menu-bg.png');

const TopBackground = (props) => {

    // const { height } = useWindowDimensions();
    const height = Dimensions.get('window').height;

    return (
        <React.Fragment>

            {/* <Image position={"absolute"} top={0} left={0}
                source={{ uri: bgpic }} w={"100%"} h={0.16 * height} maxH={"200px"}
                resizeMode={"stretch"} zIndex={0} alt={"Background image"}
            /> */}

            <Box h={scale(150)} w={"100%"} zIndex={0} borderBottomRadius={scale(110)} backgroundColor={"primary.500"}>

            </Box>

        </React.Fragment>


    )
}

export default TopBackground;
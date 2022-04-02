import React, { useContext } from 'react';
import { Center, Pressable, Flex, Box, Image } from 'native-base';

import { LoggedUserContext } from '../../utils/UserManager';
import { ViewManagerContext } from '../mainView/ViewManagerContextProvider';
import { ProjectContext } from '../../utils/ProjectManager';

import ProfilePicture from '../users/UserPanel/ProfilePicture';
import Logo from '../logo/Logo';
import TopBackground from './TopBackground';

const bgpic = require('../../img/header/mob_top-menu-bg.png');
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const TopMenu = (props) => {

    const ProjectFunctions = useContext(ProjectContext);
    const ViewFunctions = useContext(ViewManagerContext);
    const LoggedUserData = useContext(LoggedUserContext).userData;

    async function goToProjectSelector() {
        await ProjectFunctions.setCurrentProjectDataFunc(null);
        await ViewFunctions.changeCurrentViewTo("ProjectSelector");
    }

    async function goToUserPanel() {
        await ViewFunctions.changeCurrentViewTo('UserPanel');
    }

    return (
        <React.Fragment>

            <Flex direction="row" align={"flex-start"} justify={"flex-start"}
                position={"absolute"} top={"0"} left={0} w={"100%"} zIndex={10}>

                <Pressable flexGrow={1} onPress={goToProjectSelector}>
                    <Center>
                        <Logo color={"white"} size={"small"} />
                    </Center>
                </Pressable>
                <Box flexGrow="8"></Box>
                {LoggedUserData && LoggedUserData.image && LoggedUserData.image.length > 0 ?
                    <Pressable flexGrow={1} _web={{ pl: "3%", pt: "1%" }} onPress={goToUserPanel}>
                        <Center>
                            <ProfilePicture source={LoggedUserData.image} />
                        </Center>
                    </Pressable>
                    : <React.Fragment></React.Fragment>}
            </Flex >

            {/* <Image position={"absolute"} top={0} left={0}
                source={{ uri: bgpic }} w={"100%"} h={0.16 * height} maxH={"200px"}
                resizeMode={"stretch"} zIndex={0} alt={"Background image"}
            /> */}
            {/* <Box h={scale(150)} w={"100%"} zIndex={0} position={"absolute"} top={0} left={0} borderBottomRadius={scale(110)} backgroundColor={"primary.500"}></Box> */}
            <TopBackground />

        </React.Fragment>


    )
}

export default TopMenu;
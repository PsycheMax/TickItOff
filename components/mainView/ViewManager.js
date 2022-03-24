import React, { useContext } from 'react';
import { Center, Image, View } from 'native-base';

const bgpic = require('../../img/header/mob_top-menu-bg.png');

import { ViewManagerContext } from './ViewManagerContextProvider';
import TopMenu from '../header/TopMenu';

const ViewManager = (props) => {

    const ViewContext = useContext(ViewManagerContext);

    return (
        <React.Fragment>
            {/* <Image position={"absolute"} top={0} left={0} source={{ uri: bgpic }} w={"100%"} h={"20%"} resizeMode={"stretch"} zIndex={0} alt={"background image"} ></Image> */}
            <TopMenu />
            <Center position={"absolute"} top={"20%"} zIndex={1}>
                {ViewContext.renderCurrentView()}
            </Center>
        </React.Fragment>
    )
}

export default ViewManager;


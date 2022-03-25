import React, { useContext } from 'react';
import { Center, Image, View } from 'native-base';

import { ViewManagerContext } from './ViewManagerContextProvider';
import TopMenu from '../header/TopMenu';

const ViewManager = (props) => {

    const ViewContext = useContext(ViewManagerContext);

    return (
        <React.Fragment>
            <TopMenu />
            <Center position={"absolute"} top={0.18 * screen.height} zIndex={1} maxW={976} w={"100%"} px={"0.5rem"}>
                {ViewContext.renderCurrentView()}
            </Center>
        </React.Fragment>
    )
}

export default ViewManager;


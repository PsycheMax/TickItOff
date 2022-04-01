import React, { useContext, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { Center } from 'native-base';

import { ViewManagerContext } from './ViewManagerContextProvider';
import TopMenu from '../header/TopMenu';
import LoadingSpinner from '../LoadingSpinner';

const ViewManager = (props) => {

    const { height } = useWindowDimensions();

    const [Loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])


    const ViewContext = useContext(ViewManagerContext);


    return (
        <React.Fragment>

            <TopMenu />
            <Center position={"absolute"} top={0.18 * height} zIndex={1} maxW={976} w={"100%"} px={"0.5rem"}>
                {Loaded ? ViewContext.renderCurrentView() : <LoadingSpinner />}
            </Center>
        </React.Fragment>
    )
}

export default ViewManager;
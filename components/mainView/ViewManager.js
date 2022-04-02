import React, { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import { Center, View } from 'native-base';

import { ViewManagerContext } from './ViewManagerContextProvider';
import TopMenu from '../header/TopMenu';
import LoadingSpinner from '../LoadingSpinner';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const ViewManager = (props) => {

    const screenHeight = Dimensions.get('window').height;

    const [Loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])


    const ViewContext = useContext(ViewManagerContext);


    return (
        <View h={screenHeight - (screenHeight * 0.18)} backgroundColor="secondary.50">


            <TopMenu />
            <Center position={"absolute"} top={(screenHeight * 0.18)} zIndex={1} maxW={scale(976)} w={"100%"} px={scale(8)}
                h={screenHeight - (screenHeight * 0.18)}
                _web={{ style: { top: screenHeight * 0.22 } }}
            >
                {Loaded ? ViewContext.renderCurrentView() : <LoadingSpinner />}
            </Center>
        </View>
    )
}

export default ViewManager;
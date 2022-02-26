import React, { useState, useEffect, useContext } from 'react';
import { Box, ScrollView } from 'native-base';

import { ViewManagerContext } from './ViewManagerContextProvider';

const ViewManager = (props) => {

    const ViewContext = useContext(ViewManagerContext);

    return (
        <ScrollView>
            {ViewContext.renderCurrentView()}
        </ScrollView>
    )
}

export default ViewManager;


import React, { useState, useEffect, useContext } from 'react';
import { Box, ScrollView } from 'native-base';

import { ViewManagerContext } from './ViewManagerContextProvider';

const ViewManager = (props) => {

    const ViewContext = useContext(ViewManagerContext);

    return (
        <React.Fragment>
            {ViewContext.renderCurrentView()}
        </React.Fragment>
    )
}

export default ViewManager;


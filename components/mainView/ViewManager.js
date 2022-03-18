import React, { useContext } from 'react';

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


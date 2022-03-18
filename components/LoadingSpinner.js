import React from 'react';
import { HStack, Heading, Spinner } from 'native-base';

const LoadingSpinner = (props) => {

    return (
        <React.Fragment>
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </React.Fragment>
    )
}

export default LoadingSpinner;


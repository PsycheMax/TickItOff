import React, { useState, useEffect, useContext } from 'react';
import { Button, Center, HStack, Text, VStack, Heading } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';

const LogoutView = (props) => {

    const userFunctionContext = useContext(LoggedUserContext);

    return (
        <Center h={"100%"} maxH={"100%"} width="100%" minW={"100%"} pt={"50%"} _web={{ pt: "25%" }} >
            <VStack maxW="290" _web={{ maxW: "50%" }}>
                <Heading size="lg">Do you want to log out?</Heading>
                <HStack w="100%" pt={"10%"}>
                    <Center w="50%">
                        <Button size="lg" colorScheme='primary' mx="2" py="5" px="8" borderRadius={"100"} w="100"
                            onPress={() => { userFunctionContext.logoutUserFunc() }}>
                            Yes
                        </Button>
                    </Center>
                    <Center w="50%">
                        <Button size="lg" colorScheme='primary' mx="2" py="5" px="8" borderRadius={"100"} w="100"
                            onPress={() => { props.navigation.goBack() }}>
                            No
                        </Button>
                    </Center>
                </HStack>
            </VStack>
        </Center>
    )
}

export default LogoutView;
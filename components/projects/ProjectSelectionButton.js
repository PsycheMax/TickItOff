import React from 'react';
import { Heading, Pressable, Flex, Divider, Text } from 'native-base';

const ProjectSelectionButton = (props) => {

    return (
        <Pressable onPress={props.selectProjectFunc}>
            <Flex direction={"column"} wrap={"nowrap"} justifyContent={"start"} alignContent={"start"} backgroundColor={props.bgColor}
                borderRadius={"lg"} h={"6rem"} maxH={"6rem"} mt={"1rem"}
                px={"1rem"} pt={"0.5rem"}
            >
                <Heading color={"secondary.50"} overflowWrap={"nowrap"} noOfLines={1} >{props.name}</Heading>
                <Divider bg="tertiary.500" w={"3rem"} maxW={"3rem"} h={"0.5rem"} />
                <Text color={"secondary.50"} noOfLines={1} overflowWrap={"nowrap"}
                    display={props.description ? "block" : "none"}>{props.description ? props.description : null}</Text>
            </Flex>
        </Pressable>)
}

export default ProjectSelectionButton;
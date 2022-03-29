import React from 'react';
import { Heading, Pressable, Flex, Divider, Text } from 'native-base';
import StandardDivider from '../StandardDivider';

const ProjectSelectionButton = (props) => {

    return (
        <Pressable onPress={props.selectProjectFunc}>
            <Flex direction={"column"} wrap={"nowrap"} justifyContent={"start"} alignContent={"start"} backgroundColor={props.bgColor}
                borderRadius={"lg"} h={"6rem"} maxH={"6rem"} mt={"1rem"}
                px={"1rem"} pt={"0.5rem"}
            >
                <Heading color={"secondary.50"} overflowWrap={"nowrap"} noOfLines={1} isTruncated >{props.name}</Heading>
                <StandardDivider color={"tertiary.500"} />
                <Text color={"secondary.50"} noOfLines={1} overflowWrap={"nowrap"}
                    display={props.description ? "block" : "none"}>{props.description ? props.description : null}</Text>
            </Flex>
        </Pressable>)
}

export default ProjectSelectionButton;
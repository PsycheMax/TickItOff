import React from 'react';
import { Heading, Pressable, Flex, Divider, Text } from 'native-base';
import StandardDivider from '../StandardDivider';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const ProjectSelectionButton = (props) => {

    return (
        <Pressable onPress={props.selectProjectFunc}>
            <Flex direction={"column"} wrap={"nowrap"} backgroundColor={props.bgColor}
                borderRadius={"lg"} h={scale(96)} maxH={scale(96)} mt={scale(16)}
                px={scale(16)} pt={scale(8)}
            >
                <Heading color={"secondary.50"} overflowWrap={"nowrap"} noOfLines={1} isTruncated >{props.name}</Heading>
                <StandardDivider color={"tertiary.500"} />
                <Text color={"secondary.50"} noOfLines={1} overflowWrap={"nowrap"}
                    display={props.description ? "flex" : "none"}>{props.description ? props.description : null}</Text>
            </Flex>
        </Pressable>)
}

export default ProjectSelectionButton;
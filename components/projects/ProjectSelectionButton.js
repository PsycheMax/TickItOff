import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../utils/ThemeManager';
// import { Heading, Pressable, Flex, Divider, Text } from 'native-base';
import StandardDivider from '../StandardDivider';



const ProjectSelectionButton = (props) => {

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        button: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: props.bgColor ? props.bgColor : theme.colors.primary[800],
            height: theme.dimensions.methods.scale(96),
            maxHeight: 120,
            width: "100%",
            minWidth: "100%",
            maxWidth: 1000,
            borderRadius: 16,
            marginTop: 16,
            paddingHorizontal: theme.dimensions.methods.scale(16),
            paddingTop: theme.dimensions.methods.scale(8),
        },
        whiteText: {
            color: theme.colors.secondary[50],

        },
        name: {
            fontSize: 24,
            fontWeight: "600"
        },
        description: {
            fontSize: 16,
            fontWeight: "400"
        }
    })

    return (
        <TouchableOpacity onPress={props.selectProjectFunc}>
            <View style={styles.button}>
                <Text style={[styles.name, styles.whiteText]} numberOfLines={1} lineBreakMode={"clip"} >
                    {props.name}
                </Text>
                <StandardDivider color={theme.colors.tertiary[500]} />
                <Text style={[styles.description, styles.whiteText]} numberOfLines={1} lineBreakMode={"clip"}>
                    {props.description}
                </Text>
            </View>
        </TouchableOpacity>
        // <Pressable onPress={props.selectProjectFunc}>
        //     <Flex direction={"column"} wrap={"nowrap"} backgroundColor={props.bgColor}
        //         borderRadius={"lg"} h={scale(96)} maxH={scale(96)} mt={scale(16)}
        //         px={scale(16)} pt={scale(8)}
        //     >
        //         <Heading color={"secondary.50"} noOfLines={1} isTruncated _web={{ style: { overflowWrap: "nowrap" } }} >{props.name}</Heading>
        //         <StandardDivider color={"tertiary.500"} />
        //         <Text color={"secondary.50"} noOfLines={1} _web={{ style: { overflowWrap: "nowrap" } }}
        //             display={props.description ? "flex" : "none"}>{props.description ? props.description : null}</Text>
        //     </Flex>
        // </Pressable>
    )
}

ProjectSelectionButton.defaultProps = {
    name: "Project 1",
    description: "Description 1",
    bgColor: undefined,
    selectProjectFunc: () => { console.log("ProjectSelectionButton pressed") }
}

export default ProjectSelectionButton;
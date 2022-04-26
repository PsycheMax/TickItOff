import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Platform, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../utils/ThemeManager';
import { LoggedUserContext } from '../../utils/UserManager';
import Logo from '../logo/Logo';

const AboutPage = (props) => {

    const userDataContext = useContext(LoggedUserContext);

    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        coloredBackground: {
            backgroundColor: theme.colors.primary[500]
        },
        backgroundElement: {
            maxWidth: 1024,
            padding: 48
        },
        roundBot: {
            borderBottomEndRadius: 100,
            borderBottomStartRadius: 100
        },
        roundTop: {
            borderTopEndRadius: 100,
            borderTopStartRadius: 100
        },
        centered: {
            justifyContent: "center",
            alignItems: "center"
        },
        pageContainer: {
            width: "100%",
            maxWidth: 1024,
            alignSelf: "center",
            paddingBottom: 20,
            minHeight: "100%",
            // paddingTop: 20,
            paddingBottom: 40,
            paddingHorizontal: 20
        },
        title: {
            fontSize: 24,
            fontWeight: '600',
            paddingBottom: 12
        },
        paragraph: {
            fontSize: 18,
            lineHeight: 24,
            paddingBottom: 8
        },
        whiteText: {
            color: theme.colors.secondary[50]
        },
        url: {
            fontWeight: '700',
            fontSize: 22,
            alignSelf: "center",
            textDecorationLine: "underline"
        },
        ...theme.styles.modal,
    })

    function handleClick(targetURL) {
        Linking.canOpenURL(targetURL).then(
            (supported) => {
                if (supported) {
                    Linking.openURL(targetURL);
                } else {
                    console.log("Can't open the URI:");
                    console.log(targetURL);
                }
            }
        )
    }

    function renderContent() {
        return (
            <View style={[styles.backgroundElement, styles.coloredBackground]}>
                <View style={[styles.centered]}>
                    <Logo size="full" color="white" />
                </View>
                <Text style={[styles.whiteText, styles.title]}>About Tick It Off</Text>
                <Text style={[styles.whiteText, styles.paragraph]}>Thank you for coming to this page!</Text>
                <Text style={[styles.whiteText, styles.paragraph]}>
                    Tick It Off is a solo-project I decided to create in order to streamline my learning/work activities: I tend to perform better when I organize my activities beforehand. {"\n"}
                    Also, being able to tick a task off a list is VERY satisfying for me.
                </Text>
                <Text style={[styles.whiteText, styles.paragraph]}>
                    While looking for a position as a Software Developer, I decided to create something all by myself, not following any kind of predefined path. Since I'm usually eager to learn new stuff, I decided to do so while learning React-Native. {"\n"}
                    I decided to avoid using any book/tutorial and see if I was ready to research, read docs and make some mistakes in order to learn how to write a fully functional (web)App in React Native. {"\n"}
                    Since I'm a very VERY curious person, I decided to find a creative way to host this whole app (backend and frontend) on an old computer I've got at home - so please bear that in mind if the app is being quite slow.
                </Text>
                <Text style={[styles.whiteText, styles.paragraph]}>
                    I find smart solutions to complex problems for a living - if you want to get in touch with me, please feel free to do so here:
                </Text>
                <TouchableOpacity onPress={handleClick.bind(this, props.mainURL)}>
                    <Text style={[styles.whiteText, styles.paragraph, styles.url]}>
                        {props.mainURL}
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.whiteText, styles.title]}>
                    {/* <MaterialIcons name="code" color={theme.colors.secondary[50]} size={} /> */}
                    👨‍💻
                    Tick it Off stack
                </Text>
                <Text style={[styles.whiteText, styles.paragraph]}>
                    If you were wondering what's the tech stack behind this app :
                    MongoDB, Express, React Native.{"\n"}
                    I also have two public Github repos you can check out: {"\n"}
                    {"\n"}{`BackEnd:      `}
                    <TouchableOpacity onPress={handleClick.bind(this, props.githubBackendURL)}>
                        <Text style={[styles.whiteText, styles.paragraph, styles.url]}>
                            https://github.com/PsycheMax/TickItOff
                        </Text>
                    </TouchableOpacity>
                    {"\n"}{`FrontEnd:     `}
                    <TouchableOpacity onPress={handleClick.bind(this, props.githubFrontEndURL)}>
                        <Text style={[styles.whiteText, styles.paragraph, styles.url]}>
                            https://github.com/PsycheMax/TickItOff
                        </Text>
                    </TouchableOpacity>

                </Text>
            </View>)
    }

    return (
        <>
            {
                Platform.OS === "android" ?
                    <ScrollView style={[styles.pageContainer, styles.coloredBackground, styles.roundBot]}>
                        {renderContent()}
                    </ScrollView> :
                    <View style={[styles.pageContainer, styles.coloredBackground, styles.roundBot]}>
                        {renderContent()}
                    </View>
            }

        </>
    )
}

AboutPage.defaultProps = {
    mainURL: 'https://maxpace.net',
    githubBackendURL: 'https://github.com/PsycheMax/TickItOff',
    githubFrontEndURL: 'https://github.com/PsycheMax/TickItOff'
}

export default AboutPage;
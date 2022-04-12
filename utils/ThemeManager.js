import React, { useState, useEffect, useContext, createContext } from 'react';
import { Dimensions, Appearance, Platform } from 'react-native';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export const ThemeContext = createContext({
    colors: {
        primary: {

        },
        secondary: {

        }, tertiary: {

        }
        , quartiary: {

        }, transparent: {

        }
    },
    dimensions: {
        screenHeight: {},
        screenWidth: {},
        windowHeight: {},
        windowWidth: {},
        methods: {
            scale: {},
            verticalScale: {},
            moderateScale: {},
            moderateVerticalScale: {}
        }
    },
    styles: {
        modal: {}
    },
    colorScheme: ""
})

const ThemeManager = (props) => {

    let colorScheme = Appearance.getColorScheme();
    Appearance.addChangeListener(() => { colorScheme = Appearance.getColorScheme() })

    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('screen').height);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('screen').width);

    Dimensions.addEventListener("change", (e) => {
        const { width: windowWidth, height: windowHeight } = e.window;
        const { width: screenWidth, height: screenHeight } = e.screen;
        setWindowHeight(windowHeight);
        setWindowWidth(windowWidth);
        setScreenHeight(screenHeight);
        setScreenWidth(screenWidth);
    })

    let lightThemeColors = {
        primary: {
            50: '#def5ff',
            100: '#b5dcfb',
            200: '#8bc2f4',
            300: '#5faaec',
            400: '#3392e5',
            500: '#1a78cc',
            600: '#0e5e9f',
            700: '#044373',
            800: '#002848',
            900: '#000e1e',
        },
        secondary:
        {
            "50": "#F5FBFF",
            "100": "#EBF8FF",
            "200": "#DBF3FF",
            "300": "#C7EBFF",
            "400": "#B3E4FF",
            "500": "#A0DDFF",
            "600": "#4DC1FF",
            "700": "#00A2FA",
            "800": "#006DA8",
            "900": "#003552"
        },
        tertiary:
        {
            50: '#fff6dd',
            100: '#f8e5b5',
            200: '#f1d38b',
            300: '#ebc25f',
            400: '#e5b134',
            500: '#cb971a',
            600: '#9e7611',
            700: '#71540b',
            800: '#453202',
            900: '#1b1000',
        },
        quartiary:
        {
            50: '#edf7f5',
            100: '#d0e6e3',
            200: '#b0d6d2',
            300: '#90c6c5',
            400: '#71b4b6',
            500: '#58969d',
            600: '#46717a',
            700: '#324f57',
            800: '#1e2d34',
            900: '#080e12',
        },
        transparent: {
            50: '#1a78cc00'
        }
    };
    let darkThemeColors = {
        primary: {
            "50": "#181B20",
            "100": "#181B20",
            "200": "#2C303A",
            "300": "#323743",
            "400": "#393F4C",
            "500": "#404756",
            "600": "#7E899F",
            "700": "#AAB1C0",
            "800": "#CDD1DA",
            "900": "#E8EAEE"
        },
        secondary:
        {
            "50": "#05070A",
            "100": "#0B0E14",
            "200": "#151C28",
            "300": "#202A3C",
            "400": "#2A3850",
            "500": "#354765",
            "600": "#4D6793",
            "700": "#728BB5",
            "800": "#A1B2CE",
            "900": "#D0D8E6"
        },
        tertiary:
        {
            "50": "#FCF6E8",
            "100": "#F9EDD2",
            "200": "#F3DAA0",
            "300": "#EEC972",
            "400": "#E7B540",
            "500": "#DAA21B",
            "600": "#AC7F15",
            "700": "#846110",
            "800": "#56400B",
            "900": "#2D2106"
        },
        quartiary:
        {
            "50": "#6E1235",
            "100": "#911846",
            "200": "#B41D57",
            "300": "#C52060",
            "400": "#DC2A6D",
            "500": "#E97CA6",
            "600": "#F1A7C3",
            "700": "#F6CADB",
            "800": "#FBE9F0",
            "900": "#FDF2F6"
        },
        transparent: {
            50: '#1a78cc00'
        }
    };

    let colorTheme = (colorScheme === 'dark') ? darkThemeColors : lightThemeColors;

    const dimensions = {
        windowHeight: windowHeight,
        windowWidth: (windowWidth >= 1024) ? 1024 : windowWidth,
        screenHeight: screenHeight,
        screenWidth: (screenWidth >= 1024) ? 1024 : screenWidth,
        methods: {
            scale: scale,
            verticalScale: verticalScale,
            moderateScale: moderateScale,
            moderateVerticalScale: moderateVerticalScale
        }
    }

    const standardStyles = {

        modal: {
            backgroundForModal: {
                backgroundColor: colorTheme.primary[800],
                opacity: 0.4,
                width: dimensions.methods.scale(dimensions.windowWidth),
                height: dimensions.methods.scale(dimensions.windowHeight),
                position: "absolute",
                zIndex: 1,
                top: -30,
                left: 0
            },
            modalCenteredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22
            },
            modalWindow: {
                position: "relative",
                zIndex: 10,
                margin: 20,
                backgroundColor: colorTheme.secondary[300],
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            },
            modalButtonsContainer: {
                flexDirection: "row",
                marginTop: dimensions.methods.moderateScale(16)
            },
            modalButtons: {
                paddingHorizontal: dimensions.methods.moderateScale(24),
                paddingVertical: dimensions.methods.moderateScale(18),
                marginHorizontal: dimensions.methods.moderateScale(12),
                borderRadius: 50
            },
            modalText: {
                fontSize: dimensions.methods.moderateScale(18),
                color: colorTheme.primary[900]
            }
        }
    }

    return (
        <ThemeContext.Provider value={{
            colors: colorTheme,
            dimensions: dimensions,
            styles: standardStyles,
            colorScheme: colorScheme
        }} >
            {props.children}
        </ThemeContext.Provider>
    )
}


export default ThemeManager;
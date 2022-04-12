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
    }
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
            "50": "#F7F7FD",
            "100": "#ECEBF9",
            "200": "#D5D4F2",
            "300": "#BAB8EA",
            "400": "#9895DF",
            "500": "#6C69D2",
            "600": "#5E5ACE",
            "700": "#4F4BC9",
            "800": "#3C37B8",
            "900": "#2C2989"
        },
        secondary:
        {
            "50": "#F6F7F9",
            "100": "#EDEFF2",
            "200": "#DCDEE5",
            "300": "#CACED8",
            "400": "#B5BBC9",
            "500": "#A4ABBD",
            "600": "#7A849E",
            "700": "#5A647C",
            "800": "#3C4253",
            "900": "#1E2129"
        },
        tertiary:
        {
            "50": "#F1F8FD",
            "100": "#DFEEFB",
            "200": "#BBDBF6",
            "300": "#8EC3F1",
            "400": "#53A3E9",
            "500": "#1A78CC",
            "600": "#176BB5",
            "700": "#1561A3",
            "800": "#114E83",
            "900": "#0D3B64"
        },
        quartiary:
        {
            "50": "#FDF2F6",
            "100": "#FBE9F0",
            "200": "#F6CADB",
            "300": "#F1A7C3",
            "400": "#E97CA6",
            "500": "#DC2A6D",
            "600": "#C52060",
            "700": "#B41D57",
            "800": "#911846",
            "900": "#6E1235"
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
                color: colorTheme.primary[50]
            }
        }
    }

    return (
        <ThemeContext.Provider value={{
            colors: colorTheme,
            dimensions: dimensions,
            styles: standardStyles
        }} >
            {props.children}
        </ThemeContext.Provider>
    )
}


export default ThemeManager;
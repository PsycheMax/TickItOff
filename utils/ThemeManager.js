import React, { useState, useEffect, useContext, createContext } from 'react';
import { Dimensions, Appearance } from 'react-native';

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
            50: '#e0f5ff',
            100: '#b3dfff',
            200: '#84cafc',
            300: '#56b5fb',
            400: '#32a0fa',
            500: '#2387e1',
            600: '#1769af',
            700: '#0c4b7e',
            800: '#002d4d',
            900: '#00101e',
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
            50: '#000000',
            100: '#000000',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#000000',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
        },
        secondary:
        {
            50: '#000000',
            100: '#000000',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#000000',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
        },
        tertiary:
        {
            50: '#000000',
            100: '#000000',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#000000',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
        },
        quartiary:
        {
            50: '#000000',
            100: '#000000',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#000000',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
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

    return (
        <ThemeContext.Provider value={{
            colors: colorTheme,
            dimensions: dimensions,
        }} >
            {props.children}
        </ThemeContext.Provider>
    )
}


export default ThemeManager;
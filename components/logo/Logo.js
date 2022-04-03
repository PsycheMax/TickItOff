import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';

import { ThemeContext } from '../../utils/ThemeManager';

let whiteLogoFull = require('./logo-full-white.png');
let whiteLogoSmall = require('./logo-small-white.png');
let colorLogoFull = require('./logo-full-color.png');
let colorLogoSmall = require('./logo-small-color.png');

const Logo = function (props) {

    const theme = useContext(ThemeContext);

    function chooseSize() {
        switch (props.size) {
            case "full":
                switch (props.color) {
                    case "color":
                        return colorLogoFull;
                        break;
                    case "white":
                    default:
                        return whiteLogoFull;
                        break;
                }
                break;
            case "small":
            default:
                switch (props.color) {
                    case "color":
                        return colorLogoSmall;
                        break;
                    case "white":
                    default:
                        return whiteLogoSmall;
                        break;
                }
                break;
        }
    }

    const styles = StyleSheet.create({
        logo: {
            width: theme.dimensions.methods.scale(100),
            height: theme.dimensions.methods.scale(100),
            maxHeight: 128,
            maxWidth: 128,
            zIndex: 15
        }
    })

    const imageSource = (Platform.OS === "android") ? chooseSize() : { uri: chooseSize() };

    return (
        <Image alt={"Tick it off logo"} style={styles.logo}
            source={imageSource}
        />
    )
}

Logo.defaultProps = {
    color: "white",
    size: "small"
}

export default Logo;
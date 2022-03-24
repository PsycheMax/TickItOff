// native-base\img\logo\logo-full-color.png
// native-base\img\logo\logo-full-white.png
// native-base\img\logo\logo-small-color.png
// native-base\img\logo\logo-small-white.png
import { Image } from 'native-base';
import React from 'react';

const whiteLogoFull = require('../../img/logo/logo-full-white.png');
const whiteLogoSmall = require('../../img/logo/logo-small-white.png');
const colorLogoFull = require('../../img/logo/logo-full-color.png');
const colorLogoSmall = require('../../img/logo/logo-small-color.png');

const Logo = function (props) {

    function chooseSize() {
        switch (props.size) {
            case "full":
                switch (props.color) {
                    case "color":
                        return colorLogoFull;
                        break;
                    case "white":
                    default:
                        return colorLogoSmall;
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

    return (
        <Image alt={"Tick it off logo"} source={{ uri: chooseSize() }} w="6rem" h="6rem" />
    )
}

export default Logo;
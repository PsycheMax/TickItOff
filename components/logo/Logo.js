// native-base\img\logo\logo-full-color.png
// native-base\img\logo\logo-full-white.png
// native-base\img\logo\logo-small-color.png
// native-base\img\logo\logo-small-white.png
import { Image } from 'native-base';
import React, { useEffect } from 'react';

let whiteLogoFull;
let whiteLogoSmall;
let colorLogoFull;
let colorLogoSmall;

const Logo = function (props) {

    useEffect(() => {
        whiteLogoFull = require('../../img/logo/logo-full-white.png');
        whiteLogoSmall = require('../../img/logo/logo-small-white.png');
        colorLogoFull = require('../../img/logo/logo-full-color.png');
        colorLogoSmall = require('../../img/logo/logo-small-color.png');
    }, [])

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

    console.log(chooseSize());
    return (
        <Image alt={"Tick it off logo"} source={{ uri: require('../../img/logo/logo-small-white.png') }} w="6rem" h="6rem" />
    )
}

Logo.defaultProps = {
    color: "color",
    size: "small"
}

export default Logo;
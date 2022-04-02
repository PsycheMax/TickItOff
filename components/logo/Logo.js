// native-base\img\logo\logo-full-color.png
// native-base\img\logo\logo-full-white.png
// native-base\img\logo\logo-small-color.png
// native-base\img\logo\logo-small-white.png
import { Image } from 'native-base';
import React, { useEffect } from 'react';

import { scale } from 'react-native-size-matters';

let whiteLogoFull = require('./logo-full-white.png');
let whiteLogoSmall = require('./logo-small-white.png');
let colorLogoFull = require('./logo-full-color.png');
let colorLogoSmall = require('./logo-small-color.png');

const Logo = function (props) {

    useEffect(() => {


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

    var imageSource = { uri: chooseSize(), width: scale(100), height: scale(100) };

    return (
        <Image alt={"Tick it off logo"} source={imageSource} width={scale(100)} height={scale(100)}
            _web={{ style: { width: scale(100), height: scale(100), maxHeight: "8rem", maxWidth: "8rem" } }}
            _android={{ source: whiteLogoSmall, style: { width: scale(100), height: scale(120), minWidth: scale(100), minHeight: scale(100), zIndex: 15, display: "flex" } }}
        />
    )
}

Logo.defaultProps = {
    color: "color",
    size: "small"
}

export default Logo;
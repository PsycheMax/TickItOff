import React from 'react';
import { Divider } from 'native-base';

const StandardDivider = (props) => {
    return (
        <Divider bg={props.color} w={"3rem"} maxW={"3rem"} h={"0.5rem"} my={"0.4rem"} display={props.display} />
    )
}

StandardDivider.defaultProps = {
    color: "primary.500",
    display: "block"
}
export default StandardDivider;
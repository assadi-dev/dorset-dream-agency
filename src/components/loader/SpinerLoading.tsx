import React from "react";
import { SpinnerCircularFixed, SpinnerCircularFixedProps } from "spinners-react";

type SpinnerLoadingProps = SpinnerCircularFixedProps;
const SpinnerLoading = ({
    size = 40,
    speed = 250,
    color = "#fff",
    secondaryColor = "#FFFFFF50",
    thickness = 120,
    ...props
}: SpinnerLoadingProps) => {
    return (
        <SpinnerCircularFixed
            {...props}
            size={size}
            color={color}
            secondaryColor={secondaryColor}
            speed={speed}
            thickness={thickness}
        />
    );
};

export default SpinnerLoading;

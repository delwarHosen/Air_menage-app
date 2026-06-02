
import { IconProps } from "@/types/iconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";


export const PlusIcon = ({
    size = 16,
    color = "#FFFFFF",
}: IconProps) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#4B4B4B" />
        </Svg>

    );
};



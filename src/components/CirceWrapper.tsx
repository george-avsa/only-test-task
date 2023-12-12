import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHtmlElement";
import { generateRotationMap } from "../handlers/getRotationMap";
import { getNewIntervals } from "../handlers/getNewIntervals";
import { dateInterval } from "../types/dateInterval";
import Circle from "./Circle";
import { getCircleButtonsVisibility } from "../handlers/getCircleButtonsVisibility";
import CircleControls from "./CircleControls";
import CircleDates from "./CircleDates";

export default function CirceWrapper() {

    const circleRef = useRef(null);
    const [circleRotation, setCircleRotation] = useState(0); 

    const [circleControls, setCircleControls] = useState({
        left: false,
        right: true,
    })

    const [dateIntevals, setDateIntevals] = useState([
        {
            firstDate: 1993,
            lastDate: 1995,
            index: 1,
            currentRotation: 0,
            nextRotation: 0,
            active: true,
        },
        {
            firstDate: 1995,
            lastDate: 1998,
            index: 2,
            currentRotation: 0,
            nextRotation: 0,
            active: false,
        },
        {
            firstDate: 1999,
            lastDate: 2005,
            index: 3,
            currentRotation: 0,
            nextRotation: 0,
            active: false,
        },
        {
            firstDate: 2005,
            lastDate: 2018,
            index: 4,
            currentRotation: 0,
            nextRotation: 0,
            active: false,
        },
        {
            firstDate: 2018,
            lastDate: 2023,
            index: 5,
            currentRotation: 0,
            nextRotation: 0,
            active: false,
        },
    ]);

    useEffect(() => {
        setDateIntevals(generateRotationMap(dateIntevals));
    }, []);

    return (
        <div className="circle__wrapper">
            <Circle 
                circleRef={circleRef}
                circleRotation={circleRotation}
                dateIntervals={dateIntevals}
                setCircleControls={setCircleControls}
                setCircleRotation={setCircleRotation}
                setDateIntevals={setDateIntevals}
            ></Circle>
            <CircleControls
                dateIntervals={dateIntevals}
                circleRef={circleRef}
                circleRotation={circleRotation}
                circleControls={circleControls}
                setCircleRotation={setCircleRotation}
                setCircleControls={setCircleControls}
                setDateIntervals={setDateIntevals}
            ></CircleControls>
            <CircleDates></CircleDates>
        </div>
    );
}
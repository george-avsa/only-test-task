import React, { Dispatch, ReactEventHandler, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHtmlElement";
import { generateRotationMap } from "../handlers/getRotationMap";
import { getNewIntervals } from "../handlers/getNewIntervals";
import { dateInterval } from "../types/dateInterval";
import Circle from "./Circle";
import { getCircleButtonsVisibility } from "../handlers/getCircleButtonsVisibility";
import CircleControls from "./CircleControls";
import CircleDates from "./CircleDates";
import { getActiveDates } from "../handlers/getActiveDates";
import { data } from "../data";

export default function CirceWrapper({
    dateIntervals,
    setDateIntervals,
    sliderRef,
}: {
    dateIntervals: dateInterval[],
    setDateIntervals: Dispatch<SetStateAction<dateInterval[]>>,
    sliderRef: RefObject<HTMLDivElement>,
}) {

    const circleRef = useRef(null);

    const [circleRotation, setCircleRotation] = useState(0); 

    const [circleControls, setCircleControls] = useState({
        left: false,
        right: true,
    })

    useEffect(() => {
        setDateIntervals(generateRotationMap(dateIntervals));
    }, []);

    return (
        <div className="circle__wrapper">
            <Circle 
                circleRef={circleRef}
                circleRotation={circleRotation}
                dateIntervals={dateIntervals}
                setCircleControls={setCircleControls}
                setCircleRotation={setCircleRotation}
                setDateIntevals={setDateIntervals}
                sliderRef={sliderRef}
                ></Circle>
            <CircleControls
                dateIntervals={dateIntervals}
                circleRef={circleRef}
                circleRotation={circleRotation}
                circleControls={circleControls}
                setCircleRotation={setCircleRotation}
                setCircleControls={setCircleControls}
                setDateIntervals={setDateIntervals}
                sliderRef={sliderRef}
                ></CircleControls>
            <CircleDates dates={getActiveDates(dateIntervals)}></CircleDates>
        </div>
    );
}
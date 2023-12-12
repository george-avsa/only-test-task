import React, { Dispatch, Ref, RefObject, SetStateAction } from "react";
import { isHtmlElement } from "../types/isHtmlElement";
import { getNewIntervals } from "../handlers/getNewIntervals";
import { getCircleButtonsVisibility } from "../handlers/getCircleButtonsVisibility";
import { dateInterval } from "../types/dateInterval";
import { CircleButtonsVisibility } from "../types/circleButtonsVisibility";
import CircleMarker from "./CircleMarker";

type CircleProps = {
    circleRef: RefObject<HTMLDivElement>,
    circleRotation: number,
    dateIntervals: dateInterval[],
    setCircleControls: Dispatch<SetStateAction<CircleButtonsVisibility>>,
    setCircleRotation: Dispatch<SetStateAction<number>>,
    setDateIntevals: Dispatch<SetStateAction<dateInterval[]>>,
}

function Circle({circleRef, circleRotation, dateIntervals, setCircleControls, setCircleRotation, setDateIntevals}: CircleProps) {

    function clickHandlerMarker(e: React.MouseEvent<HTMLElement>) {
        const clickedMarker = e.target;
        if (isHtmlElement(clickedMarker)) {
            const markerBlock = clickedMarker.closest('.marker__block');
            if (isHtmlElement(markerBlock)) {
                const nextRotation = Number.parseInt(markerBlock.getAttribute('data-rotation'))
                circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                const indexClicked = Number.parseInt(markerBlock?.innerText) - 1;
                const newIntervals = getNewIntervals(dateIntervals, indexClicked);
                const dateIntervalsLength = Object.keys(dateIntervals).length;
                setCircleControls(getCircleButtonsVisibility(indexClicked, dateIntervalsLength))
                setCircleRotation((circleRotation: number) => circleRotation + nextRotation);
                setDateIntevals(newIntervals.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

    return (
        <div className="circle" ref={circleRef}>
            {dateIntervals.map((dateInterval: dateInterval, i:number) => (
                <CircleMarker
                    circleRotation={circleRotation}
                    dateInterval={dateInterval}
                    clickHandlerMarker={clickHandlerMarker}
                    index={i}
                ></CircleMarker>
            ))}
        </div>
    );
}

export default Circle;
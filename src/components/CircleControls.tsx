import React, { Dispatch, RefObject, SetStateAction } from "react";
import { ReactComponent as CircleArrow } from "./../assets/arrowCircle.svg";
import { isHtmlElement } from "../types/isHtmlElement";
import { dateInterval } from "../types/dateInterval";
import { CircleButtonsVisibility } from "../types/circleButtonsVisibility";
import { getCircleButtonsVisibility } from "../handlers/getCircleButtonsVisibility";
import { getNewIntervals } from "../handlers/getNewIntervals";
import CirclePosition from "./CirclePosition";
import { gsap } from "gsap";

type CircleControlsProps = {
    dateIntervals: dateInterval[],
    circleRef: RefObject<HTMLDivElement>,
    circleRotation: number,
    circleControls: CircleButtonsVisibility,
    setCircleControls: Dispatch<SetStateAction<CircleButtonsVisibility>>,
    setCircleRotation: Dispatch<SetStateAction<number>>,
    setDateIntervals: Dispatch<SetStateAction<dateInterval[]>>,
    sliderRef: RefObject<HTMLDivElement>,
}

function CircleControls({
    dateIntervals,
    circleRef, 
    circleRotation, 
    circleControls,
    setCircleRotation,
    setCircleControls, 
    setDateIntervals,
    sliderRef,
}: CircleControlsProps) {

    const handleCircleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttonClicked = e.target;
        if (isHtmlElement(buttonClicked)) {
            const direction = buttonClicked.getAttribute('data-direction');
            const dateIntervalsLength = Object.keys(dateIntervals).length;
            let nextRotation = 360 / dateIntervalsLength;
            const currentIndex = dateIntervals.find(dateInteval => dateInteval.active).index;
            let condition = direction === 'left' ? currentIndex !== 1 : currentIndex !== dateIntervalsLength;
            if (condition) {
                let newIndex: number;
                if (direction === 'left') {
                    newIndex = currentIndex - 2;
                } else {
                    newIndex = currentIndex;
                    nextRotation = -nextRotation;
                }
                setCircleControls(getCircleButtonsVisibility(newIndex, dateIntervalsLength));
                const newIntervals = getNewIntervals(dateIntervals, newIndex);
                circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                setCircleRotation((circleRotation) => circleRotation + nextRotation);
                setDateIntervals(newIntervals.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

    return (
        <div className='circle__controls'>
            <CirclePosition
                dateIntervals={dateIntervals}
            ></CirclePosition>
            <div className='circle__controls-buttons'>
                <div 
                    className={`circle__button ${!circleControls.left ? 'circle__button--disabled' : ''}`} 
                    onClick={handleCircleButtonClick}
                    data-direction='left'
                >
                    <CircleArrow data-direction='left' />
                </div>
                <div 
                    className={`circle__button circle__button--next ${!circleControls.right ? 'circle__button--disabled' : ''}`} 
                    onClick={handleCircleButtonClick}
                    data-direction='right'
                >
                    <CircleArrow data-direction='right' />
                </div>
            </div>
        </div>
    );
}

export default CircleControls;
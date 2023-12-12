import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHtmlElement";
import { generateRotationMap } from "../handlers/getRotationMap";
import { getNewIntervals } from "../handlers/getNewIntervals";
import { dateInterval } from "../types/dateInterval"
import { ReactComponent as CircleArrow } from "./../assets/arrowCircle.svg";
import Circle from "./Circle";
import { getCircleButtonsVisibility } from "../handlers/getCircleButtonsVisibility";

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
        {
            firstDate: 2023,
            lastDate: 2024,
            index: 6,
            currentRotation: 0,
            nextRotation: 0,
            active: false,
        },
    ]);

    useEffect(() => {
        setDateIntevals(generateRotationMap(dateIntevals));
    }, []);

    const handleCircleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttonClicked = e.target;
        if (isHtmlElement(buttonClicked)) {
            const direction = buttonClicked.getAttribute('data-direction');
            const dateIntervalsLength = Object.keys(dateIntevals).length;
            let nextRotation = 360 / dateIntervalsLength;
            const currentIndex = dateIntevals.find(dateInteval => dateInteval.active).index;
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
                const newIntervals = getNewIntervals(dateIntevals, newIndex);
                circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                
                // if element is rotated after rerender and it is invisible, animation of marker element will be wrong
                // in case, when marker is active (on hover) it works good, without code below - rotation doesn't repeat circle's rotation
                circleRef.current.querySelectorAll('.marker__hover').forEach((markerHoverElement:HTMLDivElement) => {
                    if (markerHoverElement?.innerText === String(newIndex + 1)) {
                        markerHoverElement.classList.add('marker__hover--active');
                    }
                });
                setCircleRotation((circleRotation) => circleRotation + nextRotation);
                setDateIntevals(newIntervals.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

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
            <div className="circle__dates">
                <div className="circle__date circle__date--first">2021</div>
                <div className="circle__date circle__date--second">2024</div>
            </div>
            <div className='circle__controls'>
            <span className='circle__position'>0{dateIntevals.find((dateInteval: dateInterval) => dateInteval.active).index}/06</span>
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
        </div>
    );
}
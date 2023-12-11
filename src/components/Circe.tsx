import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHtmlElement";
import { generateRotationMap } from "../handlers/getRotationMap";
import { getNewIntervals } from "../handlers/getNewIntervals";
import { dateInterval } from "../types/dateInterval"
import { ReactComponent as CircleArrow } from "./../assets/arrowCircle.svg";

export default function Circle() {

    const circleRef = useRef(null);
    const [circleRotation, setCircleRotation] = useState(0); 

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

    function clickHandlerMarker(e: React.MouseEvent<HTMLElement>) {
        const clickedMarker = e.target;
        if (isHtmlElement(clickedMarker)) {
            const markerBlock = clickedMarker.closest('.marker__block');
            if (isHtmlElement(markerBlock)) {
                const nextRotation = Number.parseInt(markerBlock.getAttribute('data-rotation'))
                circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                const indexClicked = Number.parseInt(markerBlock?.innerText) - 1;
                const newIntervals = getNewIntervals(dateIntevals, indexClicked);
                setCircleRotation((circleRotation) => circleRotation + nextRotation);
                setDateIntevals(newIntervals.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

    const handleCircleLeft = () => {
        const dateIntervalsLength = Object.keys(dateIntevals).length;
        const nextRotation = 360 / dateIntervalsLength;
        const currentIndex = dateIntevals.find(dateInteval => dateInteval.active).index;
        let newIndex: number;
        if (currentIndex === 1) {
            newIndex = dateIntervalsLength - 1;
        } else {
            newIndex = currentIndex - 2;
        }
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

    return (
        <div className="circle__wrapper">
        <div className="circle" ref={circleRef}>
                {dateIntevals.map((dateInterval, i) => (
                    <div className='marker__block' 
                    key={`${dateInterval.firstDate}-${dateInterval.lastDate}`} 
                    style={{rotate: `${dateInterval.currentRotation}deg`}}
                    data-rotation={dateInterval.nextRotation}
                    >
                        <div className="cirlce__marker" onClick={clickHandlerMarker}>
                            <div className={`marker__hover${dateInterval.active ? ' marker__hover--active' : ''}`} style={{rotate: `${-dateInterval.currentRotation - (circleRotation % 360) - Math.trunc(circleRotation / 360) * 360}deg`}}>
                                <span className="marker__number-text">
                                    {i + 1}
                                </span>
                                {dateInterval.active && (
                                    <div className="marker__category">
                                        History
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        <div className="circle__dates">
            <div className="circle__date circle__date--first">2021</div>
            <div className="circle__date circle__date--second">2024</div>
        </div>
        <div className='circle__controls'>
        <span className='circle__position'>0{dateIntevals.find((dateInteval: dateInterval) => dateInteval.active).index}/06</span>
        <div className='circle__controls-buttons'>
            <div className="circle__button" onClick={handleCircleLeft}>
                <CircleArrow />
            </div>
            <div className="circle__button circle__button--next">
                <CircleArrow />
            </div>
        </div>
        </div>
                </div>
    );
}
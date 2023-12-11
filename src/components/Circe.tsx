import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHtmlElement";

type markerRotationMap = {
    currentRotation: number,
    nextRotation: number,
}

type dateInterval = {
    firstDate: number,
    lastDate: number,
    index: number,
    currentRotation: number,
    nextRotation: number,
    active: boolean
}

function getMinimizedRotation(initialRotation: number): number {
    const leftRotation = 360 - initialRotation + 30; 
    const rightRotation = 30 - initialRotation;
    let nextRotation: number;
    if (Math.abs(leftRotation) >= Math.abs(rightRotation)) {
        nextRotation = rightRotation
    } else {
        nextRotation = leftRotation
    }
    return nextRotation;
}

function generateRotationMap(dateIntervals: dateInterval[]): dateInterval[] {
    let initialRotation = 30;
    const rotationStep = 360 / dateIntervals.length;    const dateIntervalsMapped = dateIntervals.map(dateInterval => {
        const nextRotation = getMinimizedRotation(initialRotation)
        const keklol = {...dateInterval, currentRotation: initialRotation, nextRotation};
        initialRotation += rotationStep
        return keklol;
    }); 
    return dateIntervalsMapped;
}

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
            const circleId = Number.parseInt(clickedMarker.innerText);
                const markerBlock = clickedMarker.closest('.marker__block');
                if (isHtmlElement(markerBlock)) {
                    const nextRotation = Number.parseInt(markerBlock.getAttribute('data-rotation'))
                    circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                    const indexClicked = Number.parseInt(markerBlock?.innerText) - 1;
                    const newDateIntervals = [...dateIntevals.slice(indexClicked, dateIntevals.length), ...dateIntevals.slice(0, indexClicked)]
                    // сonst indexOrder = newDateIntervals.map()
                    const rotationStep = 360 / newDateIntervals.length;
                    let initialRotation = 30;
                    const newkeklol  = newDateIntervals.map((dateInteval, i) => {
                        const nextMarkerRotation = getMinimizedRotation(initialRotation)
                        initialRotation += rotationStep
                        if (dateInteval.index === indexClicked + 1) {
                            return {...dateInteval, active: true, nextRotation: nextMarkerRotation}
                        }
                        return {...dateInteval, active: false, nextRotation: nextMarkerRotation}
                    });
                    setCircleRotation((circleRotation) => circleRotation + nextRotation);
                    setDateIntevals(newkeklol.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

    return (
        <div className="wrapper__circle" ref={circleRef}>
                {dateIntevals.map((dateInterval, i) => (
                    <div className='marker__block' 
                        key={`${dateInterval.firstDate}-${dateInterval.lastDate}`} 
                        style={{rotate: `${dateInterval.currentRotation}deg`}}
                        data-rotation={dateInterval.nextRotation}
                    >
                        <div className="cirlce__marker" onClick={clickHandlerMarker}>
                            <div className={`marker__hover${dateInterval.active ? ' marker__hover--active' : ''}`} style={{rotate: `${-dateInterval.currentRotation - (circleRotation % 360)}deg`}}>
                                <span className="marker__number-text"></span>
                                {i + 1}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="circle__dates" style={{rotate: `${-(circleRotation % 360)}deg`}}>
                    <div className="circle__date circle__date--first">2021</div>
                    <div className="circle__date circle__date--second">2024</div>
                </div>
        </div>
    );
}
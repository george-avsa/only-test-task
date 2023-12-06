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
    if (Math.abs(leftRotation) > Math.abs(rightRotation)) {
        nextRotation = rightRotation
    } else {
        nextRotation = leftRotation
    }
    console.log(nextRotation)
    return nextRotation;
}

function generateRotationMap(dateIntervals: dateInterval[], circleRotation: number): dateInterval[] {
    let initialRotation = 30;
    const rotationStep = 360 / dateIntervals.length;
    const dateIntervalsMapped = dateIntervals.map(dateInterval => {
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
    const [localRotation, setLocalRotation] = useState(0); 
    const [fullSpins, setFullSpins] = useState(1);

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
        setDateIntevals(generateRotationMap(dateIntevals, 0));
    }, []);

    function clickHandlerMarker(e: React.MouseEvent<HTMLElement>) {
        const clickedMarker = e.target;
        if (isHtmlElement(clickedMarker)) {
            const circleId = Number.parseInt(clickedMarker.innerText);
                const markerBlock = clickedMarker.closest('.marker__block');
                if (isHtmlElement(markerBlock)) {
                    const circleRotation = Number.parseInt(circleRef.current.style.rotate) || 0;
                    const nextRotation = Number.parseInt(markerBlock.getAttribute('data-rotation'))
                    circleRef.current.style.rotate = `${circleRotation + nextRotation}deg`;
                    const indexClicked = Number.parseInt(markerBlock?.innerText) - 1;
                    const newDateIntervals = [...dateIntevals.slice(indexClicked, dateIntevals.length), ...dateIntevals.slice(0, indexClicked)]
                    // сonst indexOrder = newDateIntervals.map()
                    const rotationStep = 360 / newDateIntervals.length;
                    let initialRotation = 30;
                    const newkeklol  = newDateIntervals.map((dateInteval, i) => {
                        const nextMarkerRotation = getMinimizedRotation(initialRotation)
                        console.log(nextMarkerRotation)
                        initialRotation += rotationStep
                        if (dateInteval.index === indexClicked + 1) {
                            return {...dateInteval, active: true, nextRotation: nextMarkerRotation}
                        }
                        return {...dateInteval, active: false, nextRotation: nextMarkerRotation}
                    });
                    console.log(newkeklol)
                    setDateIntevals(newkeklol.sort((a:dateInterval, b:dateInterval) => a.index - b.index));
            }
        }
    }

    useEffect(() => {
        if (localRotation) {
            const circleRotation = Number.parseInt(circleRef.current.style.rotate) || 0;
            let spins = fullSpins;
            if (circleRotation > fullSpins * 360 + 30 - localRotation && circleRotation != 0) {
                setFullSpins(() => fullSpins + 1);
                spins += 1
            }
            circleRef.current.style.rotate = `${spins * 360 + 30 - localRotation}deg`;
            setCircleRotation(spins * 360 + 30 - localRotation);
        } 
    }, [localRotation]);

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
        </div>
    );
}
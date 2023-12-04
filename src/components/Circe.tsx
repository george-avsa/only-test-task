import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { isHtmlElement } from "../types/isHTMLElement";

const datesLength : number = 6;

function getMarkerRotation(datesLength: number): number[] {
    const markers = [];
    let initialRotation = 30;
    const rotationStep = 360 / datesLength;
    for (let i = 0; i < datesLength; ++i) {
        markers.push(initialRotation)
        initialRotation += rotationStep
    } 
    return markers;
}

export default function Circle() {

    const [intervals, setIntervals] = useState(1);
    const circleRef = useRef(null);
    const [circleRotation, setCircleRotation] = useState(0); 
    const [localRotation, setLocalRotation] = useState(0); 
    const [fullSpins, setFullSpins] = useState(1);

    function clickHandlerMarker(e: React.MouseEvent<HTMLElement>) {
        const clickedMarker = e.target;
        if (isHtmlElement(clickedMarker)) {
            const circleId = Number.parseInt(clickedMarker.innerText);
            if (circleId !== intervals) {
                const markerBlock = clickedMarker.closest('.marker__block');
                if (isHtmlElement(markerBlock)) {
                    let rotation = Number.parseInt(markerBlock.style.rotate);
                    setLocalRotation(rotation);
                    setIntervals(circleId);
                }
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
                {getMarkerRotation(datesLength).map((degree, i) => (
                    <div className='marker__block' key={`rotate${degree}`} style={{rotate: `${degree}deg`}}>
                        <div className="cirlce__marker" onClick={clickHandlerMarker}>
                            <div className={`marker__hover${intervals === (i+1) ? ' marker__hover--active' : ''}`} style={{rotate: `${-degree - (circleRotation % 360)}deg`}}>
                                <span className="marker__number-text"></span>
                                {i + 1}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
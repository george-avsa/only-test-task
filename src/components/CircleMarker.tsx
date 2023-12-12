import React, { useEffect, useLayoutEffect, useRef } from "react";
import { dateInterval } from "../types/dateInterval";
import { gsap } from "gsap";

type CircleMarkerProps = {
    circleRotation: number,
    dateInterval: dateInterval,
    index: number
    clickHandlerMarker: (e: React.MouseEvent<HTMLDivElement>) => void,
}

function CircleMarker({
    circleRotation,
    dateInterval,
    clickHandlerMarker,
    index
}: CircleMarkerProps) {

    const markerHoverRef = useRef(null);
    
    const onEnter = ({ currentTarget }: {currentTarget: HTMLDivElement}) => {
        const markerHover = currentTarget.querySelector('.marker__hover:not(.marker__hover--active)');
        if (markerHover) {
            gsap.to(markerHover, { scale: 1, duration: .2, });
        }
    };

    const onLeave = ({ currentTarget }: {currentTarget: HTMLDivElement}) => {
        gsap.to(currentTarget, { scale: 0, duration: .2, });
    };

    return (
        <div className='marker__block' 
            key={`${dateInterval.category}${dateInterval.firstDate}-${dateInterval.lastDate}`} 
            style={{rotate: `${dateInterval.currentRotation}deg`}}
            data-rotation={dateInterval.nextRotation}
        >
            <div 
                className="cirlce__marker" 
                onClick={clickHandlerMarker}
                onMouseEnter={dateInterval.active ? () => {} : onEnter}
            >
                <div 
                    className={`marker__hover${dateInterval.active ? ' marker__hover--active' : ''}`} 
                    ref={markerHoverRef}
                    onMouseLeave={dateInterval.active ? () => {} : onLeave }
                >
                    <span className="marker__number-text" style={{rotate: `${-dateInterval.currentRotation - (circleRotation % 360) - Math.trunc(circleRotation / 360) * 360}deg`}}
                    >
                        {index + 1}
                    </span>
                    {/* {dateInterval.active && (
                        <div className="marker__category">
                            History
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default CircleMarker;
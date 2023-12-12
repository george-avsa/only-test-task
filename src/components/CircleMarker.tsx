import React from "react";
import { dateInterval } from "../types/dateInterval";

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

    return (
        <div className='marker__block' 
            key={`${dateInterval.firstDate}-${dateInterval.lastDate}`} 
            style={{rotate: `${dateInterval.currentRotation}deg`}}
            data-rotation={dateInterval.nextRotation}
        >
            <div className="cirlce__marker" onClick={clickHandlerMarker}>
                <div 
                    className={`marker__hover${dateInterval.active ? ' marker__hover--active' : ''}`} 
                    style={{rotate: `${-dateInterval.currentRotation - (circleRotation % 360) - Math.trunc(circleRotation / 360) * 360}deg`}}>
                    <span className="marker__number-text">
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
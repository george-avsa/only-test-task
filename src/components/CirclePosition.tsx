import React from "react";
import { dateInterval } from "../types/dateInterval";

type CirclePositionProps = {
    dateIntervals: dateInterval[],
}

function getActiveIndex(dateIntervals: dateInterval[]): number {
    return dateIntervals.find((dateInteval: dateInterval) => dateInteval.active).index
}

function CirclePosition({
    dateIntervals,
}: CirclePositionProps) {
    return (
        <span className='circle__position'>
            0{getActiveIndex(dateIntervals)}/0{Object.keys(dateIntervals).length}
        </span>
    );
}

export default CirclePosition;
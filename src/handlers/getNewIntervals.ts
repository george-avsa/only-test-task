import { dateInterval } from "../types/dateInterval";
import { getMinimizedRotation } from "./getMinimizedRotation";

export function getNewIntervals(dateIntevals: dateInterval[], indexClicked: number): dateInterval[] {
    console.log(indexClicked)
    const newDateIntervals = [...dateIntevals.slice(indexClicked, dateIntevals.length), ...dateIntevals.slice(0, indexClicked)]
    const rotationStep = 360 / newDateIntervals.length;
    let initialRotation = 30;
    const sortedDateInterval  = newDateIntervals.map((dateInteval, i) => {
        const nextMarkerRotation = getMinimizedRotation(initialRotation)
        initialRotation += rotationStep
        if (dateInteval.index === indexClicked + 1) {
            return {...dateInteval, active: true, nextRotation: nextMarkerRotation}
        }
        return {...dateInteval, active: false, nextRotation: nextMarkerRotation}
    });
    return sortedDateInterval;
}
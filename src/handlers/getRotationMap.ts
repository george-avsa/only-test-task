import { dateInterval } from "../types/dateInterval";
import { getMinimizedRotation } from "./getMinimizedRotation";

export function generateRotationMap(dateIntervals: dateInterval[]): dateInterval[] {
    let initialRotation = 30;
    const rotationStep = 360 / dateIntervals.length;    const dateIntervalsMapped = dateIntervals.map(dateInterval => {
        const nextRotation = getMinimizedRotation(initialRotation)
        const rotationMap = {...dateInterval, currentRotation: initialRotation, nextRotation};
        initialRotation += rotationStep
        return rotationMap;
    }); 
    return dateIntervalsMapped;
}
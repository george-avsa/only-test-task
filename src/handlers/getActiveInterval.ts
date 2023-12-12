import { dateInterval } from "../types/dateInterval";

export function getActiveInterval(dateIntervals: dateInterval[]): dateInterval {
    return dateIntervals.find((dateInterval: dateInterval) => {
        return dateInterval.active;
    })
}
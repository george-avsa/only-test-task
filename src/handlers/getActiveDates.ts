import { dateInterval } from "../types/dateInterval";

export function getActiveDates(dateIntervals: dateInterval[]): {
    firstDate: number,
    lastDate: number,
} {
    const activeInteval = dateIntervals.find(dateInterval => dateInterval.active)
    return {
        firstDate: activeInteval.firstDate,
        lastDate: activeInteval.lastDate,
    }
}
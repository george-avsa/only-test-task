import { dateEvent } from "./dateEvent"

export type dateInterval = {
    firstDate: number,
    lastDate: number,
    index: number,
    currentRotation: number,
    nextRotation: number,
    active: boolean,
    category: string
    dateEvents: dateEvent[],
}
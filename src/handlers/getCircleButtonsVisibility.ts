import { CircleButtonsVisibility } from "../types/circleButtonsVisibility";

export function getCircleButtonsVisibility(index: number, dateIntervalsLength: number): CircleButtonsVisibility {
    let initial = {
        left: true,
        right: true,
    }
    if (index === 0) {
        initial.left = false;
    } else if (index === dateIntervalsLength - 1) {
        initial.right = false;
    }
    return initial;
}
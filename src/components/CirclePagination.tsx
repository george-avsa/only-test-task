import React from "react";
import { dateInterval } from "../types/dateInterval";

function CirclePagination({
    dateIntervals,
}: {
    dateIntervals: dateInterval[]
}) {
    return (
        <div className="circle__pagination">
            {dateIntervals.map((dateInterval: dateInterval) => (
                <div key={dateInterval.category} className={`pagination__item ${dateInterval.active ? 'pagination__item--active' : ''}`}></div>
            ))}
        </div>
    );
}

export default CirclePagination;
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import TextScramble from "./TextScramble";

function CircleDates({
    dates
}: {
    dates: {
        firstDate: number,
        lastDate: number,
    }
}) {

    const [intervalIdFirst, setIntervalIdFirst] = useState(null); 
    const [intervalIdLast, setIntervalIdLast] = useState(null);

    return (
        <div className="circle__dates">
            <div className="circle__date circle__date--first">
                <TextScramble intervalId={intervalIdFirst} setIntervalId={setIntervalIdFirst}>{String(dates.firstDate)}</TextScramble>
            </div>
            <div className="circle__date circle__date--second">
                <TextScramble intervalId={intervalIdLast} setIntervalId={setIntervalIdLast}>{String(dates.lastDate)}</TextScramble>
            </div>
        </div>
    );
}

export default CircleDates;
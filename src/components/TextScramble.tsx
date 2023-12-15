import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type  intervalId = ReturnType<typeof setInterval>;

function TextScramble({
    intervalId,
    setIntervalId,
    children
}: {children: string, intervalId: intervalId | null, setIntervalId: Dispatch<SetStateAction<intervalId>>}) {

    const [localDate, setLocalDate] = useState(children);

    const prevValue = useRef(children);

    const dataRef = useRef(null);
    useEffect(() => {
        const prevDate = Number.parseInt(prevValue.current);
        const currentDate = Number.parseInt(children);
        const difference = Math.abs(currentDate - prevDate); 
        const step = difference / (currentDate - prevDate) || 0;
        setLocalDate(() => String(prevDate));
        if (currentDate - prevDate) {
            let localIntervalId = setInterval(() => {
                setLocalDate(localDate => String(Number.parseInt(localDate) + step));
            }, 1000 / difference);
            if (setIntervalId !== null) {
                clearInterval(intervalId);
            }
            setIntervalId(() => localIntervalId);
        }
        prevValue.current = children;

    }, [children]);

    useEffect(() => {
        if (localDate === children) {
            clearInterval(intervalId);
            setIntervalId(null);
        };
    }, [localDate, intervalId]);

    return (
        <p ref={dataRef}>
            {localDate}
        </p>
    );
}

export default TextScramble;
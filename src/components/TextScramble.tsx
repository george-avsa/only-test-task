import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type  keklol = ReturnType<typeof setInterval>;

function TextScramble({
    intervalId,
    setIntervalId,
    children
}: {children: string, intervalId: keklol | null, setIntervalId: Dispatch<SetStateAction<keklol>>}) {

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
            let keklol = setInterval(() => {
                setLocalDate(localDate => String(Number.parseInt(localDate) + step));
            }, 1000 / difference);
            setIntervalId(() => keklol);
        }
        prevValue.current = children;

    }, [children]);

    useEffect(() => {
        if (localDate === children) {
            clearInterval(intervalId);
        };
    }, [localDate, intervalId]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
            setIntervalId(() => null);
        };
    }, [])

    return (
        <p ref={dataRef}>
            {localDate}
        </p>
    );
}

export default TextScramble;
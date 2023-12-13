import React, { useRef, useState } from 'react';
import CirceWrapper from './components/CirceWrapper';
import { Slider } from './components/Slider';
import { data } from './data';

export default function App() {

    const [dateIntervals, setDateIntervals] = useState(data);

    
    const sliderRef = useRef(null);


    return (
        <div className='wrapper'>
            <div className="wrapper__line--horizontal"></div>
            <div className="wrapper__line--right"></div>
            <div className="wrapper__line--left"></div>
            <div className="wrapper__line--center"></div>
            <h1>
                Исторические <br/>даты
                <div className='title__line'></div>
            </h1>
            <CirceWrapper
                sliderRef={sliderRef}
                dateIntervals={dateIntervals}
                setDateIntervals={setDateIntervals}
                ></CirceWrapper>
            <Slider
                sliderRef={sliderRef}
                dateIntervals={dateIntervals}
            ></Slider>
        </div>
    )
}
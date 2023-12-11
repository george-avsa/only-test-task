import React, { useState } from 'react';
import Circle from './components/Circe';
import { Slider } from './components/Slider';

export default function App() {
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
            <Circle></Circle>
            <Slider></Slider>
        </div>
    )
}
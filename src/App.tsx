import React, { useState } from 'react';
import Circle from './components/Circe';

export default function App() {
    return (
        <div className='wrapper'>
            <div className="wrapper__line--horizontal"></div>
            <div className="wrapper__line--right"></div>
            <div className="wrapper__line--left"></div>
            <div className="wrapper__line--center"></div>
            <Circle></Circle>
            <h1>
                Исторические <br/>даты
                <div className='title__line'></div>
            </h1>
        </div>
    )
}
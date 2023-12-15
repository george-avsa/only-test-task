import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";

function SliderItem({dateEvent} : {
    dateEvent: {
        year: number,
        text: string,
    }
}) {

    const sliderItemRef = useRef(null);

    return (
        <div className="slider__content" ref={sliderItemRef}>
            <p className='slider__date'>{dateEvent.year}</p>
            <p className='slider__text'>
                {dateEvent.text}
            </p>
        </div>
    );
}

export default SliderItem;
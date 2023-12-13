import { gsap } from "gsap";
import React, { useEffect } from "react";
import { SwiperSlide } from "swiper/react";

function SliderItem({dateEvent} : {
    dateEvent: {
        year: number,
        text: string,
    }
}) {

    return (
        <div className="slider__content">
            <p className='slider__date'>{dateEvent.year}</p>
            <p className='slider__text'>
                {dateEvent.text}
            </p>
        </div>
    );
}

export default SliderItem;
import React from "react";
import { SwiperSlide } from "swiper/react";

function SliderItem({dateEvent} : {
    dateEvent: {
        year: number,
        text: string,
    }
}) {
    return (
        <>
            <p className='slider__date'>{dateEvent.year}</p>
            <p className='slider__text'>
                {dateEvent.text}
            </p>
        </>
    );
}

export default SliderItem;
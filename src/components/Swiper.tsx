import React, { Dispatch, RefObject, SetStateAction } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SliderItem from "./SliderItem";
import { getControllerVisibility } from "../handlers/getControllerVisibility";
import { dateInterval } from "../types/dateInterval";
import { getActiveInterval } from "../handlers/getActiveInterval";

type SwiperProps = {
    sliderRef: RefObject<HTMLDivElement | any>,
    setControllerVisibility: Dispatch<SetStateAction<{left: boolean, right:boolean}>>,
    dateIntervals: dateInterval[],
}

function SwiperComponent({
    dateIntervals,
    sliderRef,
    setControllerVisibility,
}: SwiperProps) {

    function handleProgressSwipe() {
        setControllerVisibility(getControllerVisibility(sliderRef.current.swiper))
    }

    return (
        <Swiper
            ref={sliderRef}
            spaceBetween={50}
            slidesPerView={3}
            onProgress={handleProgressSwipe}
        >
            {getActiveInterval(dateIntervals).dateEvents.map((dateEvent, i) => (
            <SwiperSlide key={`${dateEvent.text.slice(0, 20)}${dateEvent.year}`}>
                <SliderItem dateEvent={dateEvent}></SliderItem>
            </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperComponent;
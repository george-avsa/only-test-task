import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SliderItem from "./SliderItem";
import { getControllerVisibility } from "../handlers/getControllerVisibility";
import { dateInterval } from "../types/dateInterval";
import { getActiveInterval } from "../handlers/getActiveInterval";
import { gsap } from "gsap";
import { getActiveDates } from "../handlers/getActiveDates";
import { data } from "../data";

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

    useEffect(() => {
        sliderRef.current.swiper.setProgress(0, 300);
    }, [dateIntervals])

    useEffect(() => {
            gsap.to(sliderRef.current, {opacity: 0, duration: .5})
            setTimeout(() => {
                gsap.to(sliderRef.current, {opacity: 1, duration: .5})
            }, 500);
    }, [dateIntervals]);

    return (
        <Swiper
            ref={sliderRef}
            spaceBetween={50}
            slidesPerView={3}
            initialSlide={0}
            onProgress={handleProgressSwipe}
        >
            {getActiveInterval(dateIntervals).dateEvents.map((dateEvent, i) => (
                <SwiperSlide key={`${dateEvent.text.slice(0 ,20)}${dateEvent.year}`} data-smth={`${dateEvent.text.slice(0, 20)}${dateEvent.year}`}>
                    <SliderItem dateEvent={dateEvent}></SliderItem>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperComponent;
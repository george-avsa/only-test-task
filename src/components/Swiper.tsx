import React, { Dispatch, RefObject, SetStateAction } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SliderItem from "./SliderItem";
import { getControllerVisibility } from "../handlers/getControllerVisibility";

type SwiperProps = {
    sliderRef: RefObject<HTMLDivElement | any>,
    setControllerVisibility: Dispatch<SetStateAction<{left: boolean, right:boolean}>>
}

function SwiperComponent({
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
            {['Привет', 'как дела?', 'Меня зовут', 'Георгий'].map((word, i) => (
            <SwiperSlide>
                <SliderItem></SliderItem>
            </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperComponent;
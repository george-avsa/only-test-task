import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {ReactComponent as SearchIcon} from './../assets/arrowSlider.svg';
import SliderItem from './SliderItem';
import SwiperComponent from './Swiper';

export const Slider = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const [controllerVisibility, setControllerVisibility] = useState({
    left: false,
    right: true,
  });

  return (
    <div className='slider'>
      <SwiperComponent
        sliderRef={sliderRef}
        setControllerVisibility={setControllerVisibility}
      ></SwiperComponent>
      {controllerVisibility.left && (
        <div className='slider-controller slider-controller--left'  onClick={handlePrev}>
          <SearchIcon />
        </div>
      )}
      {controllerVisibility.right && (
        <div className='slider-controller slider-controller--right' onClick={handleNext}>
          <SearchIcon />
        </div>
      )}
    </div>
  )
};

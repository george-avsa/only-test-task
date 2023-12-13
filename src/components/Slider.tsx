import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {ReactComponent as SearchIcon} from './../assets/arrowSlider.svg';
import SliderItem from './SliderItem';
import SwiperComponent from './Swiper';
import { dateInterval } from '../types/dateInterval';
import { getControllerVisibility } from '../handlers/getControllerVisibility';
import { gsap } from 'gsap';
import { getActiveDates } from '../handlers/getActiveDates';

export const Slider = ({
  dateIntervals,
  sliderRef,
}: {
  dateIntervals: dateInterval[],
  sliderRef: RefObject<any>,
}) => {

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

  useEffect(() => {
    setControllerVisibility(getControllerVisibility(sliderRef.current.swiper));
  }, []);

  return (
    <div className='slider'>
      <SwiperComponent
        dateIntervals={dateIntervals}
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

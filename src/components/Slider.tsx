import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {ReactComponent as SearchIcon} from './../assets/arrowSlider.svg';

function getControllerVisibility(swiper: {isBeginning: boolean, isEnd: boolean}) {
  let controllerVisibility = {
    left: true, right: true
  };
  if (swiper.isBeginning) {
    controllerVisibility = {
      left: false,
      right: true,
    } 
  } else if (swiper.isEnd) {
    controllerVisibility = {
      left: true,
      right: false,
    }
  }
  return controllerVisibility;
}

export const Slider = () => {
  const sliderRef = useRef(null);

  function handleProgressSwipe() {
    setControllerVisibility(getControllerVisibility(sliderRef.current.swiper))
  }

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

  useEffect(() => {console.log(controllerVisibility)}, [controllerVisibility])

  return <div className='slider'>
  <Swiper
  ref={sliderRef}
  // install Swiper modules
  spaceBetween={50}
  slidesPerView={3}
  onProgress={handleProgressSwipe}
>
  <SwiperSlide>
    <p className='slider__date'>2021</p>
    <p className='slider__text'>
      13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
    </p>
  </SwiperSlide>
  <SwiperSlide>
    <p className='slider__date'>2021</p>
    <p className='slider__text'>
      13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
    </p>
  </SwiperSlide>
  <SwiperSlide>
    <p className='slider__date'>2021</p>
    <p className='slider__text'>
      13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
    </p>
  </SwiperSlide>
  <SwiperSlide>
    <p className='slider__date'>2021</p>
    <p className='slider__text'>
      13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
    </p>
  </SwiperSlide>
  <SwiperSlide>
    <p className='slider__date'>2021</p>
    <p className='slider__text'>
      13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
    </p>
  </SwiperSlide>
  
</Swiper>

  {controllerVisibility.left && (
    <div className='slider-controller slider-controller--left' onClick={handlePrev}>
      <SearchIcon />
    </div>
  )}
  {controllerVisibility.right && (
    <div className='slider-controller' onClick={handleNext}>
      <SearchIcon />
    </div>
  )}
  </div>
};

export function getControllerVisibility(swiper: {isBeginning: boolean, isEnd: boolean}) {
    let controllerVisibility = {
      left: true, right: true
    };
    if (swiper.isEnd && swiper.isBeginning) {
      controllerVisibility = {
        left: false,
        right: false,
      } 
    } else if (swiper.isBeginning) {
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
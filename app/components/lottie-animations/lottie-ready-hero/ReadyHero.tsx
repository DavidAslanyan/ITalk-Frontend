import Lottie from "lottie-react";
import lottie from './hero.json';


const ReadyHeroAnimation = ({ width = "max-w-[28rem]" }: { width?: string }) => {
  return (
  <div className={`w-full ${width}`}>
    <Lottie animationData={lottie} loop={false}  />
  </div>
  );
};


export default ReadyHeroAnimation;

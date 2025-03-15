import Lottie from "lottie-react";
import lottie from './hero.json';


const RegisterHeroAnimation = ({ width = "max-w-[28rem]" }: { width?: string }) => {
  return (
  <div className={`w-full ${width}`}>
    <Lottie animationData={lottie} />
  </div>
  );
};


export default RegisterHeroAnimation;

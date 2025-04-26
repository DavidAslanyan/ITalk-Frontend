import Lottie from "lottie-react";
import lottie from './success.json';


const SuccessAnimation = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} loop={false} />
  </div>
  );
};


export default SuccessAnimation;

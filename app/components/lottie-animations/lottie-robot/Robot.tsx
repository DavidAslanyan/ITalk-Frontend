import Lottie from "lottie-react";
import lottie from './lottie-robot.json';


const Robot = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </div>
  );
};


export default Robot;

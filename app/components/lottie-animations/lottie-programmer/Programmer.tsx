import Lottie from "lottie-react";
import lottie from './lottie-programmer.json';


const Programmer = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </div>
  );
};


export default Programmer;

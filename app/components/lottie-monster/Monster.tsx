import Lottie from "lottie-react";
import lottieMonster from './lottie-monster.json';


const Monster = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottieMonster} />
  </div>
  );
};


export default Monster;

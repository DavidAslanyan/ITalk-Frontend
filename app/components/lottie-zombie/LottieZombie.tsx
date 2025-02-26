import Lottie from "lottie-react";
import lottieZombie from './lottie-zombie.json';


const Zombie = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottieZombie} />
  </div>
  );
};


export default Zombie;

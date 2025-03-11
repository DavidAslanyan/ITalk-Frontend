import Lottie from "lottie-react";
import lottie from './coins.json';

type CoinsType = {
  width?: string;
}

const Coins: React.FC<CoinsType> = ({
  width =  "max-w-[20rem]"
}) => {
  return (
  <div className={`w-full ${width}`}>
    <Lottie animationData={lottie} loop={false} />
  </div>
  );
};


export default Coins;

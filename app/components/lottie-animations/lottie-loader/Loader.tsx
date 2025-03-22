import Lottie from "lottie-react";
import lottie from './loader.json';

type LoadingProps = {
  width?: string;
}

const Loader: React.FC<LoadingProps> = ({ width = "max-w-[10rem]" }) => {
  return (
  <div className={`w-full ${width}`}>
    <Lottie animationData={lottie} />
  </div>
  );
};


export default Loader;

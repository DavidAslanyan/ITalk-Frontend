import Lottie from "lottie-react";


type LottieAnimationProps = {
  width?: string;
  data: any;
  loop?: boolean
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  width = "max-w-[28rem]",
  data,
  loop = true
}) => {
  return (
  <div className={`w-full ${width}`}>
    <Lottie animationData={data} loop={loop}  />
  </div>
  );
};


export default LottieAnimation;

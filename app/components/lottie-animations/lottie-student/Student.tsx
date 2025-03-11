import Lottie from "lottie-react";
import lottie from './lottie-student.json';


const Student = () => {
  return (
  <div className="w-full max-w-[20rem]">
    <Lottie animationData={lottie} />
  </div>
  );
};


export default Student;

"use client";
import React, { useState } from "react";
import InputCustom from "../components/input";
import ButtonStandard from "../components/buttons/button-standard";
import EmailIcon from "../components/icons/EmailIcon";
import { COLORS } from "../utilities/constants/colors";
import LockIcon from "../components/icons/LockIcon";
import Checkbox from "../components/checkbox";
import Link from "next/link";
import { LOGIN_URL, POLICY_URL } from "../utilities/constants/global-urls";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../utilities/constants/regex-statements";
import { googleLoginMutation, registerUserMutation } from "../services/queries/auth.query";
import { useRouter } from "next/navigation";
import { RegisterUserFormType } from "../utilities/types/auth.type";
import { DifficultyLevel } from "../utilities/enums/difficulty-level.enum";
import { ResponseEnum } from "../utilities/enums/response.enum";
import Popup from "../components/popup";
import { HttpStatusCode } from "../utilities/enums/status-codes.enum";
import FailIcon from "../components/icons/FailIcon";
import { GoogleLogin } from "@react-oauth/google";
import ArrowIcon from "../components/icons/ArrowIcon";
import { AVATARS } from "../utilities/constants/shop-items";
import Image from "next/image";
import { PROJECT_TITLE } from "../utilities/constants/global-data";
import RegisterHeroAnimation from "../components/lottie-animations/lottie-register-hero";
import ReadyHeroAnimation from "../components/lottie-animations/lottie-ready-hero";
import CheckedAnimation from "../components/lottie-animations/lottie-checked";


const SELECT_AVATRS = [
  {
    id: 1,
    title: "Male",
    url: AVATARS.male1
  },
  {
    id: 2,
    title: "Female",
    url: AVATARS.female1
  }
];

const Register = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: "",
  });
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(DifficultyLevel.EASY);
  const [policyChecked, setPolicyChecked] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(SELECT_AVATRS[0].url);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [popup, setPopup] = useState<ResponseEnum | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateSecondStepInputs() && validateFirstStepInputs()) {
      const finalFormData = { ...formData, difficultyLevel, avatarUrl: avatar };
      handleRegister(finalFormData);
    }
  }

  const handleNextStepClick = (e: any) => {
    e.preventDefault();
    if (validateFirstStepInputs()) {
      setStep(step + 1);
    }
  }

  const validateSecondStepInputs = (): boolean => {
    if (!policyChecked) {
      setErrorMessage("Please, click the checkbox to accept our policies");
      return false;
    }

    setErrorMessage("");
    return true;
  }

  const validateFirstStepInputs = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.rPassword) {
      setErrorMessage("Please, fill in all the required fields");
      return false;
    }

    if (!REGEX_EMAIL.test(formData.email)) {
      setErrorMessage("Please provide a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters");
      return false;
    } 

    if (!REGEX_PASSWORD.test(formData.password)) {
      setErrorMessage("Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character");
      return false;
    }

    if (formData.password !== formData.rPassword) {
      setErrorMessage("Passwords don't match");
      return false;
    }

    setErrorMessage("");
    return true;
  }


  const { mutate: registerUser } = registerUserMutation();
  const { mutate: googleLogin } = googleLoginMutation();

  const handleRegister = (formData: RegisterUserFormType) => {
    registerUser(formData, {
      onSuccess: (data) => {
        if (data?.status === HttpStatusCode.CREATED) {
          setPopup(ResponseEnum.SUCCESS);
        } else {
          setPopup(ResponseEnum.FAIL);
          setErrorMessage(data?.error);
        }
      },
      onError: (error) => {
        console.error("Error registering user:", error);
        setPopup(ResponseEnum.FAIL);
      },
    });
  };

  const handleGoogleLogin = (id: string) => {
    const data = {
      id: id
    }
    googleLogin(data, {
      onSuccess: (data) => {

      }
    })
  }

  const handleBackCLick = () => {
    setStep(step - 1);
  }

  return (
    <>
    <div className="bg-white flex md:justify-center md:items-center h-[120vh] md:h-screen">
    <div className="flex-1">
      {step === 1 &&
      <button onClick={handleBackCLick} className='flex items-center pt-10 md:pt-0 md:pl-4'>
        <div className='transform rotate-90'>
          <ArrowIcon width={30} height={30} />
        </div>
        <p className='text-md font-semibold text-secondary'>Back</p>
      </button>
      }
      <div className="md:hidden flex items-center justify-center">
        <RegisterHeroAnimation width="max-w-[20rem]" />
      </div>
      <h1 className="text-3xl pb-10 text-secondary font-bold pl-4 xl:pl-16 pr-4 text-center md:text-start">Become a member of our great community</h1>
      {step === 1 
      ? 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="max-w-[30rem] flex flex-col gap-5 ml-4 xl:ml-16 mr-4">
        <label className="text-base text-secondary font-semibold" htmlFor="diffcultyLevel">Select Your Avatar</label>
          <ul className="flex items-center gap-5">
            {SELECT_AVATRS.map((item) => (
              <li onClick={() => setAvatar(item.url)} className="cursor-pointer flex flex-col items-center" key={item.id}>
                <div className={`border-4 rounded-full ${avatar === item.url ? "border-primaryGreen" : "border-thirdly"}`}>
                  <Image className='rounded-sm object-cover' style={{width: "6rem", height: "6rem"}}  width={120} height={120} src={item.url} alt={item.title} />
                </div>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
          
          <div>
            <label className="text-base text-secondary font-semibold" htmlFor="diffcultyLevel">Select Your Difficulty Level</label>
            <div className="pt-2 flex justify-between gap-3">
              <button onClick={() => setDifficultyLevel(DifficultyLevel.EASY)} type="button" className={`${difficultyLevel === DifficultyLevel.EASY ? "bg-primary border-primary text-white" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.EASY}</button>
              <button onClick={() => setDifficultyLevel(DifficultyLevel.MEDIUM)} type="button" className={`${difficultyLevel === DifficultyLevel.MEDIUM ? "bg-primary border-primary text-white" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.MEDIUM}</button>
              <button onClick={() => setDifficultyLevel(DifficultyLevel.HARD)} type="button" className={`${difficultyLevel === DifficultyLevel.HARD ? "bg-primary border-primary text-white" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.HARD}</button>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2">
            <Checkbox checked={policyChecked} setChecked={setPolicyChecked} />
            <p>By creating an account you agree to the terms of use and our <Link className="text-secondary font-semibold underline" href={POLICY_URL}>privacy policy</Link></p>
          </div>

          {errorMessage &&
          <p className="text-base text-red-600">{errorMessage}</p>
          }

          <ButtonStandard type="submit" title="Sign Up" />

        </div>
      </form>
      : 
      <form onSubmit={(e) => handleNextStepClick(e)}>
        <div className="max-w-[30rem] flex flex-col gap-5 ml-4 xl:ml-16 mr-4">
          <div className="flex justify-between gap-2">
            <InputCustom
              maxLength={15}
              name="firstName"
              onChange={(e) => handleFormChange(e)}
              value={formData.firstName}
              label="First Name"
              placeholder="John"
            />

            <InputCustom
              maxLength={15}
              name="lastName"
              onChange={(e) => handleFormChange(e)}
              value={formData.lastName}
              label="Last Name"
              placeholder="Smith"
            />
          </div>

          <InputCustom
            maxLength={120}
            name="email"
            onChange={(e) => handleFormChange(e)}
            value={formData.email}
            label="Email"
            type="email"
            icon={<EmailIcon color={COLORS.thirdly} />}
            placeholder="example@gmail.com"
          />

          <InputCustom
            isPassword={true}
            name="password"
            onChange={(e) => handleFormChange(e)}
            value={formData.password}
            label="Password"
            icon={<LockIcon color={COLORS.thirdly} />}
          />

          <InputCustom
            isPassword={true}
            name="rPassword"
            onChange={(e) => handleFormChange(e)}
            value={formData.rPassword}
            label="Confirm Password"
            icon={<LockIcon color={COLORS.thirdly} />}
          />

          <ButtonStandard type="submit" title="Continue" />

          {errorMessage &&
          <p className="text-base text-red-600">{errorMessage}</p>
          }

          <div>
            {/* <GoogleButton title="Sign Up with Google" onClick={() => {}}/> */}
            <GoogleLogin 
              onSuccess={(response) => {
                console.log(response)
              }}  
            />
          </div>

          <div>
            <p>Already have an account? <Link className="font-semibold text-primary" href={LOGIN_URL}>Log in</Link></p>
          </div>
        </div>
      </form>
      }
    </div>

    <div className="flex-1 h-screen hidden md:flex flex-col justify-center items-center">
      <RegisterHeroAnimation />
      <h1 className="text-secondary text-3xl xl:text-5xl ">Join <span className="text-primary font-bold">{PROJECT_TITLE}</span> Community!</h1>
    </div>
    </div>
   
    <Popup isOpen={popup !== null}>
      <div className="flex flex-col items-center justify-center py-5 px-10">
        {popup === ResponseEnum.SUCCESS
        ?
        <>
        <div className="flex justify-center items-center">
          <div className="pt-7">
            <CheckedAnimation width="max-w-[17rem]" />
          </div>
          <ReadyHeroAnimation width="max-w-[18rem]" />
        </div>
        <span className="py-3 text-lg text-green-600 font-bold">Welcome aboard, {formData.firstName}</span>
        <p className="text-center text-secondary text-md font-medium pb-10">Congrats, you successfully created your account. Now, let's login and jump right into action !</p>
        <ButtonStandard onClick={() => router.push(LOGIN_URL)} title="Login"/>
        </>
        :
        <>
        <FailIcon width={120} height={120} color={COLORS.primaryRed} />
        <span className="py-3 text-2xl text-red-600 font-bold">FAIL</span>
        <p className="text-center">{errorMessage}</p>
        <button onClick={() => setPopup(null)} className="mt-2 border-2 border-thirdly px-3 py-2 text-md font-semibold text-secondary rounded-sm">Try Again</button>
        </>
        }
      </div>
    </Popup>
    </>
  );
};

export default Register;

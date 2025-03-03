"use client";
import React, { useState } from "react";
import InputCustom from "../components/input";
import ButtonStandard from "../components/buttons/button-standard";
import EmailIcon from "../components/icons/EmailIcon";
import { COLORS } from "../utilities/constants/colors";
import LockIcon from "../components/icons/LockIcon";
import Checkbox from "../components/checkbox";
import Link from "next/link";
import { DASHBOARD_URL, LOGIN_URL, POLICY_URL } from "../utilities/constants/global-urls";
import GoogleButton from "../components/buttons/google-button";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../utilities/constants/regex-statements";
import { registerUserMutation } from "../services/queries/auth.query";
import { useRouter } from "next/navigation";
import { RegisterUserFormType } from "../utilities/types/auth.type";
import { DifficultyLevel } from "../utilities/enums/difficulty-level.enum";
import { ResponseEnum } from "../utilities/enums/response.enum";
import Popup from "../components/popup";
import { HttpStatusCode } from "../utilities/enums/status-codes.enum";
import SuccessIcon from "../components/icons/SuccessIcon";
import FailIcon from "../components/icons/FailIcon";


const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: ""
  });
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(DifficultyLevel.EASY);
  const [policyChecked, setPolicyChecked] = useState<boolean>(false);
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

    if (validateInputs()) {
      const finalFormData = { ...formData, difficultyLevel };
      handleRegister(finalFormData);
    }
  }

  const validateInputs = (): boolean => {
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

    if (!policyChecked) {
      setErrorMessage("Please, click the checkbox to accept our policies");
      return false;
    }

    setErrorMessage("");
    return true;
  }


  const { mutate: registerUser } = registerUserMutation();

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


  return (
    <div className="bg-white flex justify-center items-center h-[120vh] md:h-screen">
      <div className="py-12 flex-1">
        <h1 className="text-3xl pb-10 text-secondary font-bold pl-4 xl:pl-16 pr-4">Become a member of our great community</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
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

          <div>
            <label className="text-base text-secondary font-semibold" htmlFor="diffcultyLevel">Difficulty Level</label>
            <div className="pt-2 flex justify-between gap-3">
              <button onClick={() => setDifficultyLevel(DifficultyLevel.EASY)} type="button" className={`${difficultyLevel === DifficultyLevel.EASY ? "bg-primary border-secondary" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.EASY}</button>
              <button onClick={() => setDifficultyLevel(DifficultyLevel.MEDIUM)} type="button" className={`${difficultyLevel === DifficultyLevel.MEDIUM ? "bg-primary border-secondary" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.MEDIUM}</button>
              <button onClick={() => setDifficultyLevel(DifficultyLevel.HARD)} type="button" className={`${difficultyLevel === DifficultyLevel.HARD ? "bg-primary border-secondary" : "bg-white border-thirdly" } text-secondary text-base font-semibold capitalize border-2 py-1 w-full max-w-[9rem] rounded-sm transition-all`}>{DifficultyLevel.HARD}</button>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2">
            <Checkbox checked={policyChecked} setChecked={setPolicyChecked} />
            <p>By creating an account you agree to the terms of use and our <Link className="text-secondary font-semibold underline" href={POLICY_URL}>privacy policy</Link></p>
          </div>

          <ButtonStandard type="submit" title="Sign Up" />

          {errorMessage &&
          <p className="text-base text-red-600">{errorMessage}</p>
          }

          <div>
            <GoogleButton title="Sign Up with Google" onClick={() => {}}/>
          </div>

          <div>
            <p>Already have an account? <Link className="font-semibold" href={LOGIN_URL}>Log in</Link></p>
          </div>
        </div>
        </form>
      </div>

      <div className="bg-secondary flex-1 h-screen hidden md:block">
        <h1 className="text-white text-3xl xl:text-5xl flex justify-center items-center gap-2 h-screen">Join <span className="text-primary">Solaris</span> Community!</h1>
      </div>


      <Popup isOpen={popup !== null}>
        <div className="flex flex-col items-center justify-center py-5 px-10">
          {popup === ResponseEnum.SUCCESS
          ?
          <>
          <SuccessIcon width={120} height={120} color={COLORS.primaryGreen} />
          <span className="py-3 text-2xl text-green-600 font-bold">SUCCESS</span>
          <p className="text-center pb-10">Congrats, you successfully created your account. Now, let's jump right into action !</p>
          <ButtonStandard onClick={() => router.push(DASHBOARD_URL)} title="Begin My Journey"/>
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
    </div>
  );
};

export default Register;

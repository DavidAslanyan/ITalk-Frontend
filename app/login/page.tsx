"use client";
import React, { useState } from "react";
import InputCustom from "../components/input";
import ButtonStandard from "../components/buttons/button-standard";
import EmailIcon from "../components/icons/EmailIcon";
import { COLORS } from "../utilities/constants/colors";
import LockIcon from "../components/icons/LockIcon";
import Link from "next/link";
import { DASHBOARD_URL, REGISER_URL } from "../utilities/constants/global-urls";
import GoogleButton from "../components/buttons/google-button";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../utilities/constants/regex-statements";
import { LoginUserFormType } from "../utilities/types/auth.type";
import { loginUserMutation } from "../services/queries/auth.query";
import { HttpStatusCode } from "../utilities/enums/status-codes.enum";
import { useRouter } from "next/navigation";
import RegisterHeroAnimation from "../components/lottie-animations/lottie-register-hero";
import { PROJECT_TITLE } from "../utilities/constants/global-data";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";


const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginUserFormType>({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

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
      handleLogin(formData);
    }
  }

  const validateInputs = (): boolean => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Please, fill in all the required fields");
      return false;
    }

    if (!REGEX_EMAIL.test(formData.email)) {
      setErrorMessage("Please provide a your valid email address");
      return false;
    }

    if (!REGEX_PASSWORD.test(formData.password)) {
      setErrorMessage("Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character");
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Your password must contain at least 8 characters");
      return false;
    } 

    setErrorMessage("");
    return true;
  }

  const { mutate: loginUser } = loginUserMutation();
  
  const handleLogin = (formData: LoginUserFormType) => {
    loginUser(formData, {
      onSuccess: (data) => {
        if (data?.status === HttpStatusCode.ACCEPTED) {
          dispatch(setUser(data.data.user));
          router.push(DASHBOARD_URL);
        } else {
          setErrorMessage(data?.error);
        }
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });
  };

  return (
    <div className="bg-white flex md:justify-center md:items-center h-[120vh] md:h-screen">
      <div className="flex-1">
        <div className="md:hidden flex items-center justify-center">
          <RegisterHeroAnimation width="max-w-[20rem]" />
        </div>
        <h1 className="text-3xl pb-10 text-secondary font-bold pl-4 xl:pl-16 pr-4">Sign in</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="max-w-[30rem] flex flex-col gap-5 ml-4 xl:ml-16 mr-4">
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

          <ButtonStandard type="submit" title="Sign In" />

          {errorMessage &&
          <p className="text-base text-red-600">{errorMessage}</p>
          }

          <div>
            <GoogleButton title="Sign In with Google" onClick={() => {}}/>
          </div>

          <div>
            <p>Don't have an account? <Link className="font-semibold text-primary" href={REGISER_URL}>Register</Link></p>
          </div>
        </div>
        </form>
      </div>

      <div className="flex-1 h-screen hidden md:flex flex-col justify-center items-center">
        <RegisterHeroAnimation />
        <h1 className="text-secondary text-3xl xl:text-5xl ">Join <span className="text-primary font-bold">{PROJECT_TITLE}</span> Community!</h1>
      </div>
    </div>
  );
};

export default Login;

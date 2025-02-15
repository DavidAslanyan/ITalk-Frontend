"use client";
import React, { useState } from "react";
import InputCustom from "../components/input";
import ButtonStandard from "../components/buttons/button-standard";
import EmailIcon from "../components/icons/EmailIcon";
import { COLORS } from "../utilities/constants/colors";
import LockIcon from "../components/icons/LockIcon";
import Link from "next/link";
import { REGISER_URL } from "../utilities/constants/global-urls";
import GoogleButton from "../components/buttons/google-button";
import { REGEX_EMAIL } from "../utilities/constants/regex-statements";


const Login = () => {
  const [formData, setFormData] = useState({
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
      console.log("Success: ", formData);
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

    if (formData.password.length < 8) {
      setErrorMessage("Your password must contain at least 8 characters");
      return false;
    } 

    setErrorMessage("");
    return true;
  }


  return (
    <div className="bg-white flex justify-center items-center h-[120vh] md:h-screen">
      <div className="py-12 flex-1">
        <h1 className="text-3xl pb-10 text-secondary font-bold pl-4 xl:pl-16 pr-4">Login</h1>
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
            <p>Don't have an account? <Link className="font-semibold" href={REGISER_URL}>Register</Link></p>
          </div>

          <div>
            <GoogleButton title="Sign In with Google" onClick={() => {}}/>
          </div>
        </div>
        </form>
      </div>

      <div className="bg-secondary flex-1 h-screen hidden md:block">
        <h1 className="text-white text-3xl xl:text-5xl flex justify-center items-center gap-2 h-screen">Join <span className="text-primary">Solaris</span> Community!</h1>
      </div>
    </div>
  );
};

export default Login;

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
import GoogleButton from "../components/buttons/google-button";
import { REGEX_EMAIL } from "../utilities/constants/regex-statements";


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: "",
  });

  const [policyChecked, setPolicyChecked] = useState<boolean>(false);
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
    </div>
  );
};

export default Register;

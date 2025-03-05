"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import AvatarBorder from '@/app/components/avatar-border/AvatarBorder';
import InputCustom from '@/app/components/input';
import EmailIcon from '@/app/components/icons/EmailIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import LockIcon from '@/app/components/icons/LockIcon';
import ButtonStandard from '@/app/components/buttons/button-standard';
import ButtonSecondary from '@/app/components/buttons/button-secondary/ButtonSecondary';
import Popup from '@/app/components/popup';
import AvatarStore from '@/app/components/avatar-store/AvatarStore';
import LargePopup from '@/app/components/large-popup';

const profileData = {
  avatarURL: "/user-avatars/male-1.png",
  purchasedAvatars: [
    "/user-avatars/male-1.png",
    "/user-avatars/female-1.png",
    "/user-avatars/male-2.png",
    "/user-avatars/female-2.png",
    "/user-avatars/male-3.png",
    "/user-avatars/female-3.png",
    "/user-avatars/limited-1.png",
    "/user-avatars/limited-2.png",
    "/user-avatars/limited-3.png",
    "/user-avatars/limited-4.png",
    "/user-avatars/limited-5.png",
    "/user-avatars/limited-6.png",
  ],
  coins: 75,
  rang: "Student",
  rangURL: "/rangs/rang-1.png",
  firstName: "David",
  lastName: "Aslanyan",
  email: "david@gmail.com",
  progress: 150,
};


const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    password: "",
    newPassword: ""
  });
  const [avatar, setAvatar] = useState(profileData.avatarURL);
  
  const [avatarPopupOpen, setAvatarPopupOpen] = useState<boolean>(true);
  const [framePopupOpen, setFramePopupOpen] = useState<boolean>(false);
  

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    
  return (
    <div className='h-[150vh] md:h-auto'>
      <h1 className="text-secondary text-2xl font-semibold">Edit Profile</h1>

      <section className='pt-10'>
        <AvatarBorder>
          <Image
            width={200}
            height={200}
            src={avatar}
            alt="prfile avatar"
          />
        </AvatarBorder>
        <div className='pt-5 flex gap-3 items-center'>
          <ButtonSecondary onClick={() => setAvatarPopupOpen(true)} title='Change Avatar' />
          <ButtonSecondary title='Change Frame' />
        </div>
      </section>

      <section className='pt-5 flex flex-col sm:flex-row  gap-5 max-w-[34rem]'>
        <InputCustom
          maxLength={15}
          name="firstName"
          onChange={(e) => handleFormChange(e)}
          value={formData.firstName}
          label="First Name"
          placeholder="Type here"
        />

        <InputCustom
          maxLength={15}
          name="lastName"
          onChange={(e) => handleFormChange(e)}
          value={formData.lastName}
          label="Last Name"
          placeholder="Type here"
        />
      </section>

      <section className='pt-5 flex flex-col sm:flex-row max-w-[34rem]'>
        <InputCustom
          maxLength={15}
          name="email"
          onChange={(e) => handleFormChange(e)}
          value={formData.email}
          label="Email"
          type="email"
          icon={<EmailIcon color={COLORS.thirdly} />}
          placeholder="Type here"
        />
      </section>

      <section className='pt-5 flex flex-col sm:flex-row  gap-5 max-w-[34rem]'>
        <InputCustom
          isPassword={true}
          maxLength={15}
          name="password"
          onChange={(e) => handleFormChange(e)}
          value={formData.password}
          label="Old Password"
          icon={<LockIcon color={COLORS.thirdly} />}
          placeholder="Type here"
        />

        <InputCustom
          isPassword={true}
          maxLength={15}
          name="newPassword"
          onChange={(e) => handleFormChange(e)}
          value={formData.newPassword}
          label="New Password"
          icon={<LockIcon color={COLORS.thirdly} />}
          placeholder="Type here"
        />
      </section>

      <div className='pt-10 flex gap-3'>
        <ButtonStandard title='Save Changes' />
        <ButtonSecondary title='Reset' />
      </div>



      <LargePopup 
      isOpen={avatarPopupOpen}
      maxWidth='max-w-[60rem]'
      >
        <div>
          <AvatarStore  
            avatar={avatar}
            setAvatar={setAvatar}
            setPopup={setAvatarPopupOpen}
            purchasedAvatars={profileData.purchasedAvatars}
          />
        </div>
      </LargePopup>

    </div>
  )
}

export default EditProfile;


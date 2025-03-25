"use client";
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import AvatarFrame from '@/app/components/avatar-frame/AvatarFrame';
import InputCustom from '@/app/components/input';
import EmailIcon from '@/app/components/icons/EmailIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import LockIcon from '@/app/components/icons/LockIcon';
import ButtonStandard from '@/app/components/buttons/button-standard';
import ButtonSecondary from '@/app/components/buttons/button-secondary/ButtonSecondary';
import Popup from '@/app/components/popup';
import AvatarCloset from '@/app/components/user-closet/avatar-closet/AvatarCloset';
import LargePopup from '@/app/components/large-popup';
import FrameCloset from '@/app/components/user-closet/frame-closet';
import BackgroundContainer from '@/app/components/background-container';
import BackgroundCloset from '@/app/components/user-closet/background-closet';
import { getUserQuery, updateUserMutation } from '@/app/services/queries/auth.query';
import { HttpStatusCode } from '@/app/utilities/enums/status-codes.enum';
import { useRouter } from 'next/navigation';
import { DASHBOARD_URL, PROFILE } from '@/app/utilities/constants/global-urls';
import FailIcon from '@/app/components/icons/FailIcon';
import EditIcon from '@/app/components/icons/EditIcon';
import Loading from '@/app/components/loading';


// const profileData = {
//   id: "6cadc416-677a-4aaf-8a69-fdbf53b8d761",
//   avatarURL: "/user-avatars/male-1.png",
//   frame: "def",
//   purchasedAvatars: [
//     "/user-avatars/male-1.png",
//     "/user-avatars/female-1.png",
//     "/user-avatars/male-2.png",
//     "/user-avatars/female-2.png",
//     "/user-avatars/male-3.png",
//     "/user-avatars/female-3.png",
//     "/user-avatars/limited-1.png",
//     "/user-avatars/limited-2.png",
//     "/user-avatars/limited-3.png",
//     "/user-avatars/limited-4.png",
//     "/user-avatars/limited-5.png",
//     "/user-avatars/limited-6.png",
//   ],
//   purchasedBackgrounds: [
//     BACKGROUNDS.def,
//     BACKGROUNDS.cover1,
//     BACKGROUNDS.cover2,
//     BACKGROUNDS.cover3,
//     BACKGROUNDS.cover4,
//     BACKGROUNDS.cover5,
//     BACKGROUNDS.cover6,
//     BACKGROUNDS.cover7,
//     BACKGROUNDS.cover8,
//     BACKGROUNDS.cover9,
//   ],
//   purchasedFrames: [
//     FRAMES.def, 
//     FRAMES.black, 
//     FRAMES.red, FRAMES.blue, FRAMES.lightBlue, FRAMES.orange, FRAMES.purple,
//     FRAMES.yellow, FRAMES.pink, FRAMES.teal, FRAMES.lime, FRAMES.indigo, FRAMES.rose,
//     FRAMES.amber, FRAMES.cyan, FRAMES.emerald, FRAMES.violet
//   ],
//   coins: 75,
//   backgroundUrl: BACKGROUNDS.cover2,
//   rang: "Student",
//   rangURL: "/rangs/rang-1.png",
//   firstName: "David",
//   lastName: "Aslanyan",
//   email: "david@gmail.com",
//   progress: 150,
// };


const EditProfile = () => {
  const router = useRouter();
  const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    if (!user) return null;
    return {
      firstName: user.data.firstName,
      lastName: user.data.lastName,
      email: user.data.email,
      difficultyLevel: user.data.difficultyLevel,
      avatar: user.data.avatar,
      background: user.data.background,
      frame: user.data.frame,
      ownedAvatars: user.data.ownedAvatars,
      ownedFrames: user.data.ownedFrames,
      ownedBackgrounds: user.data.ownedBackgrounds
    };
  }, [user]); 

  useEffect(() => {
    if (userMappedData) {
      setFormData((prev) => ({
        ...prev,
        firstName: userMappedData.firstName || "",
        lastName: userMappedData.lastName || "",
        email: userMappedData.email || ""
      }));
      setAvatar(userMappedData.avatar);
      setFrame(userMappedData.frame);
      setBackground(userMappedData.background);
    }
  }, [userMappedData]);

  const ownedAvatars = userMappedData?.ownedAvatars;
  const ownedFrames = userMappedData?.ownedFrames;
  const ownedBackgrounds= userMappedData?.ownedBackgrounds;
  
  const initialState = {
    firstName: userMappedData?.firstName || "",
    lastName: userMappedData?.lastName || "",
    email: userMappedData?.email || "",
    password: "",
    newPassword: "",
    avatar: userMappedData?.avatar,
    frame: userMappedData?.frame,
    background: userMappedData?.background
  };

  const [formData, setFormData] = useState(initialState);
  const [avatar, setAvatar] = useState(userMappedData?.avatar);
  const [frame, setFrame] = useState(userMappedData?.frame);
  const [background, setBackground] = useState(userMappedData?.background);
  
  const [avatarPopupOpen, setAvatarPopupOpen] = useState<boolean>(false);
  const [framePopupOpen, setFramePopupOpen] = useState<boolean>(false);
  const [backgroundPopupOpen, setBackgroundPopupOpen] = useState<boolean>(false);
  const [formSubmitPopupOpen, setFormSubmitPopupOpen] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState<string>("");
  const [canUpdate, setCanUpdate] = useState<boolean>(false);

  useEffect(() => {
    const hasChanges =
      formData.firstName !== initialState.firstName ||
      formData.lastName !== initialState.lastName ||
      formData.email !== initialState.email ||
      formData.password !== "" ||
      formData.newPassword !== "" ||
      avatar !== initialState.avatar ||
      frame !== initialState.frame ||
      background !== initialState.background;
  
    setCanUpdate(hasChanges);
  }, [formData, avatar, frame, background]);
  

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: updateUser, isPending } = updateUserMutation();

  const handleFinalFormSubmit = () => {
    const mappedFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      oldPassword: formData.password,
      newPassword : formData.newPassword,
      email: formData.email,
      avatarUrl: avatar,
      frameUrl: frame,
      backgroundUrl: background,
    };

    if ((mappedFormData.oldPassword && !mappedFormData.newPassword) || 
        (mappedFormData.newPassword && !mappedFormData.oldPassword)) {
        setFormSubmitPopupOpen(false);
        setErrorPopup("Please fill the password fields correctly");
        return;
    }

    updateUser(
      {
        data: mappedFormData,
      },
      {
        onSuccess: (data) => {
          if (data?.status === HttpStatusCode.OK) {
            router.replace(DASHBOARD_URL + PROFILE);
          } else {
            setFormSubmitPopupOpen(false);
            setErrorPopup(data?.error)
          }
        },
        onError: (error) => {
          setFormSubmitPopupOpen(false);
          setErrorPopup(error.message);
          console.error("Error updating user:", error);
        }
      }
    )
  };

  const handleReset = () => {
    setFormData(initialState);
    setAvatar(initialState.avatar);
    setFrame(initialState.frame);
    setBackground(initialState.background);
  };

  if (isLoading) return <Loading />;
    
  return (
    <div className='h-[170vh] sm:h-auto w-full max-w-[50rem] mx-auto py-10'>
      <h1 className="text-secondary text-2xl font-semibold py-5">Edit Profile</h1>

      <div className="shadow-md rounded-md">
        <section>
          {background && 
          <BackgroundContainer imageUrl={background} />
          }
        </section>

        <div className='relative px-4'>
          <section className='pt-10 flex flex-col items-center sm:block'>
            <AvatarFrame type={frame}>
              {avatar &&
              <Image
                width={200}
                height={200}
                src={avatar}
                alt="profile avatar"
              />
              }
            </AvatarFrame>
            <div className='pt-5 flex flex-wrap gap-3 items-center'>
              <button 
                onClick={() => setAvatarPopupOpen(true)}
                className='bg-secondary text-white font-medium px-3 py-2 flex items-center gap-3 rounded-sm'>
                <p>Avatar</p>
                <EditIcon width={20} height={20} color={COLORS.white} />
              </button>

              <button 
                onClick={() => setFramePopupOpen(true)}
                className='bg-secondary text-white font-medium px-3 py-2 flex items-center gap-3 rounded-sm'>
                <p>Frame</p>
                <EditIcon width={20} height={20} color={COLORS.white} />
              </button>

              <button 
                onClick={() => setBackgroundPopupOpen(true)}
                className='bg-secondary text-white font-medium px-3 py-2 flex items-center gap-3 rounded-sm'>
                <p>Background</p>
                <EditIcon width={20} height={20} color={COLORS.white} />
              </button>
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

          <div className='pb-[10rem] pt-10 md:py-10 flex gap-3'>
            <ButtonStandard disabled={!canUpdate} onClick={() => setFormSubmitPopupOpen(true)} title='Save Changes' />
            <ButtonSecondary onClick={handleReset} title='Reset' />
          </div>
        </div>
      </div>

      <LargePopup 
        isOpen={avatarPopupOpen}
        maxWidth='max-w-[60rem]'
        >
          {avatar &&
          <div>
            <AvatarCloset  
              avatar={avatar}
              setAvatar={setAvatar}
              setPopup={setAvatarPopupOpen}
              purchasedAvatars={ownedAvatars}
            />
          </div>
          }
      </LargePopup>

      <LargePopup 
        isOpen={framePopupOpen}
        maxWidth='max-w-[60rem]'
        >
          {avatar &&
          <div>
            <FrameCloset  
              avatar={avatar}
              frame={frame}
              setFrame={setFrame}
              setPopup={setFramePopupOpen}
              purchasedFrames={ownedFrames}
            />
          </div>
          }
      </LargePopup>

      <LargePopup 
        isOpen={backgroundPopupOpen}
        maxWidth='max-w-[60rem]'
        >
          {background &&
          <div>
            <BackgroundCloset 
              background={background}
              setBackground={setBackground}
              purchasedBackgrounds={ownedBackgrounds}
              setPopup={setBackgroundPopupOpen}
            />
          </div>
          }
      </LargePopup>


      <Popup isOpen={formSubmitPopupOpen}>
        <div className='flex flex-col items-center'>
          <p className='text-md text-secondary font-medium'>Are you sure you want to save your changes?</p>
          <div className='flex items-center gap-5 pt-5'>
            <ButtonSecondary onClick={() => setFormSubmitPopupOpen(false)} title='Cancel' />
            <ButtonStandard onClick={handleFinalFormSubmit} title={isPending ? 'Saving...' : 'Save My Changes'} />
          </div>
        </div>
      </Popup>

      <Popup isOpen={errorPopup !== ""}>
        <div className='flex flex-col items-center'>
          <FailIcon width={120} height={120} color={COLORS.primaryRed} />
          <p className='text-md text-secondary font-medium'>Failed to Update Profile</p>
          <p>{errorPopup}</p>
          <div className='flex items-center gap-5 pt-5'>
            <ButtonSecondary onClick={() => setErrorPopup("")} title='Try Again' />
          </div>
        </div>
      </Popup>

    </div>
  )
}

export default EditProfile;


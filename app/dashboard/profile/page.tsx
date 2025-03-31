"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import EditIcon from "@/app/components/icons/EditIcon";
import SettingsTab from "@/app/components/settings-tab";
import HelpIcon from "@/app/components/icons/navbar-icons/HelpIcon";
import { useRouter } from "next/navigation";
import PolicyIcon from "@/app/components/icons/navbar-icons/PolicyIcon";
import SettingsToggleTab from "@/app/components/settings-toggle-tab";
import { deleteUserMutation, getUserQuery, logoutUserMutation } from "@/app/services/queries/auth.query";
import { EDIT_PROFILE, LEADERBOARD_URL, LOGIN_URL, REGISER_URL } from "@/app/utilities/constants/global-urls";
import SelectDifficulty from "@/app/components/select-difficulty";
import LargePopup from "@/app/components/large-popup";
import ExitIcon from "@/app/components/icons/navbar-icons/ExitIcon";
import TrashIcon from "@/app/components/icons/TrashIcon";
import Popup from "@/app/components/popup";
import ButtonSecondary from "@/app/components/buttons/button-secondary/ButtonSecondary";
import ButtonStandard from "@/app/components/buttons/button-standard";
import { determinePrize } from "@/app/utilities/functions/map-prizes";
import BackgroundContainer from "@/app/components/background-container";
import AvatarFrame from "@/app/components/avatar-frame";
import ProgressIcon from "@/app/components/icons/ProgressIcon";
import BellIcon from "@/app/components/icons/BellIcon";
import BookIcon from "@/app/components/icons/BookIcon";
import Loading from "@/app/components/loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { increment } from "@/lib/features/couterSlice";
import FailIcon from "@/app/components/icons/FailIcon";
import { COLORS } from "@/app/utilities/constants/colors";
import PrizeIcon from "@/app/components/icons/PrizeIcon";


// const profileData = {
//   avatarURL: "/user-avatars/male-1.png",
//   rang: "Student",
//   rangURL: "/rangs/rang-1.png",
//   username: "David Aslanyan",
//   progress: 150,
//   difficultyLevel: "easy"
// };


enum PopupOption {
  signOut = "signOut",
  deleteAccount = "deleteAccount"
};


const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, isLoading } = getUserQuery();
  const [difficultyPopupOpen, setDifficultyPopupOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupOption | null>(null);
  const [notificationsActive, setNotificationsActive] = useState<boolean>(false);

  // const userData = useAppSelector((state: RootState) => state.user);

  const counter = useAppSelector((state: RootState) => state.counter.value);

  // console.log('Redux data: ', userData);

  const userData = useMemo(() => {
    if (!user) return null;
    return {
      username: `${user.data.firstName} ${user.data.lastName}`,
      progress: user.data.progress, 
      points: user.data.points,
      difficultyLevel: user.data.difficultyLevel,
      avatar: user.data.avatar,
      background: user.data.background,
      frame: user.data.frame
    };
  }, [user]);

  const { mutate: logout } = logoutUserMutation();
  const { mutate: deleteUser } = deleteUserMutation();

  const handlePopupClick = () => {
    if (popup === PopupOption.signOut) {
      try {
        logout();
        router.replace(LOGIN_URL);
      } catch(error) {
        console.log("Failed to sign out", error);
      }
    }
    if (popup === PopupOption.deleteAccount) {
      try {
        deleteUser();
        router.replace(REGISER_URL);
      } catch(error) {
        console.log("Failed to delete user", error);
      }
    }
  }

  const { current } = determinePrize(userData?.points);

  
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col py-10 min-h-[150vh] sm:min-h-[120vh] md:min-h-[100vh] w-full max-w-[50rem] mx-auto rounded-md">
      <div className="shadow-md rounded-md">
        <p>Counter: {counter}</p>
        <button onClick={() => dispatch(increment())}>Add</button>
        <section>
          <div className="z-0">
            <BackgroundContainer imageUrl={userData?.background} />
          </div>
          
          <div className="z-20 relative bottom-[7rem] md:bottom-8 flex flex-col items-center justify-center">
            <AvatarFrame type={userData?.frame}>
              <Image
                priority
                width={200}
                height={200}
                src={userData?.avatar}
                alt="profile avatar"
              />
            </AvatarFrame>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-3xl text-secondary font-bold">
                {userData?.username}
              </h3>
              <button onClick={() => router.push(EDIT_PROFILE)}>
                <EditIcon />
              </button>
            </div>

            <div className="flex items-center">
              <p className="text-md text-primary font-bold">{current.title}</p>
              <div>{current.icon}</div>
            </div>

            <div className="flex items-center gap-5 ">
              <p>XP Points: <span className="text-md font-bold text-secondary">{userData?.points}</span></p>
              <div className="bg-thirdly w-[0.1rem] h-5"></div>
              <div className="flex items-center gap-2">
                <ProgressIcon width={22} height={22} />
                <p>Progress: <span className="text-md font-bold text-secondary">{userData?.progress}</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 justify-center items-center px-4 pb-10">
          <SettingsTab
            title="Edit Profile"
            icon={<EditIcon height={25} />}
            onClick={() => router.push(EDIT_PROFILE)}
          />

          <SettingsTab
            title="History"
            icon={<BookIcon />}
            onClick={() => router.push(EDIT_PROFILE)}
          />

          <SettingsTab
            title="Leaderboard"
            icon={<PrizeIcon />}
            onClick={() => router.push(LEADERBOARD_URL)}
          />

          <SettingsToggleTab 
            title="Notifications"
            icon={<BellIcon />}
            enabled={notificationsActive}
            setEnabled={setNotificationsActive}
          />

          <SettingsTab
            title={`Selected Difficulty: ${userData?.difficultyLevel}`}
            onClick={() => setDifficultyPopupOpen(true)}
          />

          <div className='my-4 h-[0.12rem] w-full max-w-[40rem] bg-thirdly rounded-full'></div>

          <SettingsTab
            title="About"
            icon={<HelpIcon />}
            onClick={() => router.push("help")}
          />

          <SettingsTab
            title="Policies"
            icon={<PolicyIcon />}
            onClick={() => router.push("help")}
          />

          <SettingsTab
            icon={<TrashIcon />}
            title="Delete Account"
            onClick={() => setPopup(PopupOption.deleteAccount)}
          />

          <SettingsTab
            icon={<ExitIcon />}
            title="Sign Out"
            onClick={() => setPopup(PopupOption.signOut)}
          />
        </section>
      </div>


      <LargePopup isOpen={difficultyPopupOpen}>
        <SelectDifficulty 
          difficulty={userData?.difficultyLevel}
          setDifficultyPopupOpen={setDifficultyPopupOpen}
        />
      </LargePopup>

      <Popup isOpen={popup !== null}>
        <div className="flex flex-col items-center justify-center">
          {popup === PopupOption.deleteAccount 
          ? <FailIcon width={120} height={120} color={COLORS.primaryRed} /> 
          : <ExitIcon width={120} height={120} />
          }
          <p className="pt-5 text-md text-secondary font-semibold">Are you sure you want to 
            {popup === PopupOption.deleteAccount ? " delete your account" : " sign out"}
            ?
          </p>

          <div className=" pt-10 flex items-center gap-5">
            <ButtonSecondary onClick={() => setPopup(null)} title="Cancel" />
            <ButtonStandard 
              onClick={handlePopupClick}
              title={popup === PopupOption.deleteAccount ? "Delete My Account" : "Sign Out"}
              />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Profile;

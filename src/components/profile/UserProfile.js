import React, { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineMail } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import userProfilePicDefault from "../../assets/icons/user_profile.svg";
import PhotoUpload from "../inputs/PhotoUpload";
import { FaUserCircle } from "react-icons/fa";
import { IoPencilOutline, IoCheckmark } from "react-icons/io5";
import PreviewImage from "../modals/PreviewImage";
import useAuthState from "../../hooks/authHook";
import ProfilePicView from "../modals/ProfilePicView";

function UserProfile({ setOpenUserProfile, user, userProfile }) {
  const [profilePic, setProfilePic] = useState(
    userProfile?.image ? userProfile.image : userProfilePicDefault
  );
  const [tempPhoto, setTempPhoto] = useState(null);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [value, setValue] = useState(userProfile?.description);
  const [imagePreview, setImagePreview] = useState(null);
  const { updateUserProfile } = useAuthState();

  const [profilePicViewModal, setProfilePicViewModal] = useState(false);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = () => {
    const payload = { description: value };
    updateUserProfile(payload, userProfile.id);
  };

  const handleSubmitImage = () => {
    const payload = { image: tempPhoto };
    updateUserProfile(payload, userProfile.id);
  };
  return (
    <div className="w-full h-full sticky top-0 z-10">
      <div className="flex space-x-4 items-center text-xl text-white bg-active px-5 py-4">
        <FaArrowLeft
          onClick={() => {
            setOpenUserProfile(false);
          }}
          className="hover:cursor-pointer"
        />
        <p className="font-semibold">Profile</p>
      </div>
      <div>
        <div className="h-48 px-7 py-10 bg-info-10">
          <div className="relative">
            <div className="absolute top-16 left-48 rounded-full w-32 h-32 border-4 border-white bg-gray-70">
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={profilePic}
                  alt="profile pic"
                />
              </div>
              <div className="absolute top-10 right-10">
                <PhotoUpload
                  setOpenDropDown={setOpenDropDown}
                  detailInfo={userProfile?.image ? "Change Photo" : "Add Photo"}
                />
              </div>
              {openDropDown && (
                <DropDown
                  setOpenDropDown={setOpenDropDown}
                  setTempPhoto={setTempPhoto}
                  setImagePreview={setImagePreview}
                  setProfilePicViewModal={setProfilePicViewModal}
                />
              )}
            </div>
          </div>
        </div>
        {/*User info */}
        <div className="bg-gray-20">
          <div className="flex items-center space-x-6 py-10 px-7 text-xl bg-white">
            <FaUserCircle />
            <p className="font-medium text-gray-100 capitalize">
              {user?.username}
            </p>
          </div>
          {/* about and email address */}
          <div className="py-5 px-7 mt-5 cursor-default bg-white">
            <h3 className="text-gray-80">About and Email</h3>
            <div className="flex justify-between items-center">
              <div className="text-gray-100 font-medium mt-3 text-lg flex items-center w-[30rem] space-x-2">
                <AiOutlineExclamationCircle className="text-gray-70 text-xl" />
                <div className="w-5/6">
                  {editDesc ? (
                    <textarea
                      value={value}
                      className="outline-none border-b-2 border-active resize-none w-full"
                      onChange={(e) => setValue(e.target.value)}
                      onInput={handleInput}
                    />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              </div>
              <div>
                {editDesc ? (
                  <IoCheckmark
                    onClick={() => {
                      {
                        setEditDesc(false);
                        handleSubmit();
                      }
                    }}
                    className="hover:cursor-pointer text-xl"
                  />
                ) : (
                  <IoPencilOutline
                    onClick={() => {
                      setEditDesc(true);
                    }}
                    className="hover:cursor-pointer text-xl"
                  />
                )}
              </div>
            </div>
            <div className="text-gray-100 font-medium mt-3 text-lg flex items-center space-x-2">
              <AiOutlineMail className="text-gray-70 text-xl" />
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      {imagePreview && (
        <PreviewImage
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setProfilePic={setProfilePic}
          handleSubmitImage={handleSubmitImage}
        />
      )}
      {profilePicViewModal && (
        <ProfilePicView
          profilePic={profilePic}
          setProfilePicViewModal={setProfilePicViewModal}
        />
      )}
    </div>
  );
}

export default UserProfile;

function DropDown({
  setOpenDropDown,
  setImagePreview,
  setTempPhoto,
  setProfilePicViewModal,
}) {
  return (
    <div className="absolute top-16 left-24 w-32 hover:cursor-pointer rounded-xl border-gray-40 shadow-lg text-gray-90 z-50 bg-white">
      <div
        className="hover:bg-gray-20 py-2 px-2 rounded-t-xl"
        onClick={() => {
          setProfilePicViewModal(true);
          setOpenDropDown(false);
        }}
      >
        <p>View Photo</p>
      </div>
      <div
        className="hover:bg-gray-20 py-2 px-2"
        onClick={() => {
          // setOpenDropDown(false);
        }}
      >
        <label htmlFor="profile_photo" className="hover:cursor-pointer">
          <input
            id="profile_photo"
            className="peer hidden"
            accept="image/png, image/jpeg"
            type="file"
            onChange={(e) => {
              setTempPhoto(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              setOpenDropDown(false);
            }}
          />
          <p>Upload Photo</p>
        </label>
      </div>
      <div
        className="hover:bg-gray-20 py-2 px-2 rounded-b-xl"
        onClick={() => {
          setOpenDropDown(false);
        }}
      >
        <p>Remove Photo</p>
      </div>
    </div>
  );
}

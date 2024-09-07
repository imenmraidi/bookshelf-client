import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import { updateUsername } from "../redux/slices/authSlice";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
const Profile = ({ isOpen, setOpen, hanldeDelete }) => {
  const api = useAxios();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [name, setName] = useState(user?.name);
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const updateName = async () => {
    if (!name.trim()) {
      toast.warning("Username cannot be empty", {
        position: "top-center",
      });
      setName(user?.name);
      return;
    }
    if (name === user.name) return;

    try {
      const res = await api.put(`/api/auth/updateUsername/${user.id}`, {
        name,
      });

      // Update localStorage with the new username
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage) {
        userFromLocalStorage.name = name;
        localStorage.setItem("user", JSON.stringify(userFromLocalStorage));
      }
      dispatch(updateUsername(name));
      toast.success("Username updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Something went wrong. Try again later", {
        position: "top-center",
      });
      console.error("Error updating username:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!newPass) {
      toast.error("New password cannot be empty.", { position: "top-center" });
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("Passwords don't match!", { position: "top-center" });
      return;
    }

    try {
      const response = await api.put(`/api/auth/updatePassword/${user.id}`, {
        newPass,
      });
      toast.success("Password updates successfully", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Error updating password.", { position: "top-center" });
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center z-50 transform transition-transform duration-400 ease-in-out">
      <div
        className="flex flex-col bg-beige rounded-lg border-2 border-black shadow-black-4 overflow-hidden 
          transform transition-transform duration-400 ease-in-out scale-95"
        style={{ width: "500px", height: "600px" }}
      >
        <div className="flex justify-between items-center flex-none py-3 px-5 border-b-2 border-black bg-[#D8936A] ">
          <h2 className="text-lg font-semibold ">Edit profile</h2>

          <button
            className="text-gray-500 hover:text-black border-2 border-black rounded-full size-7 flex justify-center items-center bg-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-7 pb-0 flex flex-col flex-grow ">
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium">Username</label>
            <div className="flex  justify-between items-center space-x-4">
              <input
                className="outline-none  p-1  bg-[#FEF9EF] rounded-lg px-2 border-2 w-full h-10
             border-[#3D3D3D] items-center overflow-hidden"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <button
                className=" h-10 text-grey bg-[#FFD787] font-bold py-2 px-4 rounded-md border-2 border-grey shadow-grey-1 items-center flex
              active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
                onClick={updateName}
              >
                Save
              </button>
            </div>
          </div>
          {!user.isGoogleUser && (
            <div className="flex flex-col space-y-4 mt-5">
              <label className="text-xl font-medium">
                Change your password
              </label>
              <div className="flex flex-col space-y-1">
                <label className="text-base">New password</label>
                <input
                  className="outline-none  p-1  bg-[#FEF9EF] rounded-lg px-2 border-2 w-full h-10
             border-[#3D3D3D] items-center overflow-hidden"
                  type="password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                />
                <label className="text-base">Confirm password</label>
                <input
                  className="outline-none  p-1 bg-[#FEF9EF] rounded-lg px-2 border-2 w-full h-10
             border-[#3D3D3D] items-center overflow-hidden"
                  type="password"
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                />
              </div>
              <button
                className="  text-grey bg-[#FFD787] font-bold py-2 rounded-md border-2 border-grey shadow-grey-1 items-center 
                flex justify-center active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          )}
          <div className="flex flex-col space-y-2 mt-3">
            {/* <label className="text-xl font-medium">Account</label>
            <h1 className="text-lg text-red-700 cursor-pointer">
              Delete your account
            </h1> */}
            <label className="text-xl font-medium">Attributions</label>
            <a href="https://lordicon.com/">Animated icons by Lordicon.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/slices/authSlice";
import useAxios from "../utils/useAxios";
import { useBooks } from "../context/booksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./Profile";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { createPortal } from "react-dom";
import ShareModal from "./ShareModal";
function TopBar({ addBook }) {
  const { sharing, sharer, readBooks } = useBooks();
  const [dropDown, setDropDown] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSharing, setOpenSharing] = useState(false);
  const [liked, setLiked] = useState(false);
  const api = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log(response);
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };
  return (
    <div className=" h-16  flex justify-between items-center  p-4  ">
      <div className="flex space-x-4">
        {sharing && (
          <div
            className="bg-beige p-2 h-11 font-semibold flex items-center shadow-black-2 border-2 border-black 
      rounded-md cursor-pointer"
          >
            <a href="http://localhost:5173/">Bookshelf</a>
          </div>
        )}
        {!sharing && (
          <div
            className="bg-beige p-2 h-11 flex items-center shadow-black-2 border-2 border-black 
      rounded-md "
          >
            {sharing ? sharer : user?.name}
            {"'s Library"}
          </div>
        )}
        {!sharing && (
          <button
            className=" rounded-md border-2 bg-beige p-0.5
        border-black shadow-black-2 flex justify-between space-x-1 items-center 
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
            onClick={() => !sharing && setOpenSharing(true)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/qpvtavng.json"
              trigger="hover"
              state="hover-slide"
              colors="primary:#121331,secondary:#f49cc8,tertiary:#ebe6ef"
              class="size-9"
            ></lord-icon>
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        {!sharing && (
          <button
            className="bg-[#A4D985] rounded-md border-2 h-11
        border-black shadow-black-2 flex justify-between space-x-1 items-center p-2
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
            onClick={addBook}
          >
            <lord-icon
              src="https://cdn.lordicon.com/zyzoecaw.json"
              trigger="hover"
              class="size-7"
            ></lord-icon>
            <h1 className="font-medium">Add books</h1>
          </button>
        )}
        {sharing && (
          <div
            className="bg-beige p-2 h-11 flex items-center shadow-black-2 border-2 border-black 
      rounded-md "
          >
            {sharing ? sharer : user?.name}
            {"'s Library"}
          </div>
        )}

        <div
          className="bg-beige p-2 h-11 flex items-center space-x-2 shadow-black-2 border-2 border-black 
      rounded-md "
        >
          <p>
            {readBooks
              .map(s => s?.books?.length)
              .reduce((acc, curr) => acc + curr, 0) + " Read books"}
          </p>
          <lord-icon
            src="https://cdn.lordicon.com/utpmnzxz.json"
            trigger="hover"
            class="size-6"
          ></lord-icon>
        </div>
      </div>
      {!sharing && (
        <div className="relative">
          <button
            className="bg-beige rounded-md border-2 h-11 space-x-2
        border-black shadow-black-2 flex justify-center items-center p-2
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
            onClick={() => setDropDown(!dropDown)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/fmasbomy.json"
              trigger="hover"
              colors="primary:#121331,secondary:#66a1ee,tertiary:#ffc738"
              class="size-7"
            ></lord-icon>
            <h2>Profile</h2>
          </button>
          {dropDown && (
            <div className="absolute flex flex-col top-full right-0 mt-2 overflow-hidden rounded w-48 bg-white border-2 border-black shadow-black-2">
              <div
                className="flex justify-start space-x-2 items-center p-3 m-2 rounded-md  hover:bg-[#e4e4e4] cursor-pointer"
                onClick={() => {
                  setOpenProfile(true);
                  setDropDown(false);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                <h1>Profile</h1>
              </div>
              <hr className="border-black" />
              <div
                className="flex justify-start space-x-2  items-center p-3 m-2 rounded-md hover:bg-[#e4e4e4] cursor-pointer"
                onClick={handleLogout}
              >
                {" "}
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <h1>Logout</h1>
              </div>
            </div>
          )}
        </div>
      )}
      {sharing && (
        <button
          className="bg-beige rounded-md border-2 h-11 space-x-2
        border-black shadow-black-2 flex justify-center items-center p-2
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
          onClick={() => setLiked(!liked)}
        >
          <lord-icon
            src="https://cdn.lordicon.com/ohfmmfhn.json"
            colors={
              liked
                ? "primary:#121331,secondary:#f28ba8"
                : "primary:#121331,secondary:#fad3d1"
            }
            trigger="click"
            state="hover-heartbeat-alt"
            class="size-7"
          ></lord-icon>
        </button>
      )}
      {createPortal(
        <Profile isOpen={openProfile} setOpen={setOpenProfile} />,
        document.body
      )}
      {!sharing && <ShareModal isOpen={openSharing} setOpen={setOpenSharing} />}{" "}
    </div>
  );
}

export default TopBar;

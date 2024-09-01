import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useAxios from "../utils/useAxios";

const ShareModal = ({ isOpen, setOpen }) => {
  const [token, setToken] = useState(null);
  const api = useAxios();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/book/shareLibrary/${user?.id}`); // Replace with your API endpoint
        const token = response.data.token;
        setToken(token);
      } catch (error) {
        toast.error("Something went wrong. Please try again later");
      }
    };
    fetchData();
  }, []);
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(`http://localhost:5173/shared?token=${token}`)
      .then(() => {
        toast.success("Link copied to clipboard", { position: "bottom-left" });
      })
      .catch(err => {
        toast.error("Something went wrong. Please try again later");
      });
  };
  if (!isOpen) return null;
  console.log(isOpen);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-center justify-center z-50 transform transition-transform duration-400 ease-in-out">
      <div
        className="flex flex-col bg-[#F6E4BE] rounded-lg border-2 border-black shadow-black-4 overflow-hidden 
          transform transition-transform duration-400 ease-in-out scale-95"
        style={{ width: "420px", height: "300px" }}
      >
        <div className="flex justify-end items-center flex-none py-3 px-5 border-b-2 border-black bg-[#E5A1B8] ">
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
        <div className="p-7 pb-0 flex flex-col space-y-3 ">
          <h1 className="text-xl font-bold">Share your bookshelves !</h1>
          <div className="flex  justify-between items-center space-x-4">
            <div
              className=" bg-[#FEF9EF] rounded-md pr-1 pl-1 border-2 flex-grow h-10
             border-[#3D3D3D] items-center overflow-hidden shadow-orange-2"
            >
              <input type="text" readOnly value={`http://localhost:5173/shared?token=${token}`}
              className="w-full h-full outline-none bg-inherit"
              />
            </div>
            <button
              onClick={handleCopyClick}
              className=" h-10 text-grey bg-[#FFD787] font-bold p-2 rounded-md border-2 border-grey shadow-grey-1 items-center flex
              active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShareModal;

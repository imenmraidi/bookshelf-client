import { React, useState } from "react";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { useBooks } from "../context/booksContext";
import { toast } from "react-toastify";

const AddShelfModal = ({ setOpen, status }) => {
  const { setReadBooks, setCurrentlyReadingBooks, setToReadBooks } = useBooks();
  const api = useAxios();
  const [newShelf, setNewShelf] = useState("");
  const { user } = useSelector(state => state.auth);

  const addShelf = async e => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/book/addShelf",
        {
          userId: user.id,
          name: newShelf,
          status,
        }
      );
      console.log(response.data);
      const setBooks =
        status === "R"
          ? setReadBooks
          : status === "C"
          ? setCurrentlyReadingBooks
          : status === "T"
          ? setToReadBooks
          : null;
      setBooks(prev => {
        return [
          ...prev,
          {
            _id: response.data.newShelf._id,
            shelfIndex: response.data.newShelf.shelfIndex,
            status,
            shelf: response.data.newShelf.shelfName,
            books: [],
          },
        ];
      });
      toast.success("Shelf added successfully", {
        position: "bottom-left",
      });
      setOpen(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Error : please verify data", {
          position: "top-center",
        });
      } else {
        console.log(error);
        toast.error("Something went wrong please try again later", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div
      className="flex flex-col bg-[#F6E4BE] rounded-lg border-2 border-grey shadow-grey-2 overflow-hidden 
          transform transition-transform duration-400 ease-in-out scale-95"
    >
      <div className="flex justify-between items-center flex-none py-2 px-3 border-b-2 border-grey bg-[#FFD787] ">
        <h2 className="text-md font-normal ">
          Add new shelf 
        </h2>
        <button
          className="text-gray-500 hover:text-grey border-2 border-grey rounded-full size-6 flex justify-center items-center bg-white"
          onClick={() => {
            setOpen(false);
          }}
        >
          <svg
            className="size-4"
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
      <div className="p-4  flex flex-col flex-grow ">
        <form action="submit" onSubmit={addShelf}>
          <div className="flex  justify-between items-center space-x-4">
            <div
              className=" bg-[#FEF9EF] rounded-lg pr-1 pl-1 border-2 w-full h-10
             border-[#3D3D3D] items-center overflow-hidden shadow-yellowish-2"
            >
              <input
                required
                placeholder="Name of the shelf"
                type="text"
                className="outline-none bg-inherit p-1 w-full h-full"
                value={newShelf}
                onChange={e => setNewShelf(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" h-10 text-grey bg-[#FFD787] font-bold py-2 px-4 rounded-md border-2 border-grey shadow-grey-1 items-center flex
              active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddShelfModal;

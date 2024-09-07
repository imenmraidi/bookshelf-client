import { React, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { debounce } from "lodash";
import { useBooks } from "../context/booksContext";
import useAxios from "../utils/useAxios";
import TiptapEditor from "../comm/TiptapEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../comm/ConfirmModal";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
function BookModal({ isOpen, setOpen, book, shelf }) {
  const api = useAxios();
  const [bookInfo, setBookInfo] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [starHover, setStarHover] = useState(null);

  const [tag, setTag] = useState(book?.tag);
  const [rating, setRating] = useState(book?.rating);
  const [hide, setHide] = useState(book?.hide);
  const [startedAt, setStartedAt] = useState(book?.startedAt|| "");
  const [finishedAt, setFinishedAt] = useState(book?.finishedAt|| "");
  const [notes, setNotes] = useState(book?.notes);

  const [openDelete, setOpenDelete] = useState(false);

  const { sharing, setReadBooks, setCurrentlyReadingBooks, setToReadBooks } =
    useBooks();

  const deleteBook = async () => {
    try {
      const response = await api.delete(`/api/book/delete/${book?._id}`);
      const setBooks =
        book?.status === "R"
          ? setReadBooks
          : book?.status === "C"
          ? setCurrentlyReadingBooks
          : book?.status === "T"
          ? setToReadBooks
          : null;
      setBooks(prevItems => {
        return prevItems.map(s => {
          const hasBookToRemove = s.books.some(b => b._id === book?._id);
          return hasBookToRemove
            ? {
                ...s,
                books: s.books.filter(b => b._id !== book?._id),
              }
            : s;
        });
      });
      toast.success("Book deleted successfully", {
        position: "top-center",
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert(error?.response?.data?.error);
      } else {
        alert(`Error: ${error?.response?.statusText}`);
      }
    }
  };

  const updateBook = async updatedFields => {
    try {
      const res = await api.put(`/api/book/update/${book._id}`, {
        book: { ...updatedFields },
      });
      console.log("Book updated successfully", res.data);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Debounced version of the update function
  const debouncedUpdateBook = useCallback(
    debounce(updatedFields => {
      updateBook(updatedFields);
    }, 2000),
    []
  );

  // UseEffect to trigger the update
  useEffect(() => {
    if (isOpen && !sharing) {
      debouncedUpdateBook({ tag, rating, hide, startedAt, finishedAt, notes });
      // Cleanup function to cancel the debounce on component unmount
      return () => {
        debouncedUpdateBook.cancel();
      };
    }
  }, [tag, rating, hide, startedAt, finishedAt, notes]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full cursor-auto overflow-auto bg-opacity-0 flex items-center justify-center z-50 transform transition-transform duration-400 ease-in-out select-text ">
      <div
        className="flex  bg-none  transform transition-transform duration-400 ease-in-out scale-95 pointer-events-auto "
        style={{ width: "850px", height: "660px" }}
      >
        <div className="flex relative group bg-beige w-1/2 border-4 border-black rounded-tr-5xl rounded-br-3xl overflow-hidden">
          {!bookInfo ? (
            <>
              <img
                src={book?.cover}
                className="w-full h-full"
                alt="Book cover"
              />
              <button
                className="absolute top-1/2 right-2 bg-gray-300 p-1 rounded-full size-6
                opacity-0 flex items-center justify-center border-2 border-grey text-grey
                shadow-grey-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                transform transition duration-200 group-hover:opacity-100"
                onClick={() => setBookInfo(true)}
              >
                <FontAwesomeIcon icon={faAngleRight} size="xs" />
              </button>
            </>
          ) : (
            <>
              <div className="p-10 h-full w-full ">
                <div className="flex flex-col space-y-0 ">
                  <h1 className="text-3xl font-semibold ">{book.title}</h1>
                  <h2 className="text-lg italic text-gray-600">
                    {book.authors.join(", ")} {book.publishedDate}
                  </h2>
                  <p className="text-lg italic">{book.pageCount} pages</p>
                </div>
                <div className="mt-5">
                  <h3 className="text-2xl font-bold mb-2 ">Description</h3>
                  <div className=" max-h-96 overflow-y-auto">
                    <p className="text-base text-gray-800 p-1 pr-3">
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-1/2 left-2 bg-gray-300 p-1 rounded-full size-6
                opacity-0 flex items-center justify-center border-2 border-grey text-grey
                shadow-grey-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                transform transition duration-200 group-hover:opacity-100"
                onClick={() => setBookInfo(false)}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="xs" />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col bg-white w-1/2 border-4 border-black rounded-tl-5xl rounded-bl-3xl overflow-hidden">
          <div className="flex h-15 p-4 w-full space-x-3 justify-end">
            <button
              disabled={sharing}
              className="text-gray-500 hover:text-black h-7 w-9 border-2 border-black rounded-full  flex justify-center items-center "
              onClick={() => {
                setHide(!hide);
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/fmjvulyw.json"
                trigger="hover"
                stroke="bold"
                state={hide === true ? "hover-cross" : null}
                colors="primary:#000000,secondary:#ffffff,tertiary:#3a3347,quaternary:#e8b730,quinary:#fad3d1,senary:#f24c00"
                className=" "
              ></lord-icon>
            </button>

            <button
              className="text-gray-500 hover:text-black border-2 border-black rounded-full size-7 flex justify-center items-center bg-gray-300"
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
          <div className="pl-6 flex justify-between ">
            <div className="flex flex-col  ">
              <h1 className="text-3xl font-semibold ">
                {book.status === "R"
                  ? "Read"
                  : book.status === "C"
                  ? "Currently reading"
                  : "To read"}
              </h1>
              <h2 className="text-lg italic text-gray-600 ">
                {book?.status !== "C" ? shelf : "\u00A0"}
              </h2>
            </div>
            <div className="flex ">
              <select
                disabled={sharing}
                value={tag}
                onChange={event => {
                  setTag(event.target.value);
                }}
                className="flex h-9 bg-[#F79D97] rounded-l-full pr-1 pl-1 border-2 border-r-0 border-black shadow-black-2 outline-none opacity-100"

              >
                <option value="">Tag</option>
                <option value="finished">Finished</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between  w-full px-5 ">
            <div className="flex  space-x-0  ">
              {[1, 2, 3, 4, 5].map(s => (
                <lord-icon
                  key={s}
                  onMouseEnter={() => setStarHover(s)}
                  onMouseLeave={() => setStarHover(null)}
                  src="https://cdn.lordicon.com/hgqdtxby.json"
                  stroke="bold"
                  trigger="hover"
                  colors={`primary:#000000,${
                    starHover && !sharing
                      ? s <= starHover
                        ? "secondary:#ffc738"
                        : "secondary:#ebe6ef"
                      : !rating || rating === 0
                      ? "secondary:#ebe6ef"
                      : s <= rating
                      ? "secondary:#ffc738"
                      : "secondary:#ebe6ef"
                  }`}
                  onClick={() => !sharing && setRating(s)}
                  class="size-10 hover:cursor-pointer tranform active:scale-125
                transform transition duration-200"
                ></lord-icon>
              ))}
            </div>
            {!sharing && (
              <button
                className="flex items-center justify-center transform active:scale-90"
                onClick={() => setOpenDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/xekbkxul.json"
                  trigger="hover"
                  // state="hover-trash"
                  stroke="bold"
                  colors="primary:#121331,secondary:#ee6d66,tertiary:#c67d53,quaternary:#f2e2d9"
                  class="size-9"
                ></lord-icon>
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row sm:flex-col lg:flex-row px-7 my-2 justify-between w-full h-15">
            <div>
              <label>Started at </label>
              <input
                readOnly={sharing}
                type="date"
                className="outline-none bg-beige flex rounded-lg  shadow-black-2 border-black border-2 px-2  "
                value={startedAt}
                onChange={e => setStartedAt(e.target.value)}
              />
            </div>
            <div>
              <label>Finished at </label>
              <input
                readOnly={sharing}
                type="date"
                className="outline-none bg-beige flex rounded-lg  shadow-black-2 border-black border-2 px-2  "
                value={finishedAt}
                onChange={e => setFinishedAt(e.target.value)}
              />
            </div>
          </div>
          {
            <div className="flex flex-col px-4 py-3 ">
              <div className="flex">
                <h1 className="text-2xl px-3 font-semibold  ">Notes</h1>
                {!sharing && (
                  <lord-icon
                    src="https://cdn.lordicon.com/zfzufhzk.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-line"
                    colors="primary:#121131,secondary:#eeaa66,tertiary:#fae6d1,quaternary:#f4a09c,quinary:#00000"
                    class="size-7 hover:cursor-pointer tranform active:scale-90
                transform transition duration-200 "
                    onClick={() => setEditNotes(!editNotes)}
                  ></lord-icon>
                )}
              </div>
              <hr className=" border-gray-500 mx-3" />
              <div className=" h-fit w-full  ">
                <TiptapEditor
                  hide={hide}
                  readOnly={sharing}
                  notes={sharing && hide ? "Notes are hidden" : notes}
                  setNotes={setNotes}
                  editNotes={editNotes}
                />
              </div>
            </div>
          }
        </div>
      </div>
      {createPortal(
        <ConfirmModal
          isOpen={openDelete}
          setOpen={setOpenDelete}
          hanldeDelete={deleteBook}
        />,
        document.body
      )}
    </div>
  );
}

export default BookModal;

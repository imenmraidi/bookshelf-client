import React from "react";
import Book from "./Book";
import shelf1 from "../assets/images/shelf1.png";
import shelf3 from "../assets/images/shelf3.png";
import shelf4 from "../assets/images/shelf4.png";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmModal from "../comm/ConfirmModal";
import { useBooks } from "../context/booksContext";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";

function Shelf({ shelf, status }) {
  const api = useAxios();

  const { sharing, setReadBooks, setCurrentlyReadingBooks, setToReadBooks } =
    useBooks();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: shelf?._id,
    data: {
      status: status,
      type: "shelf",
      name: shelf?.shelf,
      shelfIndex: shelf?.shelfIndex,
    },
    disabled: sharing,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [openDelete, setOpenDelete] = useState(false);
  const [editShelf, setEditShelf] = useState(false);
  const [newShelfName, setNewShelfName] = useState(shelf?.shelf);
  const [name, setName] = useState(shelf?.shelf);
  const setBooks =
    status === "R"
      ? setReadBooks
      : status === "C"
      ? setCurrentlyReadingBooks
      : status === "T"
      ? setToReadBooks
      : null;
  const deleteShelf = async () => {
    try {
      const response = await api.delete(`/api/book/deleteShelf/${shelf?._id}`);
      setBooks &&
        setBooks(prev => {
          return prev.filter(s => s._id !== shelf?._id);
        });
      toast.success("Shelf deleted successfully", {
        position: "top-left",
      });
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again later", {
        position: "top-center",
      });
    }
  };
  const updateShelf = async () => {
    try {
      if (newShelfName !== "" && newShelfName !== name) {
        const response = await api.put(`/api/book/renameShelf/${shelf?._id}`, {
          name: newShelfName,
        });
        setName(newShelfName);
      } else setNewShelfName(shelf.shelf);
      setEditShelf(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again later", {
        position: "top-left",
      });
    }
  };
  return (
    <div
      className="flex flex-col w-full py-1.5  "
      onMouseDown={e => e.stopPropagation()}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex flex-col  w-full  px-5 ">
        {shelf && status !== "C" && (
          <div className="flex justify-between ">
            {!editShelf || sharing ? (
              <h2
                className="italic font-light cursor-pointer"
                onClick={() => setEditShelf(true)}
              >
                {name}
              </h2>
            ) : (
              <input
                autoFocus
                type="text"
                value={newShelfName}
                className="outline-none bg-inherit border-b-1 border-grey
                italic font-light"
                onBlur={updateShelf}
                onKeyDown={e => {
                  if (e.key !== "Enter") return;
                  updateShelf();
                }}
                onChange={e => {
                  setNewShelfName(e.target.value);
                }}
              />
            )}
           {!sharing && <div className="flex items-center space-x-1">
              <button
                className="ring-gray-400 rounded size-5 flex items-center justify-center transform active:scale-90"
                onClick={() => setOpenDelete(true)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/wpyrrmcq.json"
                  trigger="hover"
                  state="hover-trash"
                  colors="primary:#e83a30"
                ></lord-icon>
              </button>
              <div
                {...attributes}
                {...listeners}
                className=" cursor-grab active:cursor-grabbing  rounded size-5 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faBars} color="#999999" />
              </div>
            </div>}
          </div>
        )}
        <div
          className="flex space-x-4  w-full overflow-x-auto scrollbar-none scroll-smooth  py-3 px-1   "
          onMouseDown={e => e.stopPropagation()}
        >
          <SortableContext
            id={shelf?._id}
            items={shelf?.books?.map(book => book?._id) || []}
          >
            {shelf && shelf.books && shelf.books.length > 0 ? (
              shelf.books.map(b => (
                <Book key={b._id} book={b} shelf={shelf?.shelf} />
              ))
            ) : (
              <div className="w-full flex flex-col justify-center items-center">
                <img
                  src={
                    status === "R" ? shelf1 : status === "C" ? shelf3 : shelf4
                  }
                  alt=""
                  className={status === "C" ? "h-11 w-40" : "h-14 w-48"}
                />
                <p className={`italic text-sm ${status === "C" ? "h-3" : ""}`}>
                  No books yet
                </p>
              </div>
            )}{" "}
          </SortableContext>
        </div>
      </div>
      <div className="min-h-3 bg-beige border-black border-t-2 border-b-2" />
      {createPortal(
        <ConfirmModal
          isOpen={openDelete}
          setOpen={setOpenDelete}
          hanldeDelete={deleteShelf}
        />,
        document.body
      )}
    </div>
  );
}

export default Shelf;

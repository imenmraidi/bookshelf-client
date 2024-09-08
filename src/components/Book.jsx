import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useBooks } from "../context/booksContext";
import ConfirmModal from "../comm/ConfirmModal";
import BookModal from "./BookModal";
import { useSortable } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { CSS } from "@dnd-kit/utilities";

function Book({ book, shelf, dragging }) {
  const { sharing } = useBooks();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: book._id,
    data: { type: "book", book: book, status: book.status },
    disabled: sharing,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [openBook, setOpenBook] = useState(false);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group relative rounded-sm flex-shrink-0 w-16 h-18 lg:h-18 lg:w-16 md:h-16 md:w-14 sm:h-16 sm:w-14
         bg-beige opacity-40 ring-1 ring-grey  shadow-xl "
      ></div>
    );
  }
  return (
    <div className="cursor-grab active:cursor-grabbing">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={` rounded-sm flex-shrink-0 w-16 h-18 lg:h-18 lg:w-16 md:h-16 md:w-14 sm:h-16 sm:w-14 bg-beige 
          hover:scale-105 shadow-xl cursor-grab active:cursor-grabbing ${
            dragging && "cursor-grabbing transform rotate-2"
          } `}
        onClick={() => setOpenBook(true)}
      >
        <img
          src={book?.cover.replace("http://", "https://")}
          className="h-full w-full rounded-sm shadow-md"
          alt="Book Cover"
        />{" "}
      </div>
      <BookModal
        book={book}
        isOpen={openBook}
        setOpen={setOpenBook}
        shelf={shelf}
      />
    </div>
  );
}

export default Book;

import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useBooks } from "../context/booksContext";
import ConfirmModal from "../comm/ConfirmModal";
import BookModal from "./BookModal";
import { useSortable } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { CSS } from "@dnd-kit/utilities";

function Book({ book, shelf, dragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: book._id,
    data: { type: "book", book: book, status: book.status },
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
        className="group relative rounded-sm flex-shrink-0 h-20 w-16 bg-beige opacity-30 ring-1 ring-grey  shadow-xl "
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
        className={` rounded-sm flex-shrink-0 h-20 w-16 bg-beige  shadow-xl cursor-grab active:cursor-grabbing ${
          dragging && "cursor-grabbing transform rotate-2"
        } `}
        onClick={() => setOpenBook(true)}
      >
        <img src={book.cover} className="h-full w-full rounded-sm shadow-md" />
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

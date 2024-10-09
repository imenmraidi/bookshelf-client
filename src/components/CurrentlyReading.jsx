import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
function CurrentlyReading() {
  const { currentlyReadingBooks } = useBooks();
  console.log(currentlyReadingBooks);
  return (
    <div
      className="  flex  flex-col 
      p-2 overflow-auto lg:w-1/2 md:w-2/3 "
    >
      <SortableContext
        id="C"
        items={currentlyReadingBooks.flatMap(s => s.shelf)}
        // strategy={horizontalListSortingStrategy}
      >
        <Library booksByShelf={currentlyReadingBooks} status={"C"} />
      </SortableContext>
    </div>
  );
}

export default CurrentlyReading;

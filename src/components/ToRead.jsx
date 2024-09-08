import React, { useEffect, useState } from "react";
import Library from "./Library";
import { useBooks } from "../context/booksContext";

import {
  arrayMove,
  SortableContext,
  
} from "@dnd-kit/sortable";
function ToRead() {
  const { toReadBooks } = useBooks();
  return (
    <div
      className="  flex flex-col 
      p-2 overflow-auto lg:w-5/6 md:w-5/6 sm:w-full"
    >
      <SortableContext
        id="T"
        items={toReadBooks.flatMap(s => s?.shelf)}
        // strategy={horizontalListSortingStrategy}
      >
        <Library booksByShelf={toReadBooks} status={"T"} />
      </SortableContext>
    </div>
  );
}

export default ToRead;

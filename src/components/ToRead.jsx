import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function ToRead() {
  const { toReadBooks } = useBooks();
  console.log("toread books", toReadBooks);

  return (
    <div
      className="  flex flex-col 
      p-2 overflow-auto lg:w-5/6 md:w-full sm:w-full"
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

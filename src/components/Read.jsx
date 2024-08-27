import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";

function Read() {
  const { readBooks } = useBooks();
  console.log("readBooks", readBooks);
  return (
    <div
      className=" w-1/2 flex flex-col h-full 
     space-y-4 p-2 overflow-auto"
    >
      <Library booksByShelf={readBooks} status={"R"} />
    </div>
  );
}

export default Read;

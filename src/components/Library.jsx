import { React, useState } from "react";
import Shelf from "./Shelf";
import MiniTopBar from "./MiniTopBar";
import shelf1 from "../assets/images/shelf1.png";
import shelf3 from "../assets/images/shelf3.png";
import shelf4 from "../assets/images/shelf4.png";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
function Library({ booksByShelf, status }) {
  const [search, setSearch] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");
  const filteredBooks =
    booksByShelf && search
      ? booksByShelf
          .map(item => {
            // Filter books within each shelf
            const filteredBooks = item.books.filter(
              book =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.authors.some(author =>
                  author.toLowerCase().includes(search.toLowerCase())
                )
            );

            // Return the shelf only if it contains matching books
            if (filteredBooks.length > 0) {
              return { ...item };
            } else if (
              item.shelf.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            } else {
              return null; // If no books match, return null
            }
          })
          .filter(item => item !== null)
      : selectedShelf
      ? booksByShelf.filter(item => {
          return item.shelf.includes(selectedShelf);
        })
      : booksByShelf;

  return (
    filteredBooks && (
      <>
        <div className="flex p-2 overflow-auto  ">
          <div className="bg-[#BF785E] w-4 rounded-md border-2 border-black shadow-black-2"></div>
          <div
            className={`flex flex-grow flex-col w-full h-full overflow-y-auto scroll-smooth scrollbar-none 
             ${status === "C" ? "py-2" : status === "T" ? "py-2" : "py-4"}
              `}
          >
            <MiniTopBar
              status={status}
              shelves={booksByShelf.map(s => s?.shelf)}
              search={search}
              setSearch={setSearch}
              selectedShelf={selectedShelf}
              setSelectedShelf={setSelectedShelf}
            />
            <div className=" flex flex-grow flex-col w-full h-full py-1 overflow-y-auto scroll-smooth scrollbar-none  ">
              {filteredBooks && filteredBooks.length > 0 ? (
                <SortableContext
                  items={filteredBooks?.map(s => s?._id)}
                  id={status}

                  // strategy={horizontalListSortingStrategy}
                >
                  {filteredBooks.map(s => (
                    <Shelf status={status} shelf={s} key={s?._id} />
                  ))}
                </SortableContext>
              ) : (
                <div className="h-full w-full">
                  <div className="w-full flex flex-col justify-center items-center p-4">
                    <img
                      src={
                        status === "R"
                          ? shelf1
                          : status === "C"
                          ? shelf3
                          : shelf4
                      }
                      alt=""
                      className="h-12"
                    />
                    <p
                      className={`italic text-sm ${
                        status === "C" ? "h-3" : ""
                      }`}
                    >
                      {booksByShelf?.length === 0
                        ? "No shelves yet"
                        : "No books were found"}
                    </p>
                  </div>
                  <div className="min-h-3 bg-beige border-black border-t-2 border-b-2" />
                </div>
              )}
            </div>
          </div>
          <div
            className="bg-[#BF785E] w-4 rounded-md border-2
         border-black shadow-black-2"
          ></div>
        </div>
      </>
    )
  );
}

export default Library;

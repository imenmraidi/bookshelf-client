import React, { useState } from "react";
import AddShelfModal from "./AddShelfModal";
import { createPortal } from "react-dom";
function MiniTopBar({
  status,
  shelves,
  search,
  setSearch,
  selectedShelf,
  setSelectedShelf,
}) {
  const [openAddShelf, setOpenAddShelf] = useState(false);
  return (
    <div
      className={`flex   ${
        status === "C" ? "lg:h-5 md:h-5 sm:h-7" : "lg:h-11 md:h-16 sm:h-16 "
      } 
      ${
        status === "C" ? "justify-center items-center" : "lg:justify-between"
      } sm:flex-col md:flex-col lg:flex-row px-5 w-full sm:justify-center md:justify-center
      md:py-1 sm:py-1
      ${status === "R" && "mb-2"} `}
    >
      <h3 className="flex min-w-fit mr-3 items-center lg:text-xl sm:text-base md:text-lg  font italic">
        {status === "R"
          ? "Have read"
          : status === "C"
          ? "Reading now"
          : "To read"}
      </h3>
      {status !== "C" && (
        <div className="flex space-x-3">
          <div
            className="flex bg-[#FEF9EF] rounded-lg pr-1 pl-1 border-2 h-8
         border-[#3D3D3D] shadow-grey-2 items-center overflow-hidden"
          >
            <lord-icon
              src="https://cdn.lordicon.com/kkvxgpti.json"
              trigger="hover"
              class="size-7"
            ></lord-icon>
            <input
              placeholder="Search books..."
              type="text"
              className="outline-none bg-inherit p-1 w-full h-full"
              value={search}
              onChange={e => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <select
            value={selectedShelf}
            onChange={event => {
              setSelectedShelf(event.target.value);
            }}
            className="flex w-24 h-8  bg-[#ffb577] rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 outline-none"
          >
            <option value="">shelves</option>
            {shelves &&
              shelves.map(shelf => (
                <option key={shelf} value={shelf}>
                  {shelf}
                </option>
              ))}
          </select>
          <div className="relative  ">
            <button
              onClick={() => setOpenAddShelf(!openAddShelf)}
              className="bg-[#FFD787] rounded-lg border-2 h-8 w-11
         border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
          active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
            >
              +
              <lord-icon
                src="https://cdn.lordicon.com/eouimtlu.json"
                trigger="morph"
                class="size-7"
              ></lord-icon>
            </button>
            {openAddShelf && (
              <div className="absolute top-full mt-2 -right-2 z-10 p- w-80  ">
                <AddShelfModal setOpen={setOpenAddShelf} status={status} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MiniTopBar;

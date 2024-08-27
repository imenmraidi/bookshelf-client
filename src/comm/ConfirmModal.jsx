const ConfirmModal = ({ isOpen, setOpen, hanldeDelete }) => {
  if (!isOpen) return null;
  console.log(isOpen);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-center justify-center z-50 transform transition-transform duration-400 ease-in-out">
      <div
        className="flex flex-col bg-[#F6E4BE] rounded-lg border-2 border-black shadow-black-4 overflow-hidden 
        transform transition-transform duration-400 ease-in-out scale-95"
        style={{ width: "420px", height: "300px" }}
      >
        <div className="flex justify-end items-center flex-none py-3 px-5 border-b-2 border-black bg-[#ff6961] ">
          <button
            className="text-gray-500 hover:text-black border-2 border-black rounded-full size-7 flex justify-center items-center bg-white"
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
        <div className="p-4 pb-0 flex flex-col  ">
          <div className="flex flex-col  justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/abvsilxn.json"
              trigger="loop"
              delay="1500"
              stroke="light"
              colors="primary:#e83a30"
              class="size-20 "
            ></lord-icon>{" "}
            <h1 className="text-xl text-center">
              Are you sure you want to delete these items?
            </h1>
            <h1 className="text-md">This action cannot be undone.</h1>
          </div>
          <div className="flex flex-none justify-center items-center space-x-3 mt-2">
            <button
              className=" h-10 text-black bg-white font-bold py-2 px-4 rounded-md border-2 border-black shadow-black-2
            active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className=" h-10 text-black bg-[#ff6961] font-bold py-2 px-4 rounded-md border-2 border-black shadow-black-2
            active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
              onClick={hanldeDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;

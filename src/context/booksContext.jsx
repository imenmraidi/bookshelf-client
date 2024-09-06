import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxios from "../utils/useAxios";

const BooksContext = createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};
export default BooksContext;

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);
  const [sharing, setSharing] = useState(false);
  const [sharedBooks, setSharedBooks] = useState(null);
  const [sharer, setSharer] = useState(null);

  const { user } = useSelector(state => state.auth);
  const api = useAxios();
  console.log(user);

  const handleSetBooksState = data => {
    setBooks(data);
    const sortedReadBooks = data
      .filter(s => s.status === "R")
      ?.sort((a, b) => a.shelfIndex - b.shelfIndex);
    setReadBooks(sortedReadBooks);

    const sortedCurrentlyReadingBooks = data
      .filter(s => s.status === "C")
      ?.sort((a, b) => a.shelfIndex - b.shelfIndex);
    setCurrentlyReadingBooks(sortedCurrentlyReadingBooks);

    const sortedToReadBooks = data
      .filter(s => s.status === "T")
      ?.sort((a, b) => a.shelfIndex - b.shelfIndex);
    setToReadBooks(sortedToReadBooks);
  };
  const fetchData = async () => {
    try {
      const response = await api.post("/api/book/booksByShelf", {
        userId: user.id,
      });
      console.log("res", response.data);
      handleSetBooksState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sharing === true && sharedBooks !== null)
      handleSetBooksState(sharedBooks);
    else if (user) fetchData();
  }, [user, sharing, sharedBooks]);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        readBooks,
        setReadBooks,
        currentlyReadingBooks,
        setCurrentlyReadingBooks,
        toReadBooks,
        setToReadBooks,
        setSharing,
        sharing,
        setSharedBooks,
        sharer,
        setSharer,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

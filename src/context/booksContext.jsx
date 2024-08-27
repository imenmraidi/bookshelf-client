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

  const { user } = useSelector(state => state.auth);
  const api = useAxios();
  console.log(user);

  const fetchData = async () => {
    try {
      const response = await api.post(
        "/api/book/booksByShelf",
        { userId: user.id }
      );
      console.log("res", response.data);
      setBooks(response.data);
      setReadBooks(
        response.data
          .filter(s => s.status === "R")
          ?.sort((a, b) => a.shelfIndex - b.shelfIndex)
      );
      console.log("readBooks", readBooks);
      setCurrentlyReadingBooks(
        response.data
          .filter(s => s.status === "C")
          ?.sort((a, b) => a.shelfIndex - b.shelfIndex)
      );
      setToReadBooks(
        response.data
          .filter(s => s.status === "T")
          ?.sort((a, b) => a.shelfIndex - b.shelfIndex)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

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
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

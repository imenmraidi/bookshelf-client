import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Container from "./Container";
import AddBooksModal from "../comm/AddBooksModal";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // If you're using React Router
import { useBooks } from "../context/booksContext";
import axios from "axios";
function SharedLib() {
  const { setSharing, setSharedBooks, setSharer } = useBooks();
  const [permitVisit, setPermitVisit] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const validateToken = async token => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/book/visitLibrary`,
          {
            token: token,
          }
        );
        console.log(response.data);
        setSharing(true);
        setSharedBooks(response.data.shelvesWithBooks);
        setSharer(response.data.sharer);
        setPermitVisit(true);
      } catch (error) {
        console.log(error);
        setPermitVisit(false);
      }
    };
    if (token) validateToken(token);
    else setPermitVisit(false);
  }, [location.search, setSharing]);

  if (!permitVisit)
    return (
      <div className="flex w-full h-full justify-centeritems-center text-7xl">
        404 not found{" "}
      </div>
    );
  else
    return (
      <div className="bg-bg-2 m-0 p-4 h-screen w-screen flex flex-col overflow-auto">
        <TopBar />
        <Container />
      </div>
    );
}

export default SharedLib;

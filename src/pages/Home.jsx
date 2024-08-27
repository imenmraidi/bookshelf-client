import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Container from "./Container";
import AddBooksModal from "../comm/AddBooksModal";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Home() {
  const { user } = useSelector(state => state.auth);
  const [addBookModal, setAddBookModal] = useState(false);
  const api = useAxios();

  return (
    <div className="bg-bg-2 m-0 p-4 h-screen w-screen flex flex-col overflow-auto">
      <TopBar addBook={() => setAddBookModal(true)} />
      <Container />
      <AddBooksModal isOpen={addBookModal} setOpen={setAddBookModal} />
    </div>
  );
}

export default Home;

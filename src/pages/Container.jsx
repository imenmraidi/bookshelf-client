import React, { act, useState } from "react";
import Read from "../components/Read";
import CurrentlyReading from "../components/CurrentlyReading";
import ToRead from "../components/ToRead";
import { createPortal } from "react-dom";
import { useBooks } from "../context/booksContext";
import useAxios from "../utils/useAxios";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { arrayMove } from "@dnd-kit/sortable";
import Book from "../components/Book";
function Container() {
  const api = useAxios();
  const { user } = useSelector(state => state.auth);

  const { readBooks, setReadBooks, setCurrentlyReadingBooks, setToReadBooks } =
    useBooks();
  const handleDragStart = event => {
    console.log("drag start", event);
    if (event.active.data.current.type === "book") {
      setActiveBook(event.active.data.current.book);
    }
    return;
  };
  const handleDragEnd = async event => {
    const { active, over } = event;
    console.log("drop end", event);
    setActiveBook(null);
    if (active.data.current.type === "shelf") {
      if (!over) return;
      if (active.data.current?.type !== over.data.current?.type) return;
      if (active.data.current?.status !== over.data.current?.status) return;
      const status = active.data.current?.status;
      if (!status) return;
      const setBooks =
        status === "R"
          ? setReadBooks
          : status === "C"
          ? setCurrentlyReadingBooks
          : status === "T"
          ? setToReadBooks
          : null;
      setBooks(prev => {
        return arrayMove(
          prev,
          active.data.current?.sortable?.index,
          over.data.current?.sortable?.index
        );
      });

      try {
        const response = await api.put(
          `/api/book/updateShelfIndex/${active.id}`,
          {
            activeIndex: active.data.current?.sortable?.index,
            overIndex: over.data.current?.sortable?.index,
            userId: user.id,
            status,
          }
        );
        console.log("Shelf updated successfully", response.data);
      } catch (error) {
        console.error("error updating shelf:", error);
        toast.error("Something went wrong when updating shelf", {
          position: "top-center",
        });
      }
    } else if (active.data.current?.type === "book") {
      if (!over) return;
      if (active.data.current?.status !== over.data.current?.status) return;
      const activeShelfId = active.data.current?.sortable?.containerId;
      const activeBook = active.data.current?.book;
      const overShelfId =
        over.data.current?.type === "book"
          ? over.data.current?.sortable?.containerId
          : over.id;
      const status = active.data.current?.status;
      if (!status) return;
      const setBooks =
        status === "R"
          ? setReadBooks
          : status === "C"
          ? setCurrentlyReadingBooks
          : status === "T"
          ? setToReadBooks
          : null;
      if (over.data.current?.type === "book") {
        if (!activeShelfId || !overShelfId || activeShelfId !== overShelfId)
          return;

        setBooks(prev =>
          prev.map(s =>
            s._id === overShelfId
              ? {
                  ...s,
                  books: arrayMove(
                    [
                      ...s.books.map(b =>
                        b._id === active.id
                          ? {
                              ...b,
                              shelfId: overShelfId,
                            }
                          : b
                      ),
                    ],
                    active.data.current?.sortable?.index,
                    over.data.current?.sortable?.index
                  ),
                }
              : s
          )
        );
        try {
          const { _id: activeBookId, ...book } = activeBook;
          const response = await api.put(`/api/book/update/${active.id}`, {
            book: {
              ...book,
              index: over.data.current?.sortable?.index,
              shelfId: overShelfId,
            },
            over: {
              index: active.data.current?.sortable?.index,
              type: "book",
              switchShelf:
                activeBook.shelfId !== overShelfId ? activeBook.shelfId : null,
            },
          });

          console.log("Book updated successfully", response);
        } catch (error) {
          console.error("Error updating book:", error);
          toast.error("Something went wrong when updating book", {
            position: "top-center",
          });
        }
      } else if (over.data.current?.type === "shelf") {
        setBooks(prev =>
          prev.map(s =>
            s._id === overShelfId
              ? {
                  ...s,
                  books: s.books.map(b =>
                    b._id === active.id
                      ? {
                          ...b,
                          shelfId: overShelfId,
                        }
                      : b
                  ),
                }
              : s
          )
        );
        try {
          const { _id, ...book } = activeBook;
          const response = await api.put(`/api/book/update/${activeBook._id}`, {
            book: {
              ...book,
              shelfId: over.id,
              status: over.data.current?.sortable?.containerId,
            },
            over: {
              type: "shelf",
              switchShelf:
                activeBook.shelfId !== overShelfId ? activeBook.shelfId : null,
            },
          });
          console.log("Book updated successfully", response);
        } catch (error) {
          console.error("Error updating book:", error);
          toast.error("Something went wrong when updating book", {
            position: "top-center",
          });
        }
      }
    }

    return;
  };
  const handleDragOver = event => {
    const { active, over } = event;
    console.log("drag over", event);
    if (!over) return;

    const isActiveABook = active.data.current?.type === "book";
    const isOverABook = over.data.current?.type === "book";
    if (!isActiveABook) return;

    const activeBookId = active.id;
    const overBookId = over.id;
    if (activeBookId === overBookId) return;

    const activeBook = active.data.current?.book;
    const overBook = over.data.current?.book;
    const activeShelfId = active.data.current?.sortable?.containerId;
    const overShelfId = isOverABook
      ? over.data.current?.sortable?.containerId
      : over.id;
    const overStatus = isOverABook
      ? over.data.current?.status
      : over.data.current?.sortable?.containerId;
    const activeStatus = active.data.current?.status;
    if (!activeShelfId || !overShelfId) return;
    if (activeShelfId === overShelfId && activeStatus === overStatus) return;
    if (!overStatus) return;
    const setOverBooks =
      overStatus === "R"
        ? setReadBooks
        : overStatus === "C"
        ? setCurrentlyReadingBooks
        : overStatus === "T"
        ? setToReadBooks
        : null;
    setOverBooks(prev =>
      prev.map(s =>
        s._id === overShelfId
          ? {
              ...s,
              books: arrayMove(
                [
                  ...s.books,
                  {
                    ...activeBook,
                    status: overStatus,
                  },
                ],
                s.books.length,
                isOverABook
                  ? over.data.current?.sortable?.index
                  : s.books.length
              ),
            }
          : s._id === activeShelfId
          ? {
              ...s,
              books: s.books.filter(b => b._id !== activeBookId),
            }
          : s
      )
    );
    if (activeStatus !== overStatus) {
      const setActiveBooks =
        activeStatus === "R"
          ? setReadBooks
          : activeStatus === "C"
          ? setCurrentlyReadingBooks
          : activeStatus === "T"
          ? setToReadBooks
          : null;
      setActiveBooks(prev =>
        prev.map(s =>
          s._id === activeShelfId
            ? {
                ...s,
                books: s.books.filter(b => b._id !== activeBookId),
              }
            : s
        )
      );
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );
  const [activeBook, setActiveBook] = useState(null);

  return (
    <div className=" flex flex-grow mt-6 overflow-auto">
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <Read />
        <div className=" h-full w-1/2 flex flex-col   ">
          <div className="flex  w-full h-1/3 justify-end ">
            <CurrentlyReading />
          </div>
          <div className="flex w-full h-2/3 justify-end mt-0  ">
            <ToRead />
          </div>
        </div>

        {activeBook &&
          createPortal(
            <DragOverlay>
              {<Book book={activeBook} dragging={true}></Book>}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default Container;

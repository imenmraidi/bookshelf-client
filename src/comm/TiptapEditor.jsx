import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useBooks } from "../context/booksContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faHeading,
  faUnderline,
  faAlignRight,
  faAlignJustify,
  faAlignCenter,
  faAlignLeft,
  faHighlighter,
  faPencil,
  faQuoteRight,
  faImage,
  faListOl,
  faListUl,
  faTextSlash,
} from "@fortawesome/free-solid-svg-icons";

const TiptapEditor = ({ notes, setNotes, editNotes, hide }) => {
  const [openFontColor, setOpenFontColor] = useState(false);
  const [openHeading, setOpenHeading] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);
  const [openAlign, setOpenAlign] = useState(false);

  const editor = useEditor({
    editable: editNotes ? true : false,
    extensions: [
      StarterKit,
      Color,
      Underline,
      TextStyle.configure({ types: [ListItem.name] }),
      ,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm text-base space-y-2 sm:text-base  sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none",
      },
    },
    content: notes || "<p>Your notes here...</p>",
    onUpdate: ({ editor }) => {
      setNotes(editor.getHTML());
    },

    onSelectionUpdate: () => {
      setOpenFontColor(false);
      setOpenHeading(false);
      setOpenHighlight(false);
      setOpenAlign(false);
    },
  });

  useEffect(() => {
    if (editNotes && editor) {
      editor.commands.focus();
    }
  }, [editNotes, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="p-3">
      {/* Toolbar */}
      {editNotes && (
        <>
          <div className="flex space-x-1 mb-3 md:flex-wrap sm:flex-wrap ">
            <div className="relative  size-7">
              <button
                onClick={() => {
                  setOpenFontColor(false);
                  setOpenHighlight(false);
                  setOpenAlign(false);
                  setOpenHeading(!openHeading);
                }}
                className={editor.isActive("heading") ? "tool-active" : "tool"}
              >
                <FontAwesomeIcon icon={faHeading} />
              </button>
              {openHeading && (
                <div className="absolute top-full mt-2 left-0 z-10  flex space-x-1 w-26 ring-1 ring-black shadow-black-2 p-1  bg-white2  ">
                  <div className="absolute top-0 left-1 transform  -translate-y-full">
                    <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-black"></div>
                  </div>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={`p-2 size-7 rounded  flex justify-center items-center text-xl font-bold hover:bg-slate-200 
                 ${
                   editor.isActive("heading", { level: 1 })
                     ? "bg-slate-200 border-1 border-black"
                     : "bg-inherit"
                 }`}
                  >
                    H1
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={`p-1 size-7 rounded justify-center items-center flex  text-lg font-bold hover:bg-slate-200  
                ${
                  editor.isActive("heading", { level: 2 })
                    ? "bg-slate-200 border-1 border-black"
                    : "bg-inherit"
                }`}
                  >
                    H2
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={`p-1 size-7 rounded justify-center items-center flex  text-base font-bold hover:bg-slate-200  
                ${
                  editor.isActive("heading", { level: 3 })
                    ? "bg-slate-200 border-1 border-black"
                    : "bg-inherit"
                }`}
                  >
                    H3
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={`p-1 size-7 rounded justify-center items-center flex  text-sm font-bold hover:bg-slate-200  
                ${
                  editor.isActive("heading", { level: 4 })
                    ? "bg-slate-200 border-1 border-black"
                    : "bg-inherit"
                }`}
                  >
                    H4
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    className={`p-1 size-7 rounded justify-center items-center flex  text-xs font-bold hover:bg-slate-200  
                ${
                  editor.isActive("heading", { level: 5 })
                    ? "bg-slate-200 border-1 border-black"
                    : "bg-inherit"
                }`}
                  >
                    H5
                  </button>
                </div>
              )}
            </div>
            {/* <hr className="border-gray-500  border-l h-7" /> */}

            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "tool-active" : "tool"}
            >
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "tool-active" : "tool"}
            >
              <FontAwesomeIcon icon={faItalic} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "tool-active" : "tool"}
            >
              <FontAwesomeIcon icon={faUnderline} />
            </button>
            {/* <hr className="border-gray-500  border-l h-7" /> */}
            <div className="relative  size-7">
              <button
                onClick={() => {
                  setOpenFontColor(false);
                  setOpenHeading(false);
                  setOpenHighlight(false);
                  setOpenAlign(!openAlign);
                }}
                className="tool-active"
              >
                <FontAwesomeIcon icon={faAlignJustify} />{" "}
              </button>
              {openAlign && (
                <div className="absolute top-full mt-2 left-0 z-10  flex space-x-1 w-26 ring-1 ring-black shadow-black-2 p-1  bg-white2  ">
                  <div className="absolute top-0 left-1 transform  -translate-y-full">
                    <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-black"></div>
                  </div>
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    className={`p-2 size-7 rounded  flex justify-center items-center text-xl font-bold hover:bg-slate-200 
                  ${
                    editor.isActive({ textAlign: "left" })
                      ? "bg-slate-200 border-1 border-black"
                      : "bg-inherit"
                  }`}
                  >
                    <FontAwesomeIcon icon={faAlignLeft} size="sm" />
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    className={`p-2 size-7 rounded  flex justify-center items-center text-xl font-bold hover:bg-slate-200 
                  ${
                    editor.isActive({ textAlign: "center" })
                      ? "bg-slate-200 border-1 border-black"
                      : "bg-inherit"
                  }`}
                  >
                    <FontAwesomeIcon icon={faAlignCenter} size="sm" />
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    className={`p-2 size-7 rounded  flex justify-center items-center text-xl font-bold hover:bg-slate-200 
                  ${
                    editor.isActive({ textAlign: "right" })
                      ? "bg-slate-200 border-1 border-black"
                      : "bg-inherit"
                  }`}
                  >
                    <FontAwesomeIcon icon={faAlignRight} size="sm" />
                  </button>
                </div>
              )}
            </div>

            {/* <hr className="border-gray-500  border-l h-7" /> */}

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "tool-active" : "tool"}
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive("orderedList") ? "tool-active" : "tool"
              }
            >
              <FontAwesomeIcon icon={faListOl} />
            </button>
            <div className="relative  size-7">
              <button
                onClick={() => {
                  setOpenHeading(false);
                  setOpenHighlight(false);
                  setOpenAlign(false);
                  setOpenFontColor(!openFontColor);
                }}
                className={
                  editor.getAttributes("textStyle").color
                    ? "tool-active"
                    : "tool"
                }
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              {openFontColor && (
                <div className="absolute top-full mt-2 right-0 z-10 w-34 flex flex-wrap ring-1 ring-black shadow-black-2  bg-white2   ">
                  <div className="absolute top-0 right-1 transform -translate-y-full">
                    <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-black"></div>
                  </div>
                  {[
                    "#1e1e1e",
                    "#be531a",
                    "#ff0000",
                    "#FF6900",
                    "#FCB900",
                    "#7BDCB5",
                    "#00D084",
                    "#ABB8C3",
                    "#8ED1FC",
                    "#0693E3",
                    "	#ff0065",
                    "#F78DA7",
                    "#9900EF",
                    "#e79aff",
                  ].map(color => {
                    return (
                      <button
                        key={color}
                        className={`size-5 tranform hover:scale-110 hover:border-2 hover:border-white2
                      ${
                        editor.isActive("textStyle", { color: color })
                          ? "border-2 border-white2 transform scale-110"
                          : ""
                      }
                      `}
                        data-testid={color}
                        style={{ background: color }}
                        onClick={() => {
                          editor.chain().focus().setColor(color).run();
                        }}
                      ></button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="relative  size-7">
              <button
                onClick={() => {
                  setOpenFontColor(false);
                  setOpenHeading(false);
                  setOpenAlign(false);
                  setOpenHighlight(prev => !prev);
                }}
                className={
                  editor.isActive("highlight") ? "tool-active" : "tool"
                }
              >
                <FontAwesomeIcon icon={faHighlighter} />
              </button>
              {openHighlight && (
                <div className="absolute top-full mt-2 w-38 right-0 z-10 ring-1 ring-black shadow-black-2  bg-white2  flex   ">
                  <div className="absolute top-0 right-1 transform  -translate-y-full">
                    <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-black"></div>
                  </div>
                  {[
                    "#d1f6f4",
                    "#c5f2cd",
                    "#f9caca",
                    "#eadbf6",
                    "#fff2c8",
                    "#ffcae5",
                    "#C1E1C5",
                    "#C4DEF6",
                  ].map(color => {
                    return (
                      <button
                        key={color}
                        className={`size-5 tranform hover:scale-110 hover:border-2 hover:border-white2
                  ${
                    editor.isActive("highlight", { color: color })
                      ? "border-2 border-white2 transform scale-110"
                      : ""
                  }
                  `}
                        style={{ background: color }}
                        onClick={() => {
                          editor
                            .chain()
                            .focus()
                            .toggleHighlight({ color: color })
                            .run();
                        }}
                      ></button>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "tool-active" : "tool"}
            >
              <FontAwesomeIcon icon={faQuoteRight} />
            </button>
            <button
              onClick={() => {
                editor.chain().focus().clearNodes().run();
                editor.chain().focus().unsetAllMarks().run();
              }}
              className="tool"
            >
              <FontAwesomeIcon icon={faTextSlash} />
            </button>
          </div>
          <hr className=" border-gray-500 my-2" />
        </>
      )}
      {/* Editor Content */}
      <div
        className={`bg-white relative p-2 ${
          editNotes ? "lg:h-72 md:h-48 sm:h-48" : "lg:h-90 md:h-64 sm:h-64"
        } overflow-auto`}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;

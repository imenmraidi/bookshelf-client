import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div
      className="rounded-full top-0 shadow-black-2 
     h-14 border-2 border-black bg-[#FFEAB9]
     text-black hover:shadow-black-1 flex
      items-center space-x-10 font-bold pl-6 text-lg
      transform  hover:translate-y-1 duration-200"
    >
      <Link to="/">Home</Link>
      <Link to="/">About</Link>
      <Link to="/">Contact</Link>
    </div>
  );
}

export default Header;

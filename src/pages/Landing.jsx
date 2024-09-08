import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function Landing({ component }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, []);

  return (
    <div className="bg-bg-1 m-0 p-8 min-h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-col mt-10 md:flex-row justify-between">
        <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 flex flex-col">
          <h1 className="text-4xl ml-2">Bookshelf</h1>
          <div className="rounded-tl-3xl rounded-bl-3xl rounded-br-3xl bg-bg-2 border-2 border-black shadow-black--2 mt-6 p-6 text-lg">
            <p>
              Welcome to Bookshelf! Your virtual library where you can easily
              organize and manage all your books in one place!
            </p>
          </div>
        </div>
        <div className=" sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mt-6   ">
          {component}
        </div>
      </div>
    </div>
  );
}

export default Landing;

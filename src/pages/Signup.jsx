import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup, googleLogin } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useEffect } from "react";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const action = await dispatch(
      signup({ name: data.name, email: data.email, password: data.password })
    );
    if (signup.rejected.match(action)) {
      console.log(action.payload);
      toast.error(
        action.payload.response.status === 500
          ? "une erreur s'est prosuite essayez ultérieurement"
          : action.payload.response.data,
        {
          position: "top-right",
        }
      );
    } else {
      navigate("/", {
        replace: true,
      });
    }
  };

  const googleLog = useGoogleLogin({
    onSuccess: async token => {
      const action = await dispatch(googleLogin(token));
      if (googleLogin.rejected.match(action)) {
        console.log(action.payload);
        toast.error(
          action.payload.response.cide === "ERR_NETWORK"
            ? "une erreur s'est prosuite essayez ultérieurement"
            : action.payload.response.message,
          {
            position: "top-right",
          }
        );
      } else {
        navigate("/", {
          replace: true,
        });
      }
    },
  });
  return (
    <div
      className="rounded-tr-3xl rounded-bl-3xl rounded-br-3xl
             bg-[#FFD787] border-2 border-black shadow-black-2
             p-10 text-lg ml-20 flex flex-col items-center justify-center "
    >
      <h1 className="text-3xl mb-2">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex">
          <input
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
            className={`input-login mr-4 max-w-[12rem] bg-[#FFEAB9]  shadow-yellowish-4 focus:shadow-yellowish-4 
            ${errors.name ? "text-red-700 border-red-700 border-2" : ""}`}
          />
          <input
            placeholder="Email"
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`input-login w-full bg-[#FFEAB9]  shadow-yellowish-4 focus:shadow-yellowish-4 
            ${errors.email ? "text-red-700 border-red-700 border-2" : ""}`}
          />
        </div>

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
          className={`input-login bg-[#FFEAB9] shadow-orange-4 focus:shadow-orange-4 
          ${errors.password ? "text-red-700 border-red-700 border-2" : ""}`}
        />
        <input
          placeholder="Confirm assword"
          type="password"
          {...register("confirmpass", {
            required: true,
            validate: value =>
              value === watch("password") ||
              "Les mots de passe ne correspondent pas",
          })}
          className={`input-login bg-[#FFEAB9] shadow-burgendy-4 focus:shadow-burgendy-4 
          ${errors.confirmpass ? "text-red-700 border-red-700 border-2" : ""}`}
        />
        <button
          type="submit"
          className="bg-[#FEB92E]  border-[#3D3D3D]  shadow-grey-4  text-white  p-2 mt-8
      border-2 w-full h-12 max-w-[32rem] transform flex items-center justify-center
      active:shadow-grey-2 active:translate-y-1 active:translate-x-1 transition duration-200"
        >
          {loading && (
            <lord-icon
              src="https://cdn.lordicon.com/gkryirhd.json"
              trigger="loop"
              state="loop-snake-alt"
              class="size-8 mr-2"
              colors="primary:#ffffff"
            ></lord-icon>
          )}
          Continue
        </button>
      </form>

      <button
        className=" bg-[#FFEAB9]  w-1/2 shadow-purple-4 p-2 border-2 border-black h-12 transform 
        active:shadow-purple-2 active:translate-y-1 active:translate-x-1 transition duration-200 mt-8
        flex items-center justify-center
        "
        onClick={() => {
          googleLog();
        }}
      >
        {loading && (
          <lord-icon
            src="https://cdn.lordicon.com/gkryirhd.json"
            trigger="loop"
            state="loop-snake-alt"
            class="size-7 mr-2"
            colors="primary:#00000"
          ></lord-icon>
        )}
        Continue in with Google 🚀
      </button>
    </div>
  );
}

export default Signup;

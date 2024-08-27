import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BooksProvider } from "./context/booksContext.jsx";
const classNames = x => x;

function App() {
  return (
    <div className="font-roboto-flex">
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <Provider store={store}>
            <BooksProvider>
              <Routes>
                <Route
                  path="/login"
                  element={<Landing component={<Login />} />}
                />
                <Route
                  path="/signup"
                  element={<Landing component={<Signup />} />}
                />
                <Route path="/" element={<ProtectedRoute />} />
                <Route path="*" element={<Navigate to={"/"} />} />
              </Routes>
            </BooksProvider>
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
      <ToastContainer
        toastClassName={() =>
          classNames(
            "relative flex p-2 min-h-10 border-2 border-grey shadow-grey-2 text-black rounded-md justify-between overflow-hidden cursor-pointer bg-[#F6E4BE]"
          )
        }
      />
    </div>
  );
}

export default App;

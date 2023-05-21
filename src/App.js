import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AllExpense from "./AllExpense";
import ForgetPassword from "./Login/ForgetPassword";
import Navbar from "./components/Navbar/Navbar";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const App = () => {
  const loggedIn = useSelector((state) => state.loggedIn.loggedIn);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />

      <main>
        <Routes>
          <Route
            path="/"
            exact
            element={loggedIn ? <AllExpense /> : <Login />}
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

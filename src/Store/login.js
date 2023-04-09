import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fire } from "../Login/Google";

const login = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    userVerification: false,
    username: "",
    password: "",
    // adminLogin: false,
    // getUser: "",
  },
  reducers: {
    userSignup(state, action) {
      state.username = action.payload.email;
      state.password = action.payload.password;
      const signupData = {
        name: action.payload.name,
        email: state.username,
        password: state.password,
      };
      fire.child("signupUsers").push(signupData, (err) => {
        if (err) {
          toast.error(err);
        }
      });
    },
    userLogin(state, action) {
      state.username = action.payload.email;
      state.loggedIn = true;
      localStorage.setItem("username", state.username);
      if (!state.userVerification) {
        state.loggedIn = false;
        localStorage.setItem("username", "");
        toast.error("Your Email is not Verified");
      }
    },
    loggedOut(state) {
      localStorage.setItem("username", "");
      state.loggedIn = false;
      toast.error("Logged Out Successfully");
    },
    // adminLogin(state) {
    //   state.adminLogin = true;
    // },
    // userData(state, action) {
    //   state.getUser = action.payload.data;
    // },
    userVerification(state, action) {
      state.userVerification = action.payload.verification;
    },
    isUserPresent(state, action) {
      state.username = action.payload.user;
      state.loggedIn = true;
      if (state.username === "") {
        state.loggedIn = false;
      }
    },
  },
});

export const loginActions = login.actions;

export default login;

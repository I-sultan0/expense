import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "../Login/Login.module.css";
import loginBackground from "../Assets/bgLogin.webp";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../Store/login";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surePassword, setSurePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Storing Values in 'State'

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  // const numberChangeHandler = (e) => {
  //   setNumber(e.target.value);
  // };
  // const numberLength = (e) => {
  //   if (["e", "E", "+", "-"].includes(e.key)) {
  //     e.preventDefault();
  //   }
  //   if (e.target.value.length === 10) {
  //     return toast.error("Enter Valid Number");
  //   }
  // };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value.trim());
  };
  const confirmPasswordHandler = (e) => {
    setSurePassword(e.target.value.trim());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Checking Validation

    if (!email.includes("@")) {
      return toast.error("Email is not Valid");
    }

    if (password.length < 6) {
      return toast.error("Password is less than 6 characters");
    }

    if (password !== surePassword) {
      return toast.error("Password and Confirm Password are not Same");
    }
    // if (number.length > 10 || number.length < 10) {
    //   return toast.error("Enter Valid Number");
    // }
    // If Validation is Fullfilled then the request has been send to Backend

    if (email.includes("@") && password.length >= 6) {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          setLoading(false);
          await sendEmailVerification(auth.currentUser).then(() => {});
          dispatch(
            loginActions.userSignup({
              name: name,
              // number: number,
              email: email,
              password: password,
            })
          );
          toast.success(
            " Signed up Successfully. Check your Email for Verification"
          );
          navigate("/");
        })
        .catch(() => {
          toast.error("Email Already in use");
          setLoading(false);
        });
    }
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={classes.SignLogin}>
        <img src={loginBackground} alt="Grids" />
        <div className={classes.signups}>
          <h2>Create Account</h2>

          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <input
                type="text"
                placeholder="Name"
                id="name"
                onChange={nameChangeHandler}
                value={name}
              />
              {/* <input
                type="number"
                id="number"
                placeholder="Number"
                className={classes.number}
                onChange={numberChangeHandler}
                value={number}
                required
                onKeyDown={numberLength}
              /> */}
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={emailHandler}
                value={email}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={passwordHandler}
                value={password}
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Repeat Password"
                onChange={confirmPasswordHandler}
                value={surePassword}
              />
              {/* <div className={classes.forget}>
                  <p onClick={resetHandler}>Forgot Password?</p>
                </div> */}
            </div>
            <div className={classes.btn}>
              <button type="submit">{loading ? "Loading..." : "Signup"}</button>
              <div className={classes.para}>
                <p>Already have an account?</p>
                <p className={classes.span} onClick={loginHandler}>
                  {" "}
                  Login
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

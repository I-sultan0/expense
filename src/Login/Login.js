import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
// import Google from "./Google";
import loginBackground from "../Assets/bgLogin.webp";
import { loginActions } from "../Store/login";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userPresent = localStorage.getItem("username");
    if (userPresent) {
      dispatch(loginActions.isUserPresent({ user: userPresent }));
    }
  }, [dispatch]);

  // Storing Values in 'State'
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value.trim());
  };

  const resetHandler = () => {
    navigate("/forgetpassword");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Checking Validation

    if (!email.includes("@")) {
      return toast.error("Email is not Valid");
    }

    if (password.length < 6) {
      return toast.error("Password is less than 6 characters");
    }

    // If Validation is Fullfilled then the request has been send to Backend

    if (email.includes("@") && password.length >= 6) {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const user = res.user;
          setLoading(false);
          dispatch(
            loginActions.userVerification({ verification: user.emailVerified })
          );
          dispatch(loginActions.userLogin({ email: email }));
          // console.log("Verified =", user.emailVerified);
          // console.log("Signed In Successfully");
          toast.success("Logged In Successfully");
          navigate("/");
        })
        .catch(() => {
          toast.error("Invalid Credentials");
          setLoading(false);
        });
    }
  };

  const signupHandler = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className={classes.SignLogin}>
        <img src={loginBackground} alt="Grids" />
        <div className={classes.signups}>
          <h2>Sign In</h2>

          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
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
            </div>
            <div className={classes.btn}>
              <button type="submit">{loading ? "Loading..." : "Login"}</button>

              <div className={classes.para}>
                <p>New User? </p>
                <p className={classes.span} onClick={signupHandler}>
                  Signup
                </p>
              </div>
            </div>
            <div className={classes.forget}>
              <p onClick={resetHandler}>Forgot Password?</p>
            </div>
          </form>
          {/* <Google /> */}
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import forgetPassword from "../../Assets/forget.webp";
import forgetPassword from "../Assets/forget.webp";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Storing Values in 'State'

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Checking Validation

    if (!email.includes("@")) {
      return toast.error("Email is not Valid");
    }

    // If Validation is Fullfilled then the request has been send to Backend

    if (email.includes("@")) {
      setLoading(true);

      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Password reset email sent!");
          setLoading(false);
        })
        .catch(() => {
          toast.error("User Not Found! Enter Correct Email");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className={classes.SignLogin}>
        <img src={forgetPassword} alt="Forget Password" />
        <div className={classes.signups}>
          <h2>Reset Password</h2>

          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={emailHandler}
                value={email}
              />
            </div>
            <div className={classes.btn}>
              {!loading && <button type="submit">Submit Email</button>}
              {loading && <button type="submit">Loading...</button>}

              <div className={classes.para}>
                <p className={classes.span} onClick={loginHandler}>
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

export default ForgetPassword;

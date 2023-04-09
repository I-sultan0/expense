import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../Store/login";
import logo from "../../Assets/logo.webp";
// import mobileLogo from "../../Assets/logo_mobile.png";

const Navbar = () => {
  const loggedIn = useSelector((state) => state.loggedIn.loggedIn);
  // const emailVerified = useSelector((state) => state.loggedIn.userVerification);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(loginActions.loggedOut());
  };
  return (
    <div className={classes.nav}>
      <Link to="/">
        <div className={classes.logo}>
          <img className={classes.logo1} src={logo} alt="Website Logo" />
          <img className={classes.logo2} src={logo} alt="Website Logo" />
        </div>
      </Link>
      <div className={classes.items}>
        <ul>
          {!loggedIn && (
            <li>
              <NavLink
                className={(navigationData) =>
                  navigationData.isActive ? classes.active : null
                }
                to="/signup"
              >
                <button className={classes.logout}>Signup</button>
              </NavLink>
            </li>
          )}
          {loggedIn && (
            <button onClick={logoutHandler} className={classes.logout}>
              Logout
            </button>
          )}{" "}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

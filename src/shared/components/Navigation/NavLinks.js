import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../contexts/AuthContext";

const NavLinks = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/u1/places">My places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">Add place</NavLink>
          </li>
        </>
      )}
      {!isLoggedIn ? (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      ) : (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

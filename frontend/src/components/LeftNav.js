import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink exact to="/" activeClassName="active-left-nav">
            <i class="fas fa-home"></i>
          </NavLink>
          <br />
          <NavLink exact to="/profil" activeClassName="active-left-nav">
            <i class="far fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
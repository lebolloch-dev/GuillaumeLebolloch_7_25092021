import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext, UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const [pseudo, setPseudo] = useState("");
  useEffect(() => {
    setPseudo(sessionStorage.getItem("pseudo"));
  }, [uid, pseudo]);

  return (
    <nav>
      <div className="nav-container">
        {uid ? (
          <>
            <div className="logo">
              <NavLink exact to="/">
                <div className="logo">
                  <img
                    className="world-icon"
                    src="./img/icon-world-black.png"
                    alt="logo site"
                  />

                  <img
                    className="groupo-icon"
                    src="./img/icon-groupomania-black.png"
                    alt="logo site"
                  />
                </div>
              </NavLink>
            </div>
            <div>
              <ul>
                <li className="welcome">
                  <NavLink exact to="/profil">
                    <p>
                      Bienvenue <b>{pseudo}</b>
                    </p>
                  </NavLink>
                </li>
                <Logout />
              </ul>
            </div>
          </>
        ) : (
          <div className="logo-disconnect">
            <img src="./img/icon-left-black.png" alt="logo site" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

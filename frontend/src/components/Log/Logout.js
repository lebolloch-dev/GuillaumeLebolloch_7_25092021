import React from "react";

const Logout = () => {
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("pseudo");

    window.location = "/profil";
  };
  return (
    <li onClick={logOut} className="logout" title="deconnexion">
      <div>
        <i class="fas fa-sign-out-alt"></i>
      </div>
    </li>
  );
};

export default Logout;

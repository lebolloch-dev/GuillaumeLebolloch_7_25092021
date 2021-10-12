import axios from "axios";
import React, { useEffect, useState } from "react";
import { timestampParser } from "../Utils";

const WallUser = () => {
  const [userList, setUserList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/user/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setUserList(res.data);
      });
    };
    getUsers();
  }, [isLoaded]);

  const deleteOneUser = (userId) => {
    // e.preventdefault();

    if (window.confirm("Vous allez supprimer cet utilisateur")) {
      if (
        window.confirm(
          "j'insiste, mais êtes vous sûr de vouloir supprimer cet utilisateur???"
        )
      ) {
        axios({
          method: "delete",
          url: `http://localhost:5000/api/user/${userId}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }).then(() => {
          if (isLoaded) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
          }
        });
      }
    }
  };

  return (
    <div className="allUser-container">
      <h2>Liste des utilisateurs inscrit sur Groupomania</h2>
      {userList.map((user) => {
        return (
          <div className="user-container">
            <div className="left-user">
              <img src={user.photo} alt="" />
            </div>
            <div className="right-user">
              <div className="info-user">
                <h3>{user.pseudo}</h3>
                <p>{user.email} </p>
                <p>membre depuis le {timestampParser(user.createdAt)} </p>
              </div>

              <div className="btn-delete">
                <button
                  onClick={() => {
                    deleteOneUser(user.id);
                  }}
                >
                  Suprimer l'utilisateur
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WallUser;

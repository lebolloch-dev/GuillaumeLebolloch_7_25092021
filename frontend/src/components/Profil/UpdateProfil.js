import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import LeftNav from "../LeftNav";
import { dateParser2 } from "../Utils";
import WallUser from "./WallUser";
import Swal from "sweetalert2";
import WallPostUserId from "./WallPostUserId";
import WallLikeUserId from "./WallLikeUserId";
import { useParams } from "react-router-dom";

// AFFICHAGE DU PROFIL D'UN UTILISATEUR
const UpdateProfil = () => {
  const [infoUser, setInfoUser] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [bio, setBio] = useState(infoUser.bio);
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const { id } = useParams();

  useEffect(() => {
    // RECUPERATION DES INFO D'UN USER GRACE A L'APPEL API AXIOS DANS LE BACKEND: me
    const getUser = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/user/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setInfoUser(res.data);
      });
    };
    getUser();
  }, [id, isLoaded]);

  const handlePicture = (e) => {
    // RECUPERRATION DES INFORMATION DE L'IMAGE A ENVOYER DANS LA DB SQL
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleEdit = () => {
    // MODIFICTION DU PROFIL D'UN UTILISATEUR + ENVOI DB GRACE A L'APPEL API AXIOS DANS LE BACKEND: editUser
    if (bio || picture) {
      const data = new FormData();
      if (!bio) {
        data.append("file", file);
      } else {
        data.append("bio", bio);
        data.append("file", file);
      }

      axios
        .put(`http://localhost:5000/api/user/${uid}`, data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then(() => {
          cancelPost();

          if (isLoaded) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
          }
          setShowEdit(false);
        });
    } else {
      alert("vous n'avez rien remplis");
    }
  };

  const [userPostModal, setUserPostModal] = useState(true);
  const [likePostModal, setLikePostModal] = useState(false);

  const handleModals = (e) => {
    // AFFICHAGE DYNAMIQUE DE LA SECTION POST OU LIKE DE L'UTILISATEUR
    if (e.target.id === "userPost") {
      setUserPostModal(true);
      setLikePostModal(false);
    } else if (e.target.id === "likePost") {
      setUserPostModal(false);
      setLikePostModal(true);
    }
  };

  const deleteUser = async (e) => {
    // SUPPRESSIONS D'UN UTILISATEUR DANS LA DB SQL
    e.preventDefault();
    await Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez supprimer ce compte définitivement !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "J'insiste",
          text: "Vous allez vraiment supprimer ce compte définitivement !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok !",
          cancelButtonText: "Annuler",
        }).then((result) => {
          if (result.isConfirmed) {
            axios({
              method: "delete",
              url: `http://localhost:5000/api/user/${uid}`,
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
              },
            }).then(() => {
              sessionStorage.removeItem("authToken");
              sessionStorage.removeItem("userID");
              sessionStorage.removeItem("pseudo");
              window.location = "/profil";
            });
          }
        });
      }
    });
  };

  const cancelPost = () => {
    setBio("");
    setPicture("");
    setFile("");
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <div className="infoUser-main">
        <div className="infoUser-header">
          <img src={infoUser.photo} alt="photo de profil" />
          {uid === id ? (
            <div className="button-edit">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowEdit(!showEdit);
                }}
              >
                Éditer le profil
              </button>
              {showEdit && (
                <button className="delet-user" onClick={deleteUser}>
                  Supprimer le compte
                </button>
              )}
            </div>
          ) : null}
        </div>
        <div className="infoUser-main">
          {infoUser.pseudo === "Lr4mquGt64H6pjU39N3Y" ? (
            <h2 className="admin-pseudo">ADMIN</h2>
          ) : (
            <h2>{infoUser.pseudo}</h2>
          )}

          <div className="email-birth">
            <i class="fas fa-at"></i>
            {infoUser.pseudo === "Lr4mquGt64H6pjU39N3Y" ? (
              <p>**********</p>
            ) : (
              <p>{infoUser.email} </p>
            )}
          </div>
          <div className="email-birth">
            <i class="fas fa-calendar-alt"></i>
            <span>
              A rejoint Groupomania en {dateParser2(infoUser.createdAt)}
            </span>
          </div>

          <p className="bio">{infoUser.bio} </p>
        </div>
        {showEdit && (
          <div className="edit">
            <textarea
              name="message"
              id="message"
              placeholder="Parlez nous de vous"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              defaultValue={(e) => setBio(e.target.value)}
            ></textarea>
            <img src={picture} alt="" />
            <div className="edit-footer">
              <div className="icon">
                <i class="far fa-image"></i>
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="btn">
                {bio || picture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handleEdit}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}
        {admin == 1 ? (
          <WallUser />
        ) : (
          <>
            <ul>
              <li
                onClick={handleModals}
                id="userPost"
                className={userPostModal ? "active-btn" : null}
              >
                Post
              </li>
              <li
                onClick={handleModals}
                id="likePost"
                className={likePostModal ? "active-btn" : null}
              >
                J'aime
              </li>
            </ul>
            {userPostModal && <WallPostUserId infoUser={infoUser} />}
            {likePostModal && <WallLikeUserId infoUser={infoUser} />}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateProfil;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import LeftNav from "../LeftNav";
import { dateParser2 } from "../Utils";
import WallUser from "./WallUser";

const UpdateProfil = () => {
  const [infoUser, setInfoUser] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [bio, setBio] = useState(infoUser.bio);
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);

  useEffect(() => {
    const getUser = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/user/${uid}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        // console.log(res);
        setInfoUser(res.data);
      });
    };
    getUser();
  }, [uid, isLoaded]);

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  console.log(infoUser);
  const handleEdit = () => {
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

  const deleteUser = async (e) => {
    e.preventDefault();
    if (window.confirm("Vous allez supprimer ce compte définitivement")) {
      if (
        window.confirm(
          "j'insiste, mais êtes vous sûr de vouloir supprimer ce compte???"
        )
      ) {
        await axios({
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
    }
  };

  const cancelPost = () => {
    setBio("");
    setPicture("");
    setFile("");
  };

  console.log(infoUser);

  return (
    <div className="profil-container">
      <LeftNav />
      <div className="infoUser-main">
        <div className="infoUser-header">
          <img src={infoUser.photo} alt="photo de profil" />
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
        </div>
        <div className="infoUser-main">
          <h2>{infoUser.pseudo}</h2>
          <div className="email-birth">
            <i class="fas fa-at"></i>
            <p>{infoUser.email} </p>
            {/* <a href="mailto:`${}`{infoUser.email}">Contactez-moi !</a> */}
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
        {admin == 1 ? <WallUser /> : null}
      </div>
    </div>
  );
};

export default UpdateProfil;

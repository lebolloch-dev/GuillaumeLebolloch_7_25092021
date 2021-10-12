import React, { useContext } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";

const DeleteButton = ({ post }) => {
  const uid = useContext(UidContext);
  const id = post.id;

  const deletePost = async (e) => {
    e.preventDefault();

    if (window.confirm("Vous allez supprimer ce post définitivement")) {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/post/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return <i class="far fa-trash-alt" onClick={deletePost}></i>;
};

export default DeleteButton;

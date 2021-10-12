import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DeleteButton = ({ post }) => {
  const id = post.id;

  const deletePost = async (e) => {
    e.preventDefault();

    await Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez supprimer ce post définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Supprimé", "votre Post a été supprimé", "success");
        axios({
          method: "delete",
          url: `http://localhost:5000/api/post/${id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return <i class="far fa-trash-alt" onClick={deletePost}></i>;
};

export default DeleteButton;

import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import axios from "axios";
import { timestampParser } from "../Utils";

const CardComment = ({ post }) => {
  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const [message, setMessage] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const PostId = post.id;
  const [commentId, setCommentId] = useState("");

  console.log(message);
  useEffect(() => {
    const getComment = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/comment/${post.id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setCommentList(res.data);
      });
    };
    getComment();
  }, [isLoaded]);

  const handleComment = (e) => {
    e.preventDefault();

    const data = {
      UserId: uid,
      PostId: PostId,
      message: message,
    };

    axios
      .post("http://localhost:5000/api/comment/", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setMessage("");
        if (isLoaded) {
          setIsLoaded(false);
        } else {
          setIsLoaded(true);
        }
      });
  };

  const deleteComment = async (id) => {
    if (window.confirm("Vous allez supprimer ce commentaire définitivement")) {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/comment/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then(() => {
        setMessage("");
        if (isLoaded) {
          setIsLoaded(false);
        } else {
          setIsLoaded(true);
        }
      });
    }
  };

  // console.log(commentList);
  // console.log(post);

  return (
    <div className="comments-container">
      {commentList.map((comment) => {
        return (
          <div
            className={
              comment.User.id === post.UserId
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}
          >
            {console.log(comment)}
            <img src={comment.User.photo} alt="photo de profil" />
            <div className="right-comment">
              <div className="header-comment">
                {comment.User.pseudo == "Lr4mquGt64H6pjU39N3Y" ? (
                  <h3 className="admin-pseudo">ADMIN</h3>
                ) : (
                  <h3>{comment.User.pseudo}</h3>
                )}

                <span>{timestampParser(comment.updatedAt)}</span>
              </div>
              <div className="main-comment">
                <p>{comment.message}</p>
              </div>
              <div className="footer-comment">
                {uid == comment.UserId || admin == 1 ? (
                  <i
                    class="far fa-trash-alt"
                    onClick={() => deleteComment(comment.id)}
                  ></i>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="message"
          on
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Laisser un commentaire"
          required
          autoFocus
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CardComment;

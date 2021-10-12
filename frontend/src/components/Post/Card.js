import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import CardComment from "./CardComment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { dateParser } from "../Utils";

const Card = ({ post }) => {
  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState("");

  useEffect(() => {
    setCommentLength(post.Comments.length);
  }, [showComment, commentLength]);

  return (
    <li className="card-container" key={post.id}>
      <div className="card-left">
        <img src={post.User.photo} alt="" />
      </div>
      <div className="card-right">
        <div className="card-header">
          {post.User.pseudo == "Lr4mquGt64H6pjU39N3Y" ? (
            <h2 className="admin-pseudo">ADMIN</h2>
          ) : (
            <h2>{post.User.pseudo} </h2>
          )}

          <span>{dateParser(post.updatedAt)} </span>
        </div>
        <div className="card-main">
          <p>{post.message}</p>
          {post.picture && (
            <img src={post.picture} alt="photo du post" className="card-pic" />
          )}
          {post.video && (
            <iframe
              width="560"
              height="315"
              src={post.video}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="youtube video player"
            ></iframe>
          )}
        </div>
        <div className="card-footer">
          <div className="comment-icon">
            <i
              class="far fa-comment"
              onClick={() => setShowComment(!showComment)}
            ></i>
            <span>{commentLength}</span>
          </div>
          <LikeButton post={post} />
          {uid == post.User.id || admin == 1 ? (
            <DeleteButton post={post} />
          ) : null}
        </div>
        {showComment && <CardComment post={post} />}
      </div>
    </li>
  );
};

export default Card;

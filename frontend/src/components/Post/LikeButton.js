import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const [likeList, setLikeList] = useState([]);
  const [likeCounter, setLikeCounter] = useState("");
  const UserId = uid;
  const PostId = post.id;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const likeNumber = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/like/${post.id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setLikeCounter(res.data.like);
      });
    };
    likeNumber();
  }, [isLoaded]);

  const likePost = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      url: `http://localhost:5000/api/like/`,
      data: { PostId, UserId },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    }).then((res) => {
      //   console.log(res);
      const likeMap = post.Likes.map((value) => {
        return value.UserId;
      });
      if (isLoaded) {
        setIsLoaded(false);
      } else {
        setIsLoaded(true);
      }
      if (likeMap.includes(JSON.parse([uid]))) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  };

  return (
    <div className="like-container">
      {/* {liked === false && <i class="far fa-heart" onClick={likePost}></i>}
      {liked && <i class="fas fa-heart" onClick={likePost}></i>} */}
      <i class="far fa-heart" onClick={likePost}></i>
      <span>{likeCounter}</span>
    </div>
  );
};

export default LikeButton;

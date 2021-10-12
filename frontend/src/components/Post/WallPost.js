import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const WallPost = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/post/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setPostsList(res.data.reverse());
      });
    };
    getAllPost();
  }, []);

  return (
    <div className="wall-container" id="test">
      <ul>
        {postsList.map((post, key) => {
          return <Card post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default WallPost;

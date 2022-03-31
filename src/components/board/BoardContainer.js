import React from "react";
import BoardContent from "./BoardContent";
import style from "./BoardContainer.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function BoardContainer({ type }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        params: { type: { type } },
      });
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={style.container}>
      {posts.map((post) => (
        <BoardContent
          key={post.id}
          author={post.nickname}
          commentNum={post.commentNum}
          id={post.id}
          registerDate={post.registerDate}
          tags={post.tags}
          thumbnail={post.thumbnail}
          title={post.title}
          profilePic={post.profile}
        />
      ))}
    </div>
  );
}

export default BoardContainer;

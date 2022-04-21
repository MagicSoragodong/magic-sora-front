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
        params: { type: type },
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
    <>
      {posts.length === 0 ? (
        <div className={style.container}>
          <p className={style.no_posts}></p>
          <img src="img/soraLogo.png" />
        </div>
      ) : (
        <div className={style.container}>
          {posts.map((post) => (
            <BoardContent
              key={post.id}
              author={post.author}
              commentNum={post.commentNum}
              id={post.id}
              registerDate={post.registerDate}
              tags={post.tags}
              thumbnail={post.thumbnail}
              title={post.title}
              profilePic={post.profile}
              deletePost={false}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default BoardContainer;

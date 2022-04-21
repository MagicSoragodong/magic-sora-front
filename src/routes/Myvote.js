import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../components/board/BoardContainer.module.css";

import axios from "axios";
import { SilentTokenRequest } from "../components/utils/RefreshToken";
import { useDispatch } from "react-redux";

function Myvote() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/myvotes`,
        { withCredentials: true }
      );
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"내가 투표한 글"} newPost={true} />

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
          />
        ))}
      </div>
    </div>
  );
}

export default Myvote;

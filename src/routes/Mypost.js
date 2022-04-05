import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../components/board/BoardContainer.module.css";
import axios from "axios";

function Mypost() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/myposts`,
        { withCredentials: true }
      );
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "access_token",
          response.data.data["access_token"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data["access_token"]}`;
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"내가 쓴 글"} newPost={true} />

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
            deletePost={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Mypost;

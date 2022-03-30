import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";
import BoardContent from "../components/board/BoardContent";
import style from "./New.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function New() {
  // const [posts, setPosts] = useState([]);

  // const getPosts = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/posts`, {
  //       params: { type: "new" },
  //     });
  //     // const response = await axios.get(`http://localhost:3000/ppost`);
  //     console.log(response.data);
  //     await setPosts(response.data);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"new 게"} newPost={true} />
      {/* 찐 */}
      <BoardContainer type="new" />

      {/* 짭 */}
      {/* <div className={style.container}>
        {posts.map((post) => (
          <BoardContent
            key={post.id}
            author={post.nickname}
            commentNum={post.commentNum}
            id={post.id}
            registerDate={post.registerDate}
            tags={post.tags}
            // thumbnail={post.thumbnail}
            title={post.title}
            // profilePic={post.profile}
            profilePic={post.profilePic}
            thumbnail={post.profilePic}
          />
        ))}
      </div> */}
    </div>
  );
}

export default New;

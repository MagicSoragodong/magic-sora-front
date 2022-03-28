import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import axios from "axios";

function Deadline() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        params: { type: "deadline" },
      });
      console.log("res.data:: ", response.data);
      setPosts(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"마감 임박"} newPost={true} />

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

export default Deadline;

import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import axios from "axios";

function Hot() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        // (?type="")
        params: { type: "hot" },
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
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"핫한 고민"} />

      {posts.map((post) => (
        <BoardContent
          key={post.post_id}
          id={post.post_id}
          profilePic={post.profilePic}
          nickname={post.nickname}
          date={post.register_date}
          title={post.post_title}
          thumbnail={post.thumbnail}
          tags={post.tags}
        />
      ))}
    </div>
  );
}

export default Hot;

// const getPosts = async () => {
//   try {
//     const response = await axios.get(
//       `http://jsonplaceholder.typicode.com/posts`
//     );
//     console.log("res:: ", response);
//     console.log("data:: ", response.data);
//     await setPosts(response.data);
//     console.log("들어감:: ", posts);
//   } catch (error) {
//     console.log("error:: ", error);
//   }
// };

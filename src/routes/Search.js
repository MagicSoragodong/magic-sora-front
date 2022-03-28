import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchForm from "../components/main/SearchForm";

function Search() {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;
  const selectedOption = new URLSearchParams(location).get("option");
  const searchKeyword = new URLSearchParams(location).get("search");

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/search?option=${selectedOption}&search=${searchKeyword}`,
        {
          // params: { type: "search" },
        }
      );
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
      <BoardBanner newPost={true} />
      <SearchForm
        selectedOption={selectedOption}
        searchKeyword={searchKeyword}
      />

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

export default Search;

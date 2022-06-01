import React from "react";
import Banner2 from "../components/banner/Banner2";
import style from "../components/board/BoardContainer.module.css";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchForm2 from "../components/main/SearchForm2";

function Search() {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;
  const selectedOption = new URLSearchParams(location).get("option");
  const searchKeyword = new URLSearchParams(location).get("search");
  console.log(
    "lo.getOption:: ",
    selectedOption,
    "\n",
    ", lo.getSearch:: ",
    searchKeyword
  );

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `/api/posts/search?option=${selectedOption}&search=${searchKeyword}`
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
      <SearchForm2
        selectedOption={selectedOption}
        searchKeyword={searchKeyword}
      />
      <div className={style.search_container}>
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

export default Search;

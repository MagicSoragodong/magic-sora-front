import { useState } from "react";
import axios from 'axios';
import  { useHistory } from 'react-router'; 
import style from "./SearchForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchForm() {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);
  const [index, setIndex] = useState("post_title");

  const onSelect = (event) => {
    setIndex(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (keyword === "") {
      return alert("검색어를 입력하세요.");
    }
    try {
      await axios.get( `http://localhost:3000/api/posts/search?option=${index}&search=${keyword}`)
      history.push(`/search?option=${index}&search=${keyword}`);
    }
    catch(error) {
      alert("검색을 실패했습니다.");
    }
  };

  return (
    <div>
      <form className={style.searchForm} onSubmit={onSubmit}>
        <select className={style.searchSelect} value={index} onChange={onSelect}>
          <option value="post_title">글제목</option>
          <option value="nickname">닉네임</option>
          <option value="post_content">글내용</option>
        </select>
        <input
          value={keyword}
          onChange={onChange}
          type="text"
          placeholder="검색어를 입력하세요."
        />
        <button className={style.searchButton} type="submit">
          <FontAwesomeIcon className={style.searchIcon} icon={faSearch}/>
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

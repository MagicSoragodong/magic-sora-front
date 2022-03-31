import { useState } from "react";
import { useHistory } from "react-router";
import style from "./SearchForm2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SearchForm2({ selectedOption, searchKeyword }) {
  const history = useHistory();
  const [keyword, setKeyword] = useState(searchKeyword);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  const [index, setIndex] = useState("post_title");

  const onSelect = (event) => {
    setIndex(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (keyword === "") {
      return alert("검색어를 입력하세요.");
    }
    history.push({
      pathname: "/search",
      search: `?option=${index}&search=${keyword}`,
    });
  };

  return (
    <div className={style.searchBanner}>
      <div className={style.searchForm}>
        <FontAwesomeIcon
          className={style.goback_icon}
          icon={faArrowLeft}
          onClick={() => {
            history.goBack();
          }}
        />
        <form className={style.searchForm} onSubmit={onSubmit}>
          <select
            className={style.searchSelect}
            onChange={onSelect}
            defaultValue={selectedOption}
          >
            <option value="post_title">글제목</option>
            <option value="nickname">닉네임</option>
            <option value="post_content">글내용</option>
          </select>
          <input
            defaultValue={searchKeyword}
            onChange={onChange}
            type="text"
            placeholder="검색어를 입력하세요."
          />
          <button className={style.searchButton} type="submit">
            <FontAwesomeIcon className={style.searchIcon} icon={faSearch} />
          </button>
        </form>
      </div>
      <Link to="/writing">
        <button>내 고민 작성하기</button>
      </Link>
    </div>
  );
}

export default SearchForm2;

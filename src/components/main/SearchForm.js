import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchForm() {
  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);
  const [index, setIndex] = useState("0");

  const onSelect = (event) => {
    setIndex(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Clicked");
    // 검색어 넘겨주기
  };

  return (
    <div>
      <form>
        <select value={index} onChange={onSelect}>
          <option value="0">글제목</option>
          <option value="1">닉네임</option>
          <option value="2">글내용</option>
        </select>
        <input
          value={keyword}
          onChange={onChange}
          type="text"
          placeholder="검색어를 입력하세요."
        />
        <button type="submit" onSubmit={onSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

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
  const onSubmit = (event) => {
    event.preventDefault();
    
    axios.get( `http://localhost:8000/api/search?option=${index}&search=${keyword}`) 
      .then((response) => {
        console.log(response.data);
        history.push("/search");
      }) 
      .catch((error) => {
        console.log('Error!');
      })
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post( '/search',
  //       {
  //         index: index,
  //         keyword: keyword
  //       }
  //     )
  //     console.log(response.data);
  //     history.push("/search");
  //   }
  //   catch(error) {
  //     console.log('Error!');
  //   }
  // };

  return (
    <div>
      <form className={style.searchForm} onSubmit={onSubmit}>
        <select className={style.searchSelect} value={index} onChange={onSelect}>
          <option value="post_title">글제목</option>
          <option value="post_user">닉네임</option>
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

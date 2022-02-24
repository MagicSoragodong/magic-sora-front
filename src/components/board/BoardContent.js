import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

function BoardContent({ board_name }) {
  // const { id } = useParams();
  // const getBoardContent = async () => {
  //   const json = await (
  //     await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  //   ).json();
  // };

  // useEffect(() => {
  //   getBoardContent();
  // }, []);
  // const [posts, setPosts] = useState([]);

  // const getPosts = async () => {
  //   const json = await (await fetch(`https://anj`)).json();
  //   setPosts(json.data.posts);
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <div className={style.board_content}>
      <div className={style.board_name}>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className={style.goback_icon} />
        </Link>
        {/* 게시판 이름은 파라미터 사용? */}
        <h2>{board_name}</h2>
      </div>
      <div className={style.container}>
        <div className={style.posts}></div>
      </div>
    </div>
  );
}

export default BoardContent;

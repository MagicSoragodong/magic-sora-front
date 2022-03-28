import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./BoardBanner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function BoardBanner({ board_name, newPost }) {
  let history = useHistory();

  return (
    <div className={style.board_banner}>
      <div className={style.board_name}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={style.goback_icon}
          onClick={() => {
            history.goBack();
          }}
        />
        {board_name ? <h2>{board_name}</h2> : null}
      </div>
      {newPost ? (
        <Link to="/writing">
          <button>내 고민 작성하기</button>
        </Link>
      ) : null}
    </div>
  );
}

export default BoardBanner;

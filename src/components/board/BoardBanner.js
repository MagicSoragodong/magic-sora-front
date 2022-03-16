import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./BoardBanner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function BoardBanner({ board_name }) {
  let history = useHistory();

  return (
    <div className={style.board_content}>
      <div className={style.board_name}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={style.goback_icon}
          onClick={() => {
            history.goBack();
          }}
        />
        <h2>{board_name}</h2>
        <Link to="/">
          <button>내 고민 작성하기</button>
        </Link>
      </div>
    </div>
  );
}

export default BoardBanner;

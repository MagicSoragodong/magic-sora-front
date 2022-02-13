import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BoardContent() {
  return (
    <div className={style.board_content}>
      <div className={style.board_name}>
        <FontAwesomeIcon icon={faArrowLeft} className={style.goback_icon} />
        {/* 게시판 이름은 파라미터 사용 */}
        <h2>핫한 고민</h2>
      </div>
      BoardContent
    </div>
  );
}

export default BoardContent;

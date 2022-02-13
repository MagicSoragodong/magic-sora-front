import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Board.module.css";

function Board() {
  return (
    <div className={style.boards}>
      <div className={style.upperBoard}>
        <Link to={"/hot"} className={style.board}>
          <h2>핫게</h2>
        </Link>
        <Link to={"/new"} className={style.board}>
          <h2>new게</h2>
        </Link>
      </div>

      <div className={style.lowerBoard}>
        <Link to={"/favtag"} className={style.board}>
          <h2>관심태그</h2>
        </Link>
        <Link to={"/deadline"} className={style.board}>
          <h2>종료임박</h2>
        </Link>
      </div>
    </div>
  );
}

export default Board;

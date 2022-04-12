import React from "react";
import { useState, useEffect } from "react";
import style from "./Comments.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Comments({
  postId,
  id,
  choiceNum,
  status, // 베댓인지
  nickname,
  profilePic,
  date,
  likedNum,
  comment,
  mylike, // bool
}) {
  const history = useHistory();

  // 댓글 삭제
  const clickDeleteBtn = (event) => {
    event.preventDefault();
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      confirmDelete(event);
    }
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/posts/${postId}/comments/${id}`,
        { withCredentials: true }
      );
    } catch (e) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "access_token",
          response.data.data["access_token"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data["access_token"]}`;
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };

  // 댓글 좋아요 추가
  const addLike = async () => {
    try {
      axios.post(
        `http://localhost:8000/api/posts/${postId}/comments/likes
      `,
        { comment_id: id },
        { withCredentials: true }
      );
    } catch (e) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "access_token",
          response.data.data["access_token"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data["access_token"]}`;
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };

  // 댓글 좋아요 삭제
  const deleteLike = async () => {
    try {
      axios.delete(
        `http://localhost:8000/api/posts/${postId}/comments/likes/${id}

      `,
        { withCredentials: true }
      );
    } catch (e) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "access_token",
          response.data.data["access_token"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data["access_token"]}`;
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };

  return (
    <li className={style.container}>
      <div className={style.upper}>
        <div className={style.left}>
          {profilePic ? (
            <img className={style.profilePic} src={profilePic} />
          ) : (
            <img className={style.profilePic} src="img/soraLogo.png" />
          )}
          <span className={style.nickname}>{nickname}</span>
          <span className={style.choiceNum}>{choiceNum}</span>
          <span className={style.date}>{date}</span>
          {status === "best" ? (
            <span className={style.bestComment}>BEST</span>
          ) : null}
        </div>
        <div className={style.right}>
          {mylike ? (
            <span className={style.likeBtn_liked} onClick={deleteLike}>
              좋아요 {likedNum}
            </span>
          ) : (
            <span className={style.likeBtn} onClick={addLike}>
              좋아요 {likedNum}
            </span>
          )}
          <span className={style.justDot}>·</span>
          <span className={style.deleteBtn} onClick={clickDeleteBtn}>
            삭제
          </span>
        </div>
      </div>
      <div className={style.lower}>
        <p className={style.comment}>{comment}</p>
      </div>
    </li>
  );
}

export default Comments;

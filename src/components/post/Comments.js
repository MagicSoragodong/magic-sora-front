import React from "react";
import { useState, useEffect } from "react";
import style from "./Comments.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

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
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(Number(likedNum));
  const [likedCommentId, setLikedCommentId] = useState(null);

  const likeHandler = async ({ target }) => {
    setIsLiked(!isLiked);
    if (isLiked === false) {
      target.style.color = "#f44b47";
      target.parentNode.children[1].style.color = "#f44b47";
      setLikedCommentId(id);
      setLikedCount((prev) => prev + 1);
      await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments/likes`,
        { comment_id: likedCommentId }
      );
      setIsLiked(true);
    } else if (isLiked === true) {
      target.parentNode.children[1].style.color = "gray";
      target.style.color = "gray";
      setLikedCommentId(id);
      setLikedCount((prev) => prev - 1);
      await axios.delete(
        `http://localhost:3000/api/posts/${postId}/comments/likes/${id}`
      );
      setIsLiked(false);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      confirmDelete(event);
    }
  };
  const confirmDelete = async (event) => {
    event.preventDefault();
    await axios.delete(
      `http://localhost:8000/api/posts/${postId}/comments/${id}`
    );
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
          <span className={style.likeBtn} onClick={(e) => likeHandler(e)}>
            좋아요
          </span>
          <span key={id} className={style.likedNum}>
            {likedCount}
          </span>
          <span className={style.justDot}>·</span>
          <span className={style.deleteBtn} onClick={deleteHandler}>
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

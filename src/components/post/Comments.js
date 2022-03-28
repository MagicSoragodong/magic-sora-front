import React from "react";
import { useState, useEffect } from "react";
import style from "./Comments.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

function Comments({
  id,
  choiceNum,
  status, // 베댓인지
  nickname,
  date,
  likedNum,
  comment,
  profilePic,
  isVisible,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(likedNum);

  const likeHandler = (event) => {
    console.log("뭔데: ", isLiked);
    if (isLiked === false) {
      setIsLiked(true);
      console.log("path 클릭:: ", event.target.firstChild);
      event.target.firstChild.style.color = "#f44b47";
      setLikedCount((prev) => prev + 1);
      console.log("타켓: ", event.target);
    } else if (isLiked === true) {
      setIsLiked(false);
      event.target.firstChild.style.color = "gray";
      setLikedCount((prev) => prev - 1);
      console.log("타켓: ", event.target);
      console.log("다시path ", event.target.firstChild);
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
        </div>
        <div className={style.right}>
          <span className={style.likeBtn}>
            <FontAwesomeIcon icon={faThumbsUp} onClick={likeHandler} />
          </span>
          <span className={style.likedNum}>{likedCount}</span>
        </div>
      </div>
      <div className={style.lower}>
        <p className={style.comment}>{comment}</p>
      </div>
    </li>
  );
}

export default Comments;

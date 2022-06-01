import React from "react";
import style from "./Comments.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { SilentTokenRequest } from "../../components/utils/RefreshToken";
import { useDispatch } from "react-redux";
import { Image } from "cloudinary-react";

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
  const dispatch = useDispatch();

  // 댓글 삭제
  const clickDeleteBtn = () => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      confirmDelete();
    }
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/posts/${postId}/comments/${id}`,
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };

  // 댓글 좋아요 추가
  const addLike = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments/likes
      `,
        { comment_id: id },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      if (error.response.status === 403) {
        alert("본인의 댓글은 '좋아요'를 누를 수 없습니다.");
      } else if (error.response.status === 401) {
        SilentTokenRequest(history, dispatch);
      }
    }
  };

  // 댓글 좋아요 삭제
  const deleteLike = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/posts/${postId}/comments/likes/${id}`,
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };

  return (
    <li className={style.container}>
      <div className={style.upper}>
        <div className={style.left}>
          {profilePic ? (
            <Image
              className={style.profilePic}
              cloudName="duqzktgtq"
              publicId={profilePic}
            />
          ) : (
            <Image
              className={style.profilePic}
              cloudName="duqzktgtq"
              publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
            />
          )}
          <span className={style.nickname}>{nickname}</span>
          {choiceNum ? (
            <span className={style.choiceNum}>{choiceNum}</span>
          ) : null}
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

import React from "react";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

// props
function BoardContent({
  author,
  commentNum,
  id,
  registerDate,
  tags,
  thumbnail,
  title,
  profilePic,
  deletePost,
}) {
  const history = useHistory();
  const clickDeleteBtn = async (event) => {
    try {
      if (window.confirm("정말 이 글을 삭제하시겠습니까?")) {
        confirmDelete(event);
      }
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
  const confirmDelete = async (event) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
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
    <Link to={`/posts/${id}`}>
      <div className={style.post}>
        <div className={style.upper}>
          {profilePic ? (
            <img className={style.profilePic} src={profilePic} />
          ) : (
            <img
              className={style.profilePic}
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjVfMTU0/MDAxNTk1NjAzNjM3NTQ3.KoBLyZAITfn-ETozRXAdHtdXBsh5b07j77tmrFT9mGAg.gyiELNN6ajSs4WTs9o848gtZVUSD0jjQHAFfXFr6kFMg.JPEG.parkamsterdam/IMG_0430.JPG?type=w800"
            />
          )}
          <span className={style.author}>{author}</span>
          <strong className={style.date}>{registerDate}</strong>
          {deletePost ? (
            <span onClick={clickDeleteBtn} className={style.deletePost}>
              · 삭제
            </span>
          ) : null}
        </div>

        <div className={style.detail}>
          <h2 className={style.title}>
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </h2>
          <div className={style.thumbnailBox}>
            {thumbnail ? (
              <img className={style.thumbnail} src={thumbnail} />
            ) : (
              <p>썸네일없으면 뭐넣지?</p>
            )}
          </div>
        </div>

        <div className={style.lower}>
          <div className={style.tags}>
            {tags &&
              tags.map((tag) => (
                <span className={style.tag} key={tag}>
                  #{tag}
                </span>
              ))}
            {/* <span className={style.tag}>tag:{tag}</span> */}
          </div>
          <div>
            <FontAwesomeIcon className={style.commentIcon} icon={faComment} />
            <span className={style.commentNum}>{commentNum}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BoardContent;

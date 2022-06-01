import React from "react";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SilentTokenRequest } from "../utils/RefreshToken";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Image } from "cloudinary-react";

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
  const dispatch = useDispatch();

  const clickDeleteBtn = async () => {
    try {
      if (window.confirm("정말 이 글을 삭제하시겠습니까?")) {
        confirmDelete();
      }
    } catch (e) {
      console.log("ㄴㄴ돌아가");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        withCredentials: true,
      });
      history.push("/mypost");
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };

  return (
    <Link to={`/posts/${id}`}>
      <div className={style.post}>
        <div className={style.dummy}>
          <div className={style.upper}>
            {profilePic ? (
              <Image
                className={style.profilePic}
                cloudName="duqzktgtq"
                publicId={profilePic}
              />
            ) : (
              <img className={style.profilePic} src="img/soraLogo.png" />
            )}
            <span className={style.author}>{author}</span>
            <strong className={style.date}>{registerDate}</strong>
            {deletePost ? (
              <span onClick={clickDeleteBtn} className={style.deletePost}>
                삭제
              </span>
            ) : null}
          </div>

          <div className={style.detail}>
            <h2 className={style.title}>
              {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h2>
            <div className={style.thumbnailBox}>
              {thumbnail ? (
                <Image
                  className={style.thumbnail}
                  cloudName="duqzktgtq"
                  publicId={thumbnail}
                />
              ) : (
                <img className={style.thumbnail} src="img/soraLogo.png" />
              )}
            </div>
          </div>

          <div className={style.lower}>
            <div className={style.tags}>
              {tags &&
                tags.map((tag) => (
                  <span key={tag.tag} className={style.tag}>
                    #{tag}
                  </span>
                ))}
            </div>
            <div>
              <FontAwesomeIcon className={style.commentIcon} icon={faComment} />
              <span className={style.commentNum}>{commentNum}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BoardContent;

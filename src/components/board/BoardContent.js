import React from "react";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

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
}) {
  return (
    <Link to={`/posts/${id}`}>
      <div className={style.post}>
        <div className={style.upper}>
          <img
            /* src="https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjVfMTU0/MDAxNTk1NjAzNjM3NTQ3.KoBLyZAITfn-ETozRXAdHtdXBsh5b07j77tmrFT9mGAg.gyiELNN6ajSs4WTs9o848gtZVUSD0jjQHAFfXFr6kFMg.JPEG.parkamsterdam/IMG_0430.JPG?type=w800" */
            src={profilePic}
            // alt="profilePic"
          />
          <span className={style.author}>{author}</span>
          <strong className={style.date}>{registerDate}</strong>
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

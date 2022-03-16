import React from "react";
import { Link } from "react-router-dom";
import style from "./BoardContent.module.css";

// props
function BoardContent({
  id,
  profilePic,
  nickname,
  date,
  title,
  thumbnail,
  tags,
}) {
  return (
    <Link to={`/posts/${id}`} className={style.post}>
      <div className={style.upper}>
        <img src={profilePic} alt="profilePic" />
        <span>{nickname}</span>
        <strong>date{date}</strong>
      </div>
      <div className={style.detail}>
        <h2>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</h2>
        {thumbnail ? `<img src=${thumbnail} />` : null}
        (임시)tag: {id}
        {tags && tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </Link>
  );
}

export default BoardContent;

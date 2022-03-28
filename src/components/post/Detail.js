import React from "react";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Detail({
  id,
  title,
  content,
  registerDate,
  finishDate,
  author,
  tags,
  choice,
  isFinished,
  profilePic,
}) {
  const [isVoted, setIsVoted] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event);
    setIsVoted(true);
  };

  return (
    <div>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.upperContent}>
            <h1 className={style.title}>{title}</h1>
            <div className={style.profile}>
              <img className={style.profilePic} src={profilePic} />
              <span className={style.nickname}>{author}</span>
            </div>
          </div>
          <strong className={style.date}>
            {registerDate} ~ {finishDate}
          </strong>
          <div className={style.tags}>
            {tags &&
              tags.map((tag) => (
                <span key={tag} className={style.tag}>
                  {tag}
                </span>
              ))}
          </div>
        </header>
        <article className={style.article}>
          <p className={style.content}>{content}</p>
          {/* 선택지 */}
          <form
            onSubmit={(e) => submitHandler(e)}
            className={style.options_container}
          >
            <div className={style.options}>
              {choice.map((item) => {
                return (
                  <label key={item.id} className={style.option}>
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                    />
                    <FontAwesomeIcon
                      className={style.checked}
                      icon={faCheckCircle}
                    />
                    {item.photo_url ? (
                      <img className={style.choice_pic} src={item.photo_url} />
                    ) : (
                      ""
                    )}
                    {item.choice_content ? <p>{item.choice_content}</p> : ""}
                  </label>
                );
              })}
              {/* {choice.photo_url &&
                choice.photo_url.map((url) => (
                  <label key={url} className={style.option}>
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                    />
                    <FontAwesomeIcon
                      className={style.checked}
                      icon={faCheckCircle}
                    />
                    <img className={style.choice_pic} src={url} />
                    <p>동글</p>
                  </label>
                ))} */}
            </div>
            <div className={style.voteBtn}>
              <button type="submit">투표하기</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Detail;

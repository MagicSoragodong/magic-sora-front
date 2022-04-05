import React from "react";
import { useState } from "react";
import Result from "./Result";
import style from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Detail({
  id,
  title,
  content,
  registerDate,
  finishDate,
  author,
  tags, // 배열
  choice, // 배열
  isFinished,
  profilePic,
}) {
  const [isVoted, setIsVoted] = useState(false);
  const [choiceNum, setChoiceNum] = useState(0);

  const getIsChecked = (e) => {
    setChoiceNum(e.target.value);
    console.log("들", e.target.value);
    console.log("초", choiceNum);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsVoted(true);
    await axios.post(`http://localhost:3000/api/posts/${id}/options`, {
      choice_id: choiceNum,
    });
  };
  console.log("isvoted:", isVoted);

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
                  <label key={item.choice_id} className={style.option}>
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                      onChange={(e) => getIsChecked(e)}
                      value={item.choice_id}
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
            </div>

            <div className={style.voteBtnContainer}>
              {isFinished || isVoted ? (
                <button type="submit" disabled className={style.voteBtn}>
                  투표 완료!
                </button>
              ) : (
                <button type="submit" className={style.voteBtn}>
                  투표하기
                </button>
              )}
            </div>
          </form>
        </article>
        {/* 결과 */}
        {isFinished ? (
          <div className={style.result}>
            <Result postId={id} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;

import React from "react";
import { useState } from "react";
import Result from "./Result";
import style from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const [Finished, setFinished] = useState(isFinished);
  const [isVoted, setIsVoted] = useState(false);
  const [choiceNum, setChoiceNum] = useState(null);
  const getIsChecked = (e) => {
    console.log("e.target.val:: ", e.target.value);
    // e.taget.checked = !e.target.checked;
    console.log("e.target:: ", e.target);
    console.log("e.tar.checked?:: ", e.target.checked);
    setChoiceNum(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsVoted(true);
    axios.post(`http://localhost:8000/api/posts/${id}/options`, {
      choice_id: { choiceNum },
    });
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
                      onChange={(e) => getIsChecked(e)}
                      value={item.id}
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

            <div className={style.voteBtn}>
              {isFinished || isVoted ? (
                <button type="submit" disabled>
                  투표완료
                </button>
              ) : (
                <button type="submit">투표하기</button>
              )}
            </div>
          </form>
        </article>
        {isFinished ? (
          <div className={style.result}>
            <Result />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;

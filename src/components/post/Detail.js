import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Detail({
  id,
  title,
  profilePic,
  content,
  registerDate,
  finishDate,
  author,
  isFinished,
  tags, // 배열
  isVoted,
  choices, // 배열
  myVote, // 숫자
}) {
  const history = useHistory();
  const [choiceNum, setChoiceNum] = useState(null);

  const compare = (id) => {
    console.log("myvote", myVote);
    console.log("id", id);
    if (myVote === id) return true;
  };

  const getIsChecked = (e) => {
    setChoiceNum(e.target.value);
    console.log("들", e.target.value);
    console.log("초", choiceNum);
  };

  // 투표하기
  const submitHandler = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/posts/${id}/options
        `,
        {
          choice_id: choiceNum,
        },
        { withCredentials: true }
      );
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
        {isVoted ? ( // 투표완료
          <form className={style.options_container}>
            <div className={style.options}>
              {choices.map((choice) =>
                compare(choice.choice_id) ? (
                  <label
                    key={choice.choice_id}
                    className={style.option_selected}
                  >
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                      checked={true}
                      value={choice.choice_id}
                    />
                    <FontAwesomeIcon
                      className={style.checked_icon}
                      icon={faCheckCircle}
                    />
                    {choice.photo_url ? (
                      <img
                        className={style.choice_pic}
                        src={choice.photo_url}
                      />
                    ) : null}
                    {choice.choice_content ? (
                      <p>{choice.choice_content}</p>
                    ) : null}
                  </label>
                ) : (
                  <label
                    key={choice.choice_id}
                    className={style.option_finished}
                  >
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                      checked={false}
                      value={choice.choice_id}
                    />
                    {choice.photo_url ? (
                      <img
                        className={style.choice_pic}
                        src={choice.photo_url}
                      />
                    ) : null}
                    {choice.choice_content ? (
                      <p>{choice.choice_content}</p>
                    ) : null}
                  </label>
                )
              )}
            </div>
            <div className={style.voteBtnContainer}>
              <button type="submit" disabled className={style.voteBtn_disabled}>
                투표 완료
              </button>
            </div>
          </form>
        ) : isFinished ? ( // 투표 기간 종료
          <form className={style.options_container}>
            <div className={style.options}>
              {choices.map((choice) => (
                <label key={choice.choice_id} className={style.option_finished}>
                  {choice.photo_url ? (
                    <img className={style.choice_pic} src={choice.photo_url} />
                  ) : null}
                  {choice.choice_content ? (
                    <p>{choice.choice_content}</p>
                  ) : null}
                </label>
              ))}
            </div>
            <div className={style.voteBtnContainer}>
              <button type="submit" disabled className={style.voteBtn_disabled}>
                투표 기간 종료
              </button>
            </div>
          </form>
        ) : (
          // 투표 가능
          <form
            onSubmit={(e) => submitHandler(e)}
            className={style.options_container}
          >
            <div className={style.options}>
              {choices.map((choice) => (
                <label key={choice.choice_id} className={style.option}>
                  <input
                    className={style.radioBtn}
                    type="radio"
                    name="options"
                    onChange={(e) => getIsChecked(e)}
                    value={choice.choice_id}
                  />
                  <FontAwesomeIcon
                    className={style.checked_icon}
                    icon={faCheckCircle}
                  />
                  {choice.photo_url ? (
                    <img className={style.choice_pic} src={choice.photo_url} />
                  ) : (
                    ""
                  )}
                  {choice.choice_content ? <p>{choice.choice_content}</p> : ""}
                </label>
              ))}
            </div>
            <div className={style.voteBtnContainer}>
              <button type="submit" className={style.voteBtn}>
                투표하기
              </button>
            </div>
          </form>
        )}
      </article>
    </div>
  );
}

export default Detail;

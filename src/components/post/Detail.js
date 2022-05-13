import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SilentTokenRequest } from "../utils/RefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";

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
  const dispatch = useDispatch();
  const [choiceNum, setChoiceNum] = useState(null);
  const isLogin = useSelector((store) => store.loginStateReducer.isLogin);

  const compare = (id) => {
    if (myVote === id) return true;
  };

  const getIsChecked = (e) => {
    setChoiceNum(e.target.value);
  };

  // 투표하기
  const submitHandler = async () => {
    if (isLogin) {
      try {
        await axios.post(
          `http://localhost:3000/api/posts/${id}/options`,
          { choice_id: choiceNum },
          { withCredentials: true }
        );
      } catch (error) {
        SilentTokenRequest(history, dispatch);
      }
    } else {
      alert("로그인 후 투표할 수 있습니다");
    }
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.upperContent}>
          <h1 className={style.title}>{title}</h1>
          <div className={style.profile}>
            {/* <Image
              className={style.profilePic}
              cloudName="duqzktgtq"
              publicId={profilePic}
            /> */}
            <img
              className={style.profilePic}
              src="data:image/jpeg;base64,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"
            />
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

      {/* <article className={style.article}>
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
                    <span className={style.choice_id}>{choice.choice_id}</span>
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
                      <>
                        <div className={style.option_photo}>
                          <img
                            className={style.choice_pic}
                            src={choice.photo_url}
                          />
                        </div>
                        <p>{choice.choice_content}</p>
                      </>
                    ) : (
                      <div className={style.option_photo}>
                        <p className={style.choice_content_only}>
                          {choice.choice_content}
                        </p>
                      </div>
                    )}
                  </label>
                ) : (
                  <label
                    key={choice.choice_id}
                    className={style.option_finished}
                  >
                    <span className={style.choice_id}>{choice.choice_id}</span>
                    <input
                      className={style.radioBtn}
                      type="radio"
                      name="options"
                      checked={false}
                      value={choice.choice_id}
                    />
                    {choice.photo_url ? (
                      <>
                        <div className={style.option_photo}>
                          <img
                            className={style.choice_pic}
                            src={choice.photo_url}
                          />
                        </div>
                        <p>{choice.choice_content}</p>
                      </>
                    ) : (
                      <div className={style.option_photo}>
                        <p className={style.choice_content_only}>
                          {choice.choice_content}
                        </p>
                      </div>
                    )}
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
                  <span className={style.choice_id}>{choice.choice_id}</span>
                  {choice.photo_url ? (
                    <>
                      <div className={style.option_photo}>
                        <img
                          className={style.choice_pic}
                          src={choice.photo_url}
                        />
                      </div>
                      <p>{choice.choice_content}</p>
                    </>
                  ) : (
                    <div className={style.option_photo}>
                      <p className={style.choice_content_only}>
                        {choice.choice_content}
                      </p>
                    </div>
                  )}
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
                  <span className={style.choice_id}>{choice.choice_id}</span>
                  <input
                    className={style.radioBtn}
                    type="radio"
                    name="options"
                    onClick={(e) => getIsChecked(e)}
                    value={choice.choice_id}
                  />
                  <FontAwesomeIcon
                    className={style.checked_icon}
                    icon={faCheckCircle}
                  />

                  {choice.photo_url ? (
                    <>
                      <div className={style.option_photo}>
                        <img
                          className={style.choice_pic}
                          src={choice.photo_url}
                        />
                      </div>
                      <p>{choice.choice_content}</p>
                    </>
                  ) : (
                    <div className={style.option_photo}>
                      <p className={style.choice_content_only}>
                        {choice.choice_content}
                      </p>
                    </div>
                  )}
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
      </article> */}
    </div>
  );
}

export default Detail;

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
            <Image
              className={style.profilePic}
              cloudName="duqzktgtq"
              publicId={profilePic}
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
                          <Image
                            className={style.choice_pic}
                            cloudName="duqzktgtq"
                            publicId={choice.photo_url}
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
                          <Image
                            className={style.choice_pic}
                            cloudName="duqzktgtq"
                            publicId={choice.photo_url}
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
                        <Image
                          className={style.choice_pic}
                          cloudName="duqzktgtq"
                          publicId={choice.photo_url}
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
                        <Image
                          className={style.choice_pic}
                          cloudName="duqzktgtq"
                          publicId={choice.photo_url}
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
      </article>
    </div>
  );
}

export default Detail;

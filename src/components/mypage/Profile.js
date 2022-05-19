import { useState, useRef, useEffect } from "react";
import axios from "axios";
import QuitModal from "./QuitModal";
import style from "./Profile.module.css";
import { SilentTokenRequest } from "../utils/RefreshToken";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Profile({
  userProfileImg,
  userNickname,
  userGender,
  userYear,
  userMonth,
  userDay,
  userMbti,
}) {
  const nicknameReg = /[^\wㄱ-힣]|[\_]/g;
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const profileImgInput = useRef(null);
  const [nickname, setNickname] = useState("");
  const [nicknameFormError, setNicknameFormError] = useState(false);
  const [nicknameDuplicated, setNicknameDuplicated] = useState(false);
  const [nicknameCheckDone, setNicknameCheckDone] = useState(true);
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [mbti, setMbti] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  useEffect(() => {
    setProfileImg(userProfileImg);
    setNickname(userNickname);
    setGender(userGender);
    setYear(userYear);
    setMonth(userMonth);
    setDay(userDay);
    setMbti(userMbti);
  }, [
    userProfileImg,
    userNickname,
    userGender,
    userYear,
    userMonth,
    userDay,
    userMbti,
  ]);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const uploadProfileImg = async (event) => {
    if (event.target.files[0]) {
      setProfileImg(event.target.files[0]);
    } else {
      setProfileImg(profileImg);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const noProfileImage = () => {
    setProfileImg(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };
  const onNicknameChange = (event) => {
    setNickname(event.target.value);
    setNicknameCheckDone(false);
  };
  const onGenderChange = (event) => {
    setGender(event.target.value);
  };
  const onYearChange = (event) => {
    setYear(event.target.value);
  };
  const onMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const onDayChange = (event) => {
    setDay(event.target.value);
  };
  const onMbtiChange = (event) => {
    setMbti(event.target.value);
  };
  const onCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };
  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const onNewPasswordCheckChange = (event) => {
    setNewPasswordError(event.target.value !== newPassword);
    setNewPasswordCheck(event.target.value);
  };
  const nicknameCheck = async () => {
    if (nicknameReg.test(nickname)) {
      setNicknameFormError(true);
      setNicknameCheckDone(false);
      return;
    } else {
      setNicknameFormError(false);
    }
    try {
      await axios.get(`http://localhost:3000/api/users/nickname-exists`, {
        params: { nickname: nickname },
      });
      setNicknameDuplicated(false);
      setNicknameCheckDone(true);
      alert("사용 가능한 아이디입니다.");
    } catch (error) {
      setNicknameDuplicated(true);
      setNicknameCheckDone(false);
    }
  };
  const onProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!nicknameCheckDone) {
        alert("닉네임 중복 확인을 완료해주세요.");
      } else {
        const formData = new FormData();
        formData.append("api_key", "728191539382363");
        formData.append("file", profileImg);
        formData.append("upload_preset", "l8pnyren");

        delete axios.defaults.headers.common["Authorization"];
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duqzktgtq/image/upload",
          formData
        );
        let tempURL = response.data.url;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;

        await axios.patch(
          "http://localhost:3000/api/users/",
          {
            newUser: {
              profile_pic_url: tempURL,
              nickname: nickname,
              gender: gender,
              birth_date: `${year}${month}${day}`,
              mbti: mbti,
            },
          },
          {
            withCredentials: true,
          }
        );

        alert("프로필이 성공적으로 변경되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };
  const onPasswordSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호 일치 여부를 확인해주세요.");
      return setNewPasswordError(true);
    }
    try {
      await axios.patch(
        "http://localhost:3000/api/users/",
        {
          currentPass: currentPassword,
          newUser: {
            password: newPassword,
          },
        },
        {
          withCredentials: true,
        }
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      window.location.reload();
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };

  return (
    <div className={style.profile}>
      {/* 프로필 변경 코드 */}
      <form className={style.profileChange} onSubmit={onProfileSubmit}>
        <div className={style.sectionTitle}>
          <h2>프로필 수정</h2>
          <button type="submit">변경 사항 저장</button>
        </div>
        <div className={style.profileChangeContents}>
          <div className={style.profileImg}>
            {/* 프로필 사진 변경 */}
            <img
              src={profileImg}
              alt="profile-img"
              onClick={() => {
                profileImgInput.current.click();
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={uploadProfileImg}
              ref={profileImgInput}
            />
            <button type="button" onClick={noProfileImage}>
              기본 이미지로 변경
            </button>
          </div>
          <div className={style.personalInfo}>
            {/* 닉네임 입력 */}
            <div className={style.changeNickname}>
              <label htmlFor="user-nickname">닉네임</label>
              <input
                id="user-nickname"
                type="text"
                value={nickname}
                onChange={onNicknameChange}
                placeholder="닉네임"
                minLength="2"
              />
              <button
                type="button"
                disabled={!nickname}
                onClick={nicknameCheck}
              >
                중복 확인
              </button>
            </div>
            {nicknameFormError ? (
              <div className={style.errorMessage}>
                닉네임을 다시 입력해주세요. (특수문자, 띄어쓰기 불가)
              </div>
            ) : null}
            {nicknameDuplicated ? (
              <div className={style.errorMessage}>
                이미 사용 중인 닉네임입니다.
              </div>
            ) : null}
            {/* 성별 select */}
            <div className={style.changeInfo}>
              <label htmlFor="user-gender">성별</label>
              <select
                id="user-gender"
                value={gender}
                name="gender"
                onChange={onGenderChange}
              >
                <option value="" disabled>
                  ------------성별을 고르세요------------
                </option>
                <option value="M">남자</option>
                <option value="F">여자</option>
              </select>
            </div>
            {/* 생년월일 select */}
            <div className={style.changeBirth}>
              <h4>생년월일</h4>
              <select
                className={style.changeYear}
                id="user-year"
                value={year}
                name="year"
                onChange={onYearChange}
              >
                <option value="" disabled>
                  년도
                </option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
              </select>
              <label htmlFor="user-year">년</label>
              <select
                className={style.changeMonth}
                id="user-month"
                value={month}
                name="month"
                onChange={onMonthChange}
              >
                <option value="" disabled>
                  월
                </option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <label htmlFor="user-month">월</label>
              <select
                className={style.changeDay}
                id="user-day"
                value={day}
                name="day"
                onChange={onDayChange}
              >
                <option value="" disabled>
                  일
                </option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <label htmlFor="user-day">일</label>
            </div>
            {/* MBTI select */}
            <div className={style.changeInfo}>
              <label htmlFor="user-mbti">MBTI</label>
              <select
                id="user-mbti"
                value={mbti}
                name="mbti"
                onChange={onMbtiChange}
              >
                <option value="" disabled>
                  -----------MBTI를 고르세요-----------
                </option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
                <option value="ENFP">ENFP</option>
                <option value="ENTP">ENTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="INFP">INFP</option>
                <option value="INTP">INTP</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="INFJ">INFJ</option>
                <option value="INTJ">INTJ</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <hr className={style.profileHr} />
      {/* 비밀번호 변경 코드 */}
      <form className={style.passwordChange} onSubmit={onPasswordSubmit}>
        <div className={style.sectionTitle}>
          <h2>비밀번호 변경</h2>
          <button type="submit">변경 사항 저장</button>
        </div>
        <div className={style.passwordChangeInputs}>
          <div className={style.passwordChangeLabel}>
            <label htmlFor="current-password">현재 비밀번호</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              required
              onChange={onCurrentPasswordChange}
              placeholder="현재 비밀번호"
            />
          </div>
          <div className={style.passwordChangeLabel}>
            <label htmlFor="new-password">새 비밀번호</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              required
              onChange={onNewPasswordChange}
              placeholder="새 비밀번호"
              minLength="8"
            />
          </div>
          <div className={style.passwordChangeLabel}>
            <label htmlFor="new-password-check">새 비밀번호 확인</label>
            <input
              id="new-password-check"
              type="password"
              value={newPasswordCheck}
              required
              onChange={onNewPasswordCheckChange}
              placeholder="새 비밀번호 확인"
            />
          </div>
          {newPasswordError ? (
            <div className={style.errorMessage}>
              비밀번호가 일치하지 않습니다.
            </div>
          ) : null}
        </div>
      </form>
      <hr className={style.profileHr} />
      {/* 회원 탈퇴 코드 */}
      <div className={style.memberQuit}>
        <h2>회원 탈퇴</h2>
        <button onClick={modalClose} className={style.quitBtn}>
          회원 탈퇴
        </button>
        {modalOpen ? <QuitModal modalClose={modalClose} /> : null}
      </div>
    </div>
  );
}

export default Profile;

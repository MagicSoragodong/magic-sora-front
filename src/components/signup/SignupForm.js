import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import style from "./SignupForm.module.css";

function SignupForm() {
  const history = useHistory();
  const nicknameReg = /[^\wㄱ-힣]|[\_]/g;
  const emailReg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const [email, setEmail] = useState("");
  const [idFormError, setIdFormError] = useState(false);
  const [idDuplicated, setIdDuplicated] = useState(false);
  const [idCheckDone, setIdCheckDone] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameFormError, setNicknameFormError] = useState(false);
  const [nicknameDuplicated, setNicknameDuplicated] = useState(false);
  const [nicknameCheckDone, setNicknameCheckDone] = useState(false);
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [mbti, setMbti] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onIdChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onPasswordCheckChange = (event) => {
    setPasswordError(event.target.value !== password);
    setPasswordCheck(event.target.value);
  };
  const onNicknameChange = (event) => {
    setNickname(event.target.value);
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
  const idCheck = async () => {
    if (emailReg.test(email)) {
      setIdFormError(false);
    } else {
      return setIdFormError(true);
    }
    try {
      await axios.get(`/api/users/email-exists`, {
        params: { email: email },
      });
      setIdDuplicated(false);
      setIdCheckDone(true);
      alert("사용 가능한 아이디입니다.");
    } catch (error) {
      setIdDuplicated(true);
    }
  };
  const nicknameCheck = async () => {
    if (nicknameReg.test(nickname)) {
      return setNicknameFormError(true);
    } else {
      setNicknameFormError(false);
    }
    try {
      await axios.get(`/api/users/nickname-exists`, {
        params: { nickname: nickname },
      });
      setNicknameDuplicated(false);
      setNicknameCheckDone(true);
      alert("사용 가능한 닉네임입니다.");
    } catch (error) {
      setNicknameDuplicated(true);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordCheck) {
      alert("비밀번호 일치 여부를 확인해주세요.");
      return setPasswordError(true);
    }
    try {
      if (!idCheckDone) {
        alert("아이디 중복 확인을 완료해주세요.");
      } else if (!nicknameCheckDone) {
        alert("닉네임 중복 확인을 완료해주세요.");
      } else {
        await axios.post("/api/auth/register/local", {
          user_email: email,
          password: password,
          nickname: nickname,
          gender: gender,
          birth_date: `${year}${month}${day}`,
          mbti: mbti,
        });
        alert("회원가입 성공!");
        history.push("/login");
      }
    } catch (error) {
      alert("회원가입을 실패했습니다.");
    }
  };

  return (
    <div className={style.signupPage}>
      <div className={style.signupDiv}>
        <h1>회원가입</h1>
        <form className={style.signupForm} onSubmit={onSubmit}>
          {/* 아이디 입력 */}
          <div className={style.signupInputWithChecking}>
            <label htmlFor="user-id">아이디</label>
            <input
              id="user-id"
              type="email"
              value={email}
              required
              onChange={onIdChange}
              placeholder="아이디"
            />
            <button type="button" disabled={!email} onClick={idCheck}>
              중복 확인
            </button>
          </div>
          {idFormError ? (
            <div className={style.errorDetect}>
              이메일 형식이 맞지 않습니다.
            </div>
          ) : null}
          {idDuplicated ? (
            <div className={style.errorDetect}>
              이미 사용 중인 아이디입니다.
            </div>
          ) : null}
          {/* 비밀번호 입력 */}
          <div className={style.signupInput}>
            <label htmlFor="user-pw">비밀번호</label>
            <input
              id="user-pw"
              type="password"
              value={password}
              required
              onChange={onPasswordChange}
              placeholder="비밀번호"
              minLength="8"
            />
          </div>
          {/* 비밀번호 확인 */}
          <div className={style.signupInput}>
            <label htmlFor="user-pwcheck">비밀번호 확인</label>
            <input
              id="user-pwcheck"
              type="password"
              value={passwordCheck}
              required
              onChange={onPasswordCheckChange}
              placeholder="비밀번호 확인"
            />
          </div>
          {passwordError ? (
            <div className={style.errorDetect}>
              비밀번호가 일치하지 않습니다.
            </div>
          ) : null}
          {/* 닉네임 입력 */}
          <div className={style.signupInputWithChecking}>
            <label htmlFor="user-nickname">닉네임</label>
            <input
              id="user-nickname"
              type="text"
              value={nickname}
              required
              onChange={onNicknameChange}
              placeholder="닉네임"
              minLength="2"
            />
            <button type="button" disabled={!nickname} onClick={nicknameCheck}>
              중복 확인
            </button>
          </div>
          {nicknameFormError ? (
            <div className={style.errorDetect}>
              닉네임을 다시 입력해주세요. (특수문자, 띄어쓰기 불가)
            </div>
          ) : null}
          {nicknameDuplicated ? (
            <div className={style.errorDetect}>
              이미 사용 중인 닉네임입니다.
            </div>
          ) : null}
          {/* 성별 select */}
          <div className={style.signupInput}>
            <label htmlFor="user-gender">성별</label>
            <select
              id="user-gender"
              value={gender}
              name="gender"
              required
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
          <div className={style.birthSelect}>
            <h4>생년월일</h4>
            <select
              className={style.yearSelect}
              id="user-year"
              value={year}
              name="year"
              required
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
              className={style.monthSelect}
              id="user-month"
              value={month}
              name="month"
              required
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
              className={style.daySelect}
              id="user-day"
              value={day}
              name="day"
              required
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
          <div className={style.signupInput}>
            <label htmlFor="user-mbti">MBTI</label>
            <select
              id="user-mbti"
              value={mbti}
              name="mbti"
              required
              onChange={onMbtiChange}
            >
              <option value="" disabled>
                -----------MBTI를 고르세요-----------
              </option>
              <option value="estp">ESTP</option>
              <option value="esfp">ESFP</option>
              <option value="enfp">ENFP</option>
              <option value="entp">ENTP</option>
              <option value="estj">ESTJ</option>
              <option value="esfj">ESFJ</option>
              <option value="enfj">ENFJ</option>
              <option value="entj">ENTJ</option>
              <option value="istp">ISTP</option>
              <option value="isfp">ISFP</option>
              <option value="infp">INFP</option>
              <option value="intp">INTP</option>
              <option value="istj">ISTJ</option>
              <option value="isfj">ISFJ</option>
              <option value="infj">INFJ</option>
              <option value="intj">INTJ</option>
            </select>
          </div>
          <button className={style.signupBtn} type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

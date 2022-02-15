import { useState } from "react";
import style from "./SignupForm.module.css";

function SignupForm () {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("none");
  const [mbti, setMbti] = useState("none");
  const [passwordError, setPasswordError] = useState(false);
  const onIdChange = (event) => {
    setId(event.target.value);
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
  }
  const onMbtiChange = (event) => {
    setMbti(event.target.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    if(password !== passwordCheck) {
      return setPasswordError(true);
    }
    // axios로 회원가입폼 넘겨주기
  }

  return (
    <div className={style.signupPage}>
      <div className={style.signupDiv}>
        <h1>회원가입</h1>
        <form className={style.signupForm} onSubmit={onSubmit}>
          <div className={style.signupInput}>
            <label htmlFor="user-id">아이디</label>
            <input id="user-id" value={id} required onChange={onIdChange} placeholder="아이디" />
          </div>
          <div className={style.signupInput}>
            <label htmlFor="user-pw">비밀번호</label>
            <input id="user-pw" type="password" value={password} required onChange={onPasswordChange} placeholder="비밀번호" />
          </div>
          <div className={style.signupInput}>
            <label htmlFor="user-pwcheck">비밀번호 확인</label>
            <input id="user-pwcheck" type="password" value={passwordCheck} required onChange={onPasswordCheckChange} placeholder="비밀번호 확인" />
          </div>
          {passwordError ? <div className={style.pwerror}>비밀번호가 일치하지 않습니다.</div> : null}
          <div className={style.signupInput}>
            <label htmlFor="user-nickname">닉네임</label>
            <input id="user-nickname" type="text" value={nickname} required onChange={onNicknameChange} placeholder="닉네임" />
          </div>
          <div className={style.signupInput}>
            <label htmlFor="user-gender">성별</label>
            <select id="user-gender" value={gender} onChange={onGenderChange}>
              <option value="none">------------성별을 고르세요------------</option>
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>
          </div>
          <div className={style.signupInput}>
            <label htmlFor="user-mbti">MBTI</label>
            <select id="user-mbti" value={mbti} onChange={onMbtiChange}>
              <option value="none">-----------MBTI를 고르세요-----------</option>
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
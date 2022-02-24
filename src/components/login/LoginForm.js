import { useState } from "react";
import { Link } from "react-router-dom";
import FindPwModal from "./FindPwModal";
import style from "./LoginForm.module.css";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [findPwOpen, setFindPwOpen] = useState(false);
  const findPwClose = () => {
    setFindPwOpen(!findPwOpen);
  };
  const onIdChange = (event) => {
    setId(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // axios로 Id, Password 넘겨주기
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginDiv}>
        <h1 className={style.loginTitle}>로그인</h1>
        <form className={style.loginForm} onSubmit={onSubmit}>
          <input type="email" value={id} required onChange={onIdChange} placeholder="아이디" />
          <input type="password" value={password} required onChange={onPasswordChange} placeholder="비밀번호" />
          <button className={style.loginBtn} type="submit">
            로그인
          </button>
        </form>
        <hr className={style.loginHr}/>
        <Link to="/signup">
          <button className={style.signupBtn}>회원가입</button>
        </Link>
        <button className={style.findPasswordBtn} onClick={findPwClose}>비밀번호 찾기</button>
        {findPwOpen ? <FindPwModal findPwClose={findPwClose}/> : null}
        <img src="img/soraLogo.png" alt="cute-img"/>
      </div>
    </div>
  );
}

export default LoginForm;
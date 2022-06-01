import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import FindPwModal from "./FindPwModal";
import style from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { loginState } from "../../actions/login_action";
import { Image } from "cloudinary-react";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login/local",
        {
          user_email: id,
          password: password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("access_token", response.data.data["access_token"]);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage["access_token"]}`;
      alert("로그인 성공!");
      dispatch(loginState(true));
      history.push("/");
    } catch {
      alert("아이디 또는 비밀번호를 다시 한 번 확인해주세요.");
    }
  };

  return (
    <div className={style.loginPage}>
      <div className={style.loginDiv}>
        <h1 className={style.loginTitle}>로그인</h1>
        <form className={style.loginForm} onSubmit={onSubmit}>
          <input
            type="email"
            value={id}
            required
            onChange={onIdChange}
            placeholder="아이디"
          />
          <input
            type="password"
            value={password}
            required
            onChange={onPasswordChange}
            placeholder="비밀번호"
          />
          <button className={style.loginBtn} type="submit">
            로그인
          </button>
        </form>
        <hr className={style.loginHr} />
        <Link to="/signup">
          <button className={style.signupBtn}>회원가입</button>
        </Link>
        <button className={style.findPasswordBtn} onClick={findPwClose}>
          비밀번호 찾기
        </button>
        {findPwOpen ? <FindPwModal findPwClose={findPwClose} /> : null}
        <Image
          className={style.thumbnail}
          cloudName="duqzktgtq"
          publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
        />
      </div>
    </div>
  );
}

export default LoginForm;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import QnaModal from "./QnaModal";
import style from "./SideNav.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginState } from "../../actions/login_action";

function SideNav({ userProfileImg, userNickname }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [qnaOpen, setQnaOpen] = useState(false);
  const qnaClose = () => {
    setQnaOpen(!qnaOpen);
  };
  const pageRefresh = () => {
    window.location.reload();
  };
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", null, {
        withCredentials: true,
      });
      localStorage.removeItem("access_token");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("access_token")}`;
      alert("로그아웃 되었습니다.");
      dispatch(loginState(false));
      history.push("/");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
    }
  };
  return (
    <div className={style.sideNav}>
      <img src={userProfileImg} alt="user-profile-img" />
      <h1>{userNickname}</h1>
      <ul className={style.mypageBtns}>
        <li>
          <button onClick={pageRefresh}> 개인 정보 수정</button>
        </li>
        <li>
          <button onClick={qnaClose}>문의하기</button>
          {qnaOpen ? <QnaModal qnaClose={qnaClose} /> : null}
        </li>
        <li>
          <button onClick={logout}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from '../utils/Cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import QnaModal from "./QnaModal";
import style from "./SideNav.module.css";
import axios from "axios";

function SideNav() {
  const history = useHistory();
  const [qnaOpen, setQnaOpen] = useState(false);
  const qnaClose = () => {
    setQnaOpen(!qnaOpen);
  };
  const pageRefresh = () => {
    window.location.reload();
  };
  const logout = async() => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      alert("로그아웃 되었습니다.");
      history.push("/");
    }
    catch(error) {
      console.log('Error>> ', error)
      alert("로그아웃에 실패했습니다.");
    }
  };
  return (
    <div className={style.sideNav}>
      {/* 원래는 DB에서 사용자 사진 불러오는 곳 axios */}
      <FontAwesomeIcon className={style.userProfilePic} icon={faCircleUser} />
      {/* 원래는 DB에서 사용자 닉네임 불러오는 곳 axios */}
      <h1>푸키설의</h1>
      <ul className={style.mypageBtns}>
        <li>
          <button onClick={pageRefresh}> 개인 정보 수정</button>
        </li>
        <li>
          <button onClick={qnaClose}>문의하기</button>
          {qnaOpen ? <QnaModal qnaClose={qnaClose}/> : null}
        </li>
        <li>
          <button onClick={logout}>로그아웃</button>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
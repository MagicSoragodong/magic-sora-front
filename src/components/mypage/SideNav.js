import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import QnaModal from "./QnaModal";
import style from "./SideNav.module.css";

function SideNav() {
  const [qnaOpen, setQnaOpen] = useState(false);
  const qnaClose = () => {
    setQnaOpen(!qnaOpen);
  };
  return (
    <div className={style.sideNav}>
      {/* 원래는 DB에서 사용자 사진 불러오는 곳 */}
      <FontAwesomeIcon className={style.userProfilePic} icon={faCircleUser} />
      {/* 원래는 DB에서 사용자 닉네임 불러오는 곳 */}
      <h1>푸키설의</h1>
      <ul className={style.mypageBtns}>
        <li>
          <Link to="/mypage">
            <button>개인 정보 수정</button>
          </Link>
        </li>
        <li>
          <button onClick={qnaClose}>문의하기</button>
          {qnaOpen ? <QnaModal qnaClose={qnaClose}/> : null}
        </li>
        <li>
          <button>로그아웃</button>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
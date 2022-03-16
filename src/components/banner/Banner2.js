import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Banner2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Banner2({ width, height }) {
  const [xPosition, setX] = useState(-width);
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  const toggleProfile = () => {
    setDropdown((dropdown) => !dropdown);
  };

  useEffect(() => {
    setX(-width);
  }, []);

  // return 시작부분^^
  return (
    <div className={style.banner}>
      {/* banner2 */}
      <div className={style.banner2}>
        {/* barIcon */}
        <div className={style.barIcon}>
          <FontAwesomeIcon
            className={style.barIcon_inner}
            icon={faBars}
            onClick={toggleMenu}
          />
        </div>

        {/* logo */}
        <div>
          <Link className={style.logo} to={"/"}>
            <img src="img/soraLogo.png" alt="soragodong_logo" />
            <h1 className="">마법의 소라고동</h1>
          </Link>
        </div>
      </div>

      {/* sidebar */}
      <div
        className={style.sidebar}
        style={{
          transform: `translate(${xPosition - 16}px, ${xPosition - 16}px)`,
          width: width,
          minHeight: height,
        }}
      >
        {/* sidebar content */}
        <div className={style.content}>
          <div className={style.upperContent}>
            <img src="img/soraLogo.png" alt="soragodong_logo" />
            <FontAwesomeIcon
              icon={faBars}
              className={style.barIcon_inner}
              onClick={toggleMenu}
            />
          </div>
          <ul className={style.lowerContent}>
            <li>
              <Link to="/writing">
                <button>고민글 쓰기</button>
              </Link>
            </li>
            <li>
              <Link to="/mypost">
                <button>내가 쓴 고민</button>
              </Link>
            </li>
            <li>
              <Link to="/myvote">
                <button>내가 투표한 고민</button>
              </Link>
              <hr size="1" color="#0066ff" />
            </li>
            <li>
              <Link to="/hot">
                <button>핫한 고민</button>
              </Link>
            </li>
            <li>
              <Link to="/new">
                <button>신규 고민</button>
              </Link>
            </li>
            <li>
              <Link to="/deadline">
                <button>종료 임박</button>
              </Link>
            </li>
            <li>
              <Link to="/end">
                <button>종료된 고민</button>
              </Link>
            </li>
            <li>
              <Link to="/favtag">
                <button>관심태그</button>
              </Link>
              <hr size="1" color="#0066ff" />
            </li>
            <li>
              <Link to="/mypage">
                <button>마이페이지</button>
              </Link>
            </li>
            <li>
              <Link to="/???">
                <button>로그아웃</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* profile */}
      {/* <div className={"hidden " + style.profile1} id="notLoggedIn">
        <Link to={"/login"} className={style.login}>
          로그인
        </Link>
        <Link to={"/signup"} className={style.signup}>
          회원가입
        </Link>
      </div> */}

      {/* logined */}
      <div className={style.profile2} id="loggedIn">
        <button onClick={toggleProfile}>
          <img
            className={style.profilePic}
            src="img/soraLogo.png"
            alt="user profile"
          />
        </button>

        <div className={dropdown ? style.dropdown : "hidden"} id="dropdown">
          <ul>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <button>sign out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Banner2;

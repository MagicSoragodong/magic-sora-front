import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Banner2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../actions/login_action";
import { Image } from "cloudinary-react";

function Banner2({ width, height }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.loginStateReducer.isLogin);
  const [xPosition, setX] = useState(-width);
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", null, {
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
            <Image
              cloudName="duqzktgtq"
              publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
            />
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
            <Image
              cloudName="duqzktgtq"
              publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
            />
            <FontAwesomeIcon
              icon={faBars}
              className={style.barIcon_sidebar}
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
                <button>뜨 게</button>
              </Link>
            </li>
            <li>
              <Link to="/new">
                <button>새 게</button>
              </Link>
            </li>
            <li>
              <Link to="/deadline">
                <button>곧 게</button>
              </Link>
            </li>
            <li>
              <Link to="/end">
                <button>헌 게</button>
              </Link>
            </li>
            <li>
              <Link to="/favtag">
                <button>흥 게</button>
              </Link>
              <hr size="1" color="#0066ff" />
            </li>
            <li>
              <Link to="/mypage">
                <button>마이페이지</button>
              </Link>
            </li>
            <li>
              <button className={style.logoutBtn} onClick={logout}>
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isLogin ? (
        <div className={style.profile2} id="loggedIn">
          <button onClick={toggleProfile}>
            <Image
              className={style.profilePic}
              cloudName="duqzktgtq"
              publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
            />
          </button>

          <div className={dropdown ? style.dropdown : "hidden"} id="dropdown">
            <ul>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <button className={style.logoutBtn} onClick={logout}>
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={style.profile1} id="notLoggedIn">
          <Link to={"/login"} className={style.login}>
            로그인
          </Link>
          <Link to={"/signup"} className={style.signup}>
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
}

export default Banner2;

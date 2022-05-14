import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Banner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SilentTokenRequest } from "../../components/utils/RefreshToken";
import { loginState } from "../../actions/login_action";
import { Image } from "cloudinary-react";

function Banner({ width, height }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.loginStateReducer.isLogin);
  const [xPosition, setX] = useState(-width);
  const [dropdown, setDropdown] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(true);
  const [profile, setProfile] = useState({});
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

  const toggleProfile = () => {
    setDropdown((dropdown) => !dropdown);
  };

  const getProfilePic = async () => {
    if (isLogin) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users`, {
          withCredentials: true,
        });
        setProfile(response.data);
        setLoadingProfilePic(false);
      } catch (error) {
        SilentTokenRequest(history, dispatch);
      }
    }
  };

  useEffect(() => {
    setX(-width);
    console.log(isLogin);
    getProfilePic();
  }, []);

  return (
    <div className={style.banner}>
      {/* barIcon */}
      <div className={style.barIcon}>
        <FontAwesomeIcon
          className={style.barIcon_inner}
          icon={faBars}
          onClick={toggleMenu}
        />
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
            <img src="img/soraLogo.png" alt="soragodong logo" />
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
              <Link to="/">
                <button onClick={logout}>로그아웃</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* logo */}
      <div className={style.logoContainer}>
        <Link className={style.logo} to={"/"}>
          <img src="img/soraLogo.png" alt="soragodong_logo" />
          <h1 className="">마법의 소라고동</h1>
        </Link>
      </div>

      {isLogin ? (
        <div className={style.profile2} id="loggedIn">
          <button onClick={toggleProfile}>
            {profile.profile_pic_url && loadingProfilePic === false ? (
              <Image
                className={style.profilePic}
                cloudName="duqzktgtq"
                publicId={profile.profile_pic_url}
              />
            ) : (
              <img src="img/soralogo.png" alt="default profile pic" />
            )}
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

export default Banner;

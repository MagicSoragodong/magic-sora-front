import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Banner2 from "../components/banner/Banner2";
import SideNav from "../components/mypage/SideNav"
import Profile from "../components/mypage/Profile"
import style from "./Mypage.module.css";

function Mypage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userProfileImg, setUserProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [userNickname, setUserNickname] = useState("사용자");
  const [userGender, setUserGender] = useState("");
  const [userYear, setUserYear] = useState("");
  const [userMonth, setUserMonth] = useState("");
  const [userDay, setUserDay] = useState("");
  const [userMbti, setUserMbti] = useState("");
  const getUsersData = async() => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/",
        {
          withCredentials: true
        }
      );
      setUserProfileImg(response.data.profile_pic_url);
      setUserNickname(response.data.nickname);
      setUserGender(response.data.gender);
      setUserMbti(response.data.mbti);
      let birthdate = await response.data.birth_date;
      setUserYear(birthdate.substring(0, 4));
      setUserMonth(birthdate.substring(5, 7));
      setUserDay(birthdate.substring(8, 10));
      setLoading(false);
    }
    catch(error) {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true
          }
        );
        localStorage.setItem("access_token", response.data.data['access_token']);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data['access_token']}`;
        getUsersData();
      }
      catch(error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      {loading ? 
        <div></div>
      :
        <div>
          <Banner2 width={270} height={"100vh"} />
          <div className={style.mypage}>
            <SideNav userProfileImg={userProfileImg} userNickname={userNickname}/>
            <Profile 
              userProfileImg={userProfileImg}
              userNickname={userNickname}
              userGender={userGender}
              userYear={userYear}
              userMonth={userMonth}
              userDay={userDay}
              userMbti={userMbti}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default Mypage;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from "../components/utils/Cookie";
import Banner2 from "../components/banner/Banner2";
import SideNav from "../components/mypage/SideNav"
import Profile from "../components/mypage/Profile"
import style from "./Mypage.module.css";

function Mypage() { // useEffect 써서(header에 토큰) SideNav랑 Profile에 props로 정보 전달
  const [userProfileImg, setUserProfileImg] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userMbti, setUserMbti] = useState("");
  const getUsersData = async() => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/", {
      headers: {
          Authorization: `Bearer ${getCookie('access_token')}`
        } // access token 만료 시 refresh token까지 껴서 다시 보내기
      })
      setUserProfileImg(response.data.profile_pic_url);
      setUserNickname(response.data.nickname);
      setUserGender(response.data.gender);
      setUserBirth(response.data.birth_date);
      setUserMbti(response.data.mbti);
    }
    catch(error) {
      console.log('Error>> ', error);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <div className={style.mypage}>
        <SideNav />
        <Profile />
      </div>
    </div>
  );
}

export default Mypage;

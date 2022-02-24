import React from "react";
import Banner2 from "../components/banner/Banner2";
import SideNav from "../components/mypage/SideNav"
import Profile from "../components/mypage/Profile"
import style from "./Mypage.module.css";

function Mypage() {
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

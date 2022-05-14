import React from "react";
import { useEffect } from "react";
import Banner2 from "../components/banner/Banner2";
import WritingForm from "../components/writing/WritingForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Writing() {
  const history = useHistory();
  const isLogin = useSelector((store) => store.loginStateReducer.isLogin);
  const checkLoginState = () => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      history.push("/login");
    } else {
      return;
    }
  };
  useEffect(() => {
    checkLoginState();
  }, []);
  return (
    <div>
      {isLogin ? (
        <div>
          <Banner2 width={270} height={"100vh"} />
          <WritingForm />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Writing;

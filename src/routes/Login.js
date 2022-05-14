import React from "react";
import Banner from "../components/banner/Banner";
import LoginForm from "../components/login/LoginForm";

function Login() {
  return (
    <div>
      <Banner width={270} height={"100vh"} />
      <LoginForm />
    </div>
  );
}

export default Login;

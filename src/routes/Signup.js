import React from "react";
import Banner from "../components/banner/Banner";
import SignupForm from "../components/signup/SignupForm";

function Signup() {
  return (
    <div>
      <Banner width={270} height={"100vh"} hideProfile={true} />
      <SignupForm />
    </div>
  );
}

export default Signup;

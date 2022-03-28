import React from "react";
import Banner2 from "../components/banner/Banner2";
import WritingForm from "../components/writing/WritingForm";

function Writing() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <WritingForm />
    </div>
  );
}

export default Writing;

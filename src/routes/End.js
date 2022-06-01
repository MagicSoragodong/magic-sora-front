import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";

function End() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"헌(헐다의 과거형) 게시판"} newPost={true} />
      <BoardContainer type="end" />
    </div>
  );
}

export default End;

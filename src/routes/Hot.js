import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";

function Hot() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"뜨(거운 글) 게시판"} newPost={true} />
      <BoardContainer type="hot" />
    </div>
  );
}

export default Hot;

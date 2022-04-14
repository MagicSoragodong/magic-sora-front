import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";

function Hot() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} hideProfile={false} />
      <BoardBanner board_name={"핫한 고민"} newPost={true} />
      <BoardContainer type="hot" />
    </div>
  );
}

export default Hot;

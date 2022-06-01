import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";

function Deadline() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"곧(끝나는) 게시판"} newPost={true} />
      <BoardContainer type="deadline" />
    </div>
  );
}

export default Deadline;

import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";

function Deadline() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} hideProfile={false} />
      <BoardBanner board_name={"마감 임박"} newPost={true} />
      <BoardContainer type="deadline" />
    </div>
  );
}

export default Deadline;

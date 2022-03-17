import React from "react";
import Banner2 from "../banner/Banner2";
import BoardBanner from "../board/BoardBanner";

function Detail({ id }) {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"돌아가기"} />
      <h1>{id}</h1>
    </div>
  );
}

export default Detail;

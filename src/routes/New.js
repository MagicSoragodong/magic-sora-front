import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContainer from "../components/board/BoardContainer";
import BoardContent from "../components/board/BoardContent";
import { useState, useEffect } from "react";
import axios from "axios";

function New() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"새(로운 글) 게시판"} newPost={true} />
      <BoardContainer type="new" />
    </div>
  );
}

export default New;

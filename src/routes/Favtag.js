import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardContent from "../components/board/BoardContent";

function Favtag() {
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      {/* BoardContent props로 전달? */}
      <BoardContent board_name={"관심 태그"} />
    </div>
  );
}

export default Favtag;

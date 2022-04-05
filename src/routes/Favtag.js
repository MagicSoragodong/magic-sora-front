import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import style from "./Favtag.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Favtag() {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // 체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set()); // (임시)체크된 요소들
  const history = useHistory();
  let tempCheckedArr = new Array();

  // 처음: 모든 태그, 모든 게시글 불러옴
  const getTags = async () => {
    try {
      // 모든 태그 목록
      const everyTags = await axios.get(`http://localhost:3000/api/tags`);
      setTags(everyTags.data);
      console.log("every.data:", everyTags.data);

      // 내 관심태그
      const mytags = await axios.get(`http://localhost:3000/api/users/mytags`, {
        withCredentials: true,
      });
      tempCheckedArr = mytags.data;
      console.log("my.data:", mytags.data);

      // 내 관심태그 없으면 모든 글 보여줌.
      if (!mytags.data) {
        for (let i in everyTags.data) {
          tempCheckedArr[i] = everyTags.data[i].tag_id;
        }
      }
      // 내 관심태그 있으면 해당 글들만 보여줌.

      console.log("temparr:", tempCheckedArr);

      // 게시글 불러오기
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        params: {
          type: "favtag",
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "access_token",
          response.data.data["access_token"]
        );
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data["access_token"]}`;
        getTags();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  // 관심태그 바꿀 때
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    console.log(
      "타겟.부",
      target.parentNode,
      " id",
      target.id,
      "checked::: ",
      target.checked
    );
    checkedItemHandler(target.parentNode, target.id, target.checked);
  };
  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      //체크 되었을때
      checkedItems.add(id); //체크시 삽입
      setCheckedItems(checkedItems); //체크 요소 넣어주기
      box.style.backgroundColor = "#ffd993";
      console.log("템스", checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되었고, id가 있을때(클릭 2번시)
      checkedItems.delete(id); //체크 두번시 삭제
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
      console.log("템스", checkedItems);
    }
    return checkedItems;
  };

  // 태그 설정 버튼 누름
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("체크드 ", checkedItems, typeof checkedItems);
    console.log("사이즈", checkedItems.size);
    if (checkedItems.size !== 0) {
      tempCheckedArr = Array.from(checkedItems);
      for (let i in tempCheckedArr) {
        tempCheckedArr[i] = Number(tempCheckedArr[i]);
      }
      console.log("tempCheckedArr:: ", tempCheckedArr);
    }
    console.log("checked:: ", checkedItems);
    // mytags 수정(patch)
    await axios.patch(
      `http://localhost:3000/users/mytags`,
      // 변수명?
      { tag_id: tempCheckedArr }
    );
  };

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"관심 태그"} newPost={true} />

      {loading ? null : (
        <div>
          <form className={style.tagForm} onSubmit={(e) => submitHandler(e)}>
            <div className={style.favtags}>
              {tags.map((tag) => (
                <label key={tag.tag_id} className={style.favtag}>
                  <input
                    type="checkbox"
                    value={tag.name}
                    id={tag.tag_id}
                    onChange={(e) => checkHandler(e)}
                  />
                  <div className="tagName">{tag.name}</div>
                </label>
              ))}
            </div>
            <div className={style.setTag}>
              <button className={style.setTagBtn} type="submit">
                관심태그 설정
              </button>
            </div>
          </form>

          <div className={style.container}>
            {posts.map((post) => (
              <BoardContent
                key={post.id}
                author={post.author}
                commentNum={post.commentNum}
                id={post.id}
                registerDate={post.registerDate}
                tags={post.tags}
                thumbnail={post.thumbnail}
                title={post.title}
                profilePic={post.profile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favtag;

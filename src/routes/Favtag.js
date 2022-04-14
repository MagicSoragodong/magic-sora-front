import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import style from "./Favtag.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SilentTokenRequest } from "../components/utils/RefreshToken";

function Favtag() {
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set()); // (임시)체크된 요소들
  const [tempArr, setTempArr] = useState([]);
  let tempCheckedArr = new Array();
  const history = useHistory();

  // 처음: 모든 태그, 모든 게시글 불러옴
  const getDatas = async () => {
    try {
      // 모든 태그 목록
      const everyTags = await axios.get(`http://localhost:3000/api/tags`);
      // const everyTags = await axios.get(`http://localhost:3000/fformData`);
      setTags(everyTags.data);
      console.log("every.data:", everyTags.data);

      // 내 관심태그
      const mytags = await axios.get(`http://localhost:3000/api/users/mytags`, {
        withCredentials: true,
      });
      // const mytags = await axios.get(`http://localhost:3000/mytags`);
      for (let i in mytags.data) {
        checkedItems.add(String(mytags.data[i].tag_id));
        setCheckedItems(checkedItems);
      }
      tempCheckedArr = mytags.data.map((tag) => tag.tag_id);
      setTempArr(tempCheckedArr);
      console.log("temparr1", tempCheckedArr);

      setLoadingTags(false);
    } catch (error) {
      SilentTokenRequest(history);
    }
  };

  const getPost = async () => {
    try {
      // 게시글 불러오기
      const response = await axios.get(
        `http://localhost:3000/api/posts?type=favtag`,
        { withCredentials: true }
      );
      // const response = await axios.get(`http://localhost:3000/posts`);
      setPosts(response.data);
      setLoadingPosts(false);
    } catch (error) {
      SilentTokenRequest(history);
    }
  };
  useEffect(() => {
    getDatas();
    getPost();
  }, []);

  // 비교
  const compare = (tagId) => {
    return tempArr.includes(tagId);
  };

  // 관심태그 바꿀 때
  const checkHandler = ({ target }) => {
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
  const submitHandler = async () => {
    try {
      if (checkedItems.size !== 0) {
        tempCheckedArr = Array.from(checkedItems);
        for (let i in tempCheckedArr) {
          tempCheckedArr[i] = { tag_id: tempCheckedArr[i] };
        }
        console.log("마지막:: ", tempCheckedArr);
      }
      // mytags 수정(patch)
      await axios.patch(
        `http://localhost:3000/api/users/mytags
      `,
        { newTags: tempCheckedArr },
        { withCredentials: true }
      );
    } catch (e) {
      SilentTokenRequest(history);
    }
  };

  return (
    <div>
      <Banner2 width={270} height={"100vh"} hideProfile={false} />
      <BoardBanner board_name={"관심 태그"} newPost={true} />

      {loadingTags ? null : (
        <div>
          <form className={style.tagForm} onSubmit={(e) => submitHandler(e)}>
            <div className={style.favtags}>
              {tags.map((tag) =>
                compare(tag.tag_id) ? (
                  <label key={tag.tag_id} className={style.favtag_checked}>
                    <input
                      type="checkbox"
                      value={tag.tag_name}
                      id={tag.tag_id}
                      defaultChecked={true}
                      onChange={(e) => checkHandler(e)}
                    />
                    <div className={style.tagName}>{tag.tag_name}</div>
                  </label>
                ) : (
                  <label key={tag.tag_id} className={style.favtag}>
                    <input
                      type="checkbox"
                      value={tag.tag_name}
                      id={tag.tag_id}
                      onChange={(e) => checkHandler(e)}
                    />
                    <div className={style.tagName}>{tag.tag_name}</div>
                  </label>
                )
              )}
            </div>
            <div className={style.setTag}>
              <button className={style.setTagBtn} type="submit">
                관심태그 설정
              </button>
            </div>
          </form>
        </div>
      )}

      {loadingPosts ? null : (
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
              deletePost={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favtag;

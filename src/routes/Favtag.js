import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import style from "./Favtag.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Favtag() {
  const formData = [
    { id: 1, name: "먹을거" },
    { id: 2, name: "학업/진로" },
    { id: 3, name: "썸/연애" },
    { id: 4, name: "직장" },
    { id: 5, name: "패션" },
    { id: 6, name: "스포츠" },
    { id: 7, name: "연예인" },
    { id: 8, name: "방송인" },
    { id: 9, name: "취미" },
    { id: 10, name: "동물" },
    { id: 11, name: "게임" },
    { id: 12, name: "미용" },
    { id: 13, name: "다이어트/운동" },
    { id: 14, name: "일상" },
    { id: 15, name: "진지한 고민" },
    { id: 16, name: "쇼핑" },
    { id: 17, name: "기타" },
  ];

  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // 체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set()); // (임시)체크된 요소들
  let tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.id, target.checked);
  };

  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      //체크 되었을때
      checkedItems.add(id); //체크시 삽입
      setCheckedItems(checkedItems); //체크 요소 넣어주기
      box.style.backgroundColor = "#ffd993";
      console.log(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되었고, id가 있을때(클릭 2번시)
      checkedItems.delete(id); //체크 두번시 삭제
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
      console.log(checkedItems);
    }
    return checkedItems;
  };

  // 처음: 모든 글 불러옴 (한번만 실행됨)
  const getPosts = async () => {
    try {
      // const response = await axios.get(
      //   `http://jsonplaceholder.typicode.com/posts`
      // );
      // setPosts(response.data);
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        // (?type="")
        params: { type: "favtag" },
      });
      console.log(response.data);
      setPosts(response.data);
      console.log("포스트:: ", posts);
    } catch (error) {
      console.log("error:: ", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  // 태그 설정했을 때
  const getCheckedPosts = async () => {
    try {
      // const response = await axios.get(
      //   `http://jsonplaceholder.typicode.com/posts`,
      //   {
      //     params: { id: tempArr },
      //   }
      // );
      // setPosts(response.data);
      const response = await axios.get(`http://localhost:3000/api/posts`, {
        // (?type="")
        params: {
          type: "favtag",
          id: tempArr,
        },
      });
      console.log(response.data);
      setPosts(response.data);
      console.log("포스트:: ", posts);
    } catch (error) {
      console.log("error:: ", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("사이즈", checkedItems.size);
    if (checkedItems.size !== 0) {
      tempArr = Array.from(checkedItems);
      for (let i in tempArr) {
        tempArr[i] = Number(tempArr[i]);
      }
    }
    console.log("checked:: ", checkedItems);
    getCheckedPosts();
  };

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"관심 태그"} />
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={style.favtags}>
          {formData.map((item) => (
            <label key={item.id} className={style.favtag}>
              <input
                type="checkbox"
                value={item.name}
                id={item.id}
                onChange={(e) => checkHandler(e)}
              />
              <div className="tagName">{item.name}</div>
            </label>
          ))}
        </div>
        <button className={style.setTag} type="submit">
          관심태그 설정
        </button>
      </form>
      {/* 찐 */}
      <div className={style.container}>
        {posts.map((post) => (
          <BoardContent
            key={post.post_id}
            id={post.post_id}
            profilePic={post.profilePic}
            nickname={post.nickname}
            date={post.register_date}
            title={post.post_title}
            thumbnail={post.thumbnail}
            tags={post.tags}
          />
        ))}
      </div>
      {/* 짭 */}
      {/* <div className={style.container}>
        {posts.map((post) => (
          <BoardContent
            key={post.id}
            id={post.id}
            profilePic={post.profilePic}
            nickname={post.userId}
            date={post.register_date}
            title={post.title}
            thumbnail={post.thumbnail}
            tags={post.tags}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Favtag;

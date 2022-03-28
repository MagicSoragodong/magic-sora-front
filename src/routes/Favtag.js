import React from "react";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import BoardContent from "../components/board/BoardContent";
import style from "./Favtag.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Favtag() {
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // 체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set()); // (임시)체크된 요소들
  let tempCheckedArr = new Array();

  // 처음: 모든 태그, 모든 게시글 불러옴
  const getTags = async () => {
    try {
      // 모든 태그 목록
      const everyTags = await axios.get(`http://localhost:3000/fformdata`);
      setTags(everyTags.data); //name id
      console.log("every.data:: ", everyTags.data);

      // 내 관심태그
      const mytags = await axios.get(`http://localhost:3000/mytags`);
      tempCheckedArr = mytags.data[0].tagId;

      console.log("my.data:: ", mytags.data[0].tagId);

      // 내 관심태그 없으면 모든 글 보여줌.
      if (!tempCheckedArr) {
        for (let i in everyTags.data) {
          tempCheckedArr[i] = everyTags.data[i].id;
        }
      }
      // 내 관심태그 있으면 해당 글들만 보여줌.
      console.log("tempCheckedarr:: ", tempCheckedArr);
      for (let i in tags) {
        if (tempCheckedArr.includes(tags[i].id)) {
          console.log("띠발 ", tempCheckedArr.includes(tags[i].id));
          console.log("씨발: ", tags[i].id, " ", tags[i].name);
        }
      }

      // 게시글 불러오기
      const response = await axios.get(`http://localhost:3000/ppost`, {
        // 태그가 하나일때는 잘됨,,,,,
        params: { tag: tempCheckedArr },
      });
      setPosts(response.data);

      console.log("res.data:: ", response.data);
      console.log("게시물들:: ", posts);
    } catch (error) {
      console.log("e:: ", error);
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  // 관심태그 바꿀 때
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    console.log(
      "타겟.부모노드, id, checked ",
      target.parentNode,
      target.id,
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

  // 태그 설정 버튼 누름
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("사이즈", checkedItems.size);
    if (checkedItems.size !== 0) {
      tempCheckedArr = Array.from(checkedItems);
      for (let i in tempCheckedArr) {
        tempCheckedArr[i] = Number(tempCheckedArr[i]);
      }
      console.log("tempCheckedArr:: ", tempCheckedArr);
    }
    console.log("checked:: ", checkedItems);
    // await axios.put(
    //   `http://localhost:3000/users/mytags`,
    //   // 변수명?
    //   { tagId: tempCheckedArr }
    // );

    getCheckedPosts();
  };

  // 태그 설정 후 다시 게시글 불러오기
  const getCheckedPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ppost`, {
        params: { tag: tempCheckedArr },
      });
      console.log("포스트:: ", response.data);
      setPosts(response.data);
    } catch (error) {
      console.log("error:: ", error);
    }
  };

  // return
  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={"관심 태그"} newPost={true} />

      <form className={style.tagForm} onSubmit={(e) => submitHandler(e)}>
        {/* 관심태그 map */}
        <div className={style.favtags}>
          {tags.map((tag) =>
            tempCheckedArr.includes(tag.id) ? (
              <label key={tag.id} className={style.favtag}>
                <input
                  type="checkbox"
                  checked
                  value={tag.name}
                  id={tag.id}
                  onChange={(e) => checkHandler(e)}
                />
                <div className={style.tagname}>{tag.name}</div>
              </label>
            ) : (
              <label key={tag.id} className={style.favtag}>
                <input
                  type="checkbox"
                  value={tag.name}
                  id={tag.id}
                  onChange={(e) => checkHandler(e)}
                />
                <div className={style.tagname}>{tag.name}</div>
              </label>
            )
          )}
        </div>
        {/* 관심태그 설정 */}
        <div className={style.setTag}>
          <button className={style.setTagBtn} type="submit">
            관심태그 설정
          </button>
        </div>
      </form>

      {/* 짭 */}
      <div className={style.container}>
        {posts.map((post) => (
          <BoardContent
            key={post.id}
            id={post.id}
            profilePic={post.profilePic}
            author={post.author}
            commentNum={post.commentNum}
            // date={post.registerDate}
            title={post.title}
            thumbnail={post.thumbnailUrl}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}

export default Favtag;

///////////////////////////////////////////////////////////////////////////

// 찐
// import React from "react";
// import Banner2 from "../components/banner/Banner2";
// import BoardBanner from "../components/board/BoardBanner";
// import BoardContent from "../components/board/BoardContent";
// import style from "./Favtag.module.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// function Favtag() {
//   const [tags, setTags] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [isChecked, setIsChecked] = useState(false); // 체크 여부
//   const [checkedItems, setCheckedItems] = useState(new Set()); // (임시)체크된 요소들
//   const history = useHistory();
//   let tempCheckedArr = new Array();

//   // 처음: 모든 태그, 모든 게시글 불러옴
//   const getTags = async () => {
//     try {
//       // 모든 태그 목록
//       const everyTags = await axios.get(`http://localhost:3000/api/tags`, {
//         withCredentials: true,
//       });
//       setTags(everyTags.data);
//       // 내 관심태그
//       const mytags = await axios.get(`http://localhost:3000/api/users/mytags`, {
//         withCredentials: true,
//       });
//       setCheckedItems(mytags.data);

//       // 내 관심태그 없으면 모든 글 보여줌.
//       if (!checkedItems) {
//         for (let i in tempCheckedArr) {
//           tempCheckedArr[i] = everyTags[i].tag_id;
//         }
//       }
//       // 내 관심태그 있으면 해당 글들만 보여줌.
//       else {
//         for (let i in tempCheckedArr) {
//           tempCheckedArr[i] = checkedItems[i].tag_id;
//         }
//       }

//       // 게시글 불러오기
//       const response = await axios.get(`http://localhost:3000/api/posts`, {
//         params: {
//           // type : "favtag",
//           tagId: tempCheckedArr,
//         },
//       });
//       setPosts(response.data);
//       console.log("posts:: ", response.data);
//       console.log("게시물들:: ", posts);
//     } catch (error) {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/auth/refresh",
//           {
//             withCredentials: true,
//           }
//         );
//         localStorage.setItem(
//           "access_token",
//           response.data.data["access_token"]
//         );
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.data["access_token"]}`;
//         getTags();
//       } catch (error) {
//         alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
//         history.push("/login");
//       }
//     }
//   };
//   useEffect(() => {
//     getTags();
//   }, []);

//   // 관심태그 바꿀 때
//   const checkHandler = ({ target }) => {
//     setIsChecked(!isChecked);
//     console.log(
//       "타겟.부, id, checked::: ",
//       target.parentNode,
//       target.id,
//       target.checked
//     );
//     checkedItemHandler(target.parentNode, target.id, target.checked);
//   };
//   const checkedItemHandler = (box, id, isChecked) => {
//     if (isChecked) {
//       //체크 되었을때
//       checkedItems.add(id); //체크시 삽입
//       setCheckedItems(checkedItems); //체크 요소 넣어주기
//       box.style.backgroundColor = "#ffd993";
//       console.log(checkedItems);
//     } else if (!isChecked && checkedItems.has(id)) {
//       //체크가 안되었고, id가 있을때(클릭 2번시)
//       checkedItems.delete(id); //체크 두번시 삭제
//       setCheckedItems(checkedItems);
//       box.style.backgroundColor = "#fff";
//       console.log(checkedItems);
//     }
//     return checkedItems;
//   };

//   // 태그 설정 버튼 누름
//   const submitHandler = async (event) => {
//     event.preventDefault();
//     console.log("사이즈", checkedItems.size);
//     if (checkedItems.size !== 0) {
//       tempCheckedArr = Array.from(checkedItems);
//       for (let i in tempCheckedArr) {
//         tempCheckedArr[i] = Number(tempCheckedArr[i]);
//       }
//       console.log("tempCheckedArr:: ", tempCheckedArr);
//     }
//     console.log("checked:: ", checkedItems);
//     // mytags 수정(patch)
//     await axios.patch(
//       `http://localhost:3000/users/mytags`,
//       // 변수명?
//       { tagId: tempCheckedArr }
//     );
//     await getCheckedPosts();
//       };

//   // 태그 설정 후 다시 게시글 불러오기
//   const getCheckedPosts = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/posts`, {
//         params: {
//           // type: "favtag",
//           tagId: tempCheckedArr,
//         },
//       });

//       console.log("포스트:: ", response.data);
//       setPosts(response.data);
//     } catch (error) {
//       console.log("error:: ", error);
//     }
//   };

//   return (
//     <div>
//       <Banner2 width={270} height={"100vh"} />
//       <BoardBanner board_name={"관심 태그"} newPost={true} />

//       <form className={style.tagForm} onSubmit={(e) => submitHandler(e)}>
//         {/* 관심태그 map */}
//         <div className={style.favtags}>
//           {tags.map((tag) => (
//             <label key={tag.id} className={style.favtag}>
//               <input
//                 type="checkbox"
//                 value={tag.name}
//                 id={tag.id}
//                 onChange={(e) => checkHandler(e)}
//               />
//               <div className="tagName">{tag.name}</div>
//             </label>
//           ))}
//         </div>
//         {/* 관심태그 설정 */}
//         <div className={style.setTag}>
//           <button className={style.setTagBtn} type="submit">
//             관심태그 설정
//           </button>
//         </div>
//       </form>

//       {/* 찐 */}
//       {posts.map((post) => (
//         <BoardContent
//           key={post.post_id}
//           author={post.nickname}
//           commentNum="0"
//           id={post.post_id}
//           registerDate={post.register_date}
//           tags={post.tags}
//           thumbnail={post.thumbnail}
//           title={post.post_title}
//           profilePic={post.profilePic}
//         />
//       ))}
//     </div>
//   );
// }

// export default Favtag;

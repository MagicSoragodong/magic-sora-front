import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import Detail from "../components/post/Detail";
import Comments from "../components/post/Comments";
import style from "./Post.module.css";

// data: id, title, content, registerDate, finishDate,
//       author, tags, choice, isFinished, isVoted
function Post() {
  // useParams: url에 있는 값 반환
  const { id } = useParams();

  const history = useHistory();

  const [postData, setPostData] = useState([]);
  const [choices, setChoices] = useState([]);
  const [results, setResults] = useState([]);
  const [comments, setComments] = useState([]);
  const [bestComments, setBestComments] = useState([]);
  const [lastCommentId, setLastCommentId] = useState(0);

  // 처음. 글, 결과, 댓글 불러옴
  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${id}`,
        { widthCredentials: true }
      );
      setPostData(response.data);
      setChoices(response.data[0].choice);
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
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };

  // 댓글 불러오기
  const getComments = async () => {
    try {
      // 찐
      const response2 = await axios.get(
        `http://localhost:3000/api/posts/${id}/comments`,
        { widthCredentials: true }
      );
      setComments(response2.data);
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
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };
  useEffect(() => {
    getPost();
    getComments();
  }, []);

  // 새 댓글 작성
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // 찐
      const newComment = {
        content: event.target.firstChild.value,
      };
      await axios.post(
        `http://localhost:3000/posts/${id}/comments`,
        newComment,
        { widthCredentials: true }
      );
      getComments();
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
        window.location.reload();
      } catch (error) {
        alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
        history.push("/login");
      }
    }
  };

  return (
    <div>
      <Banner2 width={270} height={"100vh"} />
      <BoardBanner board_name={false} newPost={false} />

      {postData.map((data) => (
        <Detail
          id={id}
          title={data.title}
          content={data.content}
          registerDate={data.registerDate}
          finishDate={data.finishDate}
          author={data.author}
          tags={data.tags}
          choice={data.choice}
          isFinished={data.isFinished}
          profilePic={data.profilePic}
        />
      ))}

      {/* 댓글 */}
      <div className={style.container}>
        <form onSubmit={submitHandler} className={style.commentForm}>
          <textarea
            className={style.textarea}
            placeholder="댓글을 작성해보세요."
            rows="3"
          ></textarea>
          <button className={style.submitBtn} type="submit">
            등록
          </button>
        </form>

        <ul className={style.comments}>
          {comments.map((comment) => (
            <Comments
              key={comment.id}
              id={comment.id}
              choiceNum={comment.choiceId}
              status={comment.status}
              nickname={comment.author}
              date={comment.registerDate}
              likedNum={comment.likedNum}
              comment={comment.content}
              profilePic={comment.profilePic}
              isVisible={comment.isVisible}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Post;

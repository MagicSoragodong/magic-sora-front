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

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(true); // 댓글 visible
  const [newComment, setNewComment] = useState("");

  const [results, setResults] = useState([]);

  // 처음. 글, 결과, 댓글 불러옴
  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${id}`,
        { withCredentials: true }
      );
      setPostData(response.data);
      setLoadingPost(false);
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
      const response = await axios.get(
        `http://localhost:3000/api/posts/${id}/comments`,
        { withCredentials: true }
      );
      setComments(response.data.comments);
      setVisible(response.data.isVisible);
      setLoadingComments(false);
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
  const onChange = (event) => {
    setNewComment(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/posts/${id}/comments`,
        { content: newComment },
        { withCredentials: true }
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
      <Banner2 width={270} height={"100vh"} hideProfile={false} />
      <BoardBanner board_name={false} newPost={false} />

      {/* 게시글 상세 조회 */}
      {loadingPost ? null : (
        <Detail
          id={id}
          title={postData.title}
          profilePic={postData.profile}
          content={postData.content}
          registerDate={postData.registerDate}
          finishDate={postData.finishDate}
          author={postData.author}
          tags={postData.tags} // 배열
          choice={postData.choice} // 배열
          isFinished={postData.isFinished}
        />
      )}

      {/* 댓글 */}
      {visible === false ? null : loadingComments ? null : (
        <div className={style.container}>
          <form onSubmit={submitHandler} className={style.commentForm}>
            <textarea
              className={style.textarea}
              placeholder="댓글을 작성해보세요."
              rows="3"
              onChange={onChange}
            ></textarea>
            <button className={style.submitBtn} type="submit">
              등록
            </button>
          </form>

          <ul className={style.comments}>
            {comments.map((comment) => (
              <Comments
                postId={id}
                key={comment.id}
                id={comment.id}
                choiceNum={comment.choiceId}
                status={comment.status}
                nickname={comment.author}
                profilePic={comment.profilePic}
                date={comment.registerDate}
                likedNum={comment.likes}
                comment={comment.content}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Post;

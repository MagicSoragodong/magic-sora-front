import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Banner2 from "../components/banner/Banner2";
import BoardBanner from "../components/board/BoardBanner";
import Detail from "../components/post/Detail";
import Result from "../components/post/Result";
import Comments from "../components/post/Comments";
import style from "./Post.module.css";
import { SilentTokenRequest } from "../components/utils/RefreshToken";
import { useDispatch, useSelector } from "react-redux";

function Post() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = true;

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingResult, setLoadingResult] = useState(true);

  const [postData, setPostData] = useState({}); // post
  const [options, setOptions] = useState({}); // options
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false); // 댓글 visible
  const [likedComments, setLikedComments] = useState([]); // 유저가 좋아요한 댓글들
  const [result, setResult] = useState([]); // 결과

  const [newComment, setNewComment] = useState("");

  // 글
  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/post?id=${id}`);
      setPostData(response.data);
      setLoadingPost(false);
    } catch (error) {
      console.log("에러post:: ", error);
    }
  };
  // 선택지
  const getOptions = async () => {
    if (isLogin) {
      try {
        const response = await axios.get(`http://localhost:3000/options`, {
          withCredentials: true,
        });
        setOptions(response.data.choices);
        setLoadingOptions(false);
      } catch (error) {}
    } else {
    }
  };
  useEffect(() => {
    getPost();
    getOptions();
  }, []);

  // 내가 좋아요한 댓글인지
  const compare = (id) => {
    return likedComments.some((comment) => comment.comment_id === id);
  };

  // 새 댓글 작성
  const onChange = (event) => {
    setNewComment(event.target.value);
  };
  const submitHandler = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/posts/${id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
    } catch (error) {
      if (error.response.status === 403) {
        alert("로그인 후 댓글을 작성해주세요");
      }
      SilentTokenRequest(history, dispatch);
    }
  };

  return (
    <div>
      <Banner2 width={270} height={"100vh"} hideProfile={false} />
      <BoardBanner board_name={false} newPost={false} />

      {/* 게시글 상세 조회 */}
      {loadingPost || loadingOptions ? null : (
        <Detail
          id={postData.id}
          title={postData.title}
          profilePic={postData.profile}
          content={postData.content}
          registerDate={postData.registerDate}
          finishDate={postData.finishDate}
          author={postData.author}
          isFinished={postData.isFinished}
          tags={postData.tags} // 배열
          isVoted={options.isVoted}
          choices={options.choices} // 배열
          myVote={options.myVote} // 숫자
        />
      )}

      {/* 결과 */}
      {loadingResult ? null : postData.isFinished ? (
        <div className={style.result_container}>
          <Result result={result} />
        </div>
      ) : null}

      {/* 댓글 */}
      {loadingPost || loadingOptions ? null : visible === false ? (
        <div className={style.comments_container}>
          <p className={style.comment_invisible}>
            투표 후 댓글을 확인해보세요^.^
          </p>
        </div>
      ) : loadingComments ? null : (
        <div className={style.comments_container}>
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

          {comments.length === 0 ? null : (
            <ul className={style.comments}>
              {comments.map((comment) =>
                compare(comment.id) ? (
                  <Comments
                    postId={id}
                    key={comment.id}
                    id={comment.id}
                    choiceNum={comment.choiceId}
                    status={comment.status}
                    nickname={comment.author}
                    profilePic={comment.profile}
                    date={comment.registerDate}
                    likedNum={comment.likes}
                    comment={comment.content}
                    mylike={true}
                  />
                ) : (
                  <Comments
                    postId={id}
                    key={comment.id}
                    id={comment.id}
                    choiceNum={comment.choiceId}
                    status={comment.status}
                    nickname={comment.author}
                    profilePic={comment.profile}
                    date={comment.registerDate}
                    likedNum={comment.likes}
                    comment={comment.content}
                    mylike={false}
                  />
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;

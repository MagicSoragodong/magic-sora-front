import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Board.module.css";
import BoardContent from "../board/BoardContent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useHistory } from "react-router-dom";
import { SilentTokenRequest } from "../utils/RefreshToken";

function Board() {
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [hotPost, setHotPost] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [deadlinePost, setDeadlinePost] = useState([]);
  const [favtagPost, setFavtagPost] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingFavtag, setLoadingFavtag] = useState(true);
  const isLogin = useSelector((store) => store.loginStateReducer.isLogin);
  const history = useHistory();
  const dispatch = useDispatch();

  SwiperCore.use([Navigation, Pagination]);

  const getPost = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:3000/api/posts?type=hot`
      );
      setHotPost(response1.data);
      const response2 = await axios.get(
        `http://localhost:3000/api/posts?type=new`
      );
      setNewPost(response2.data);
      const response3 = await axios.get(
        `http://localhost:3000/api/posts?type=deadline`
      );
      setDeadlinePost(response3.data);
      console.log(response1.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const isLogined = () => {
    if (isLogin) {
      getFavtagPost();
    } else return;
  };
  const getFavtagPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts?type=favtag`,
        { withCredentials: true }
      );
      setFavtagPost(response.data);
      setLoadingFavtag(false);
    } catch (error) {
      SilentTokenRequest(history, dispatch);
    }
  };
  useEffect(() => {
    getPost();
    isLogined();
  }, []);

  return (
    <div className={style.container}>
      <Swiper
        className={style.slide}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Link to="/hot">
            <div className={style.oneSlide}>
              <h2 className={style.board_title}>HOT 게시판🔥</h2>
              <div className={style.onePost}>
                {loading ? null : hotPost.length === 0 ? (
                  <img
                    className={style.no_post}
                    src={`https://images-ext-2.discordapp.net/external/12U8QmPxveaAoFe9I8GULJbljTsMlrHBPVj7oB9UDhc/http/img.tf.co.kr/article/sa2da/2018/12/27/20184105154621894310.jpg?width=445&height=670`}
                  />
                ) : (
                  <BoardContent
                    key={hotPost[0].id}
                    author={hotPost[0].author}
                    commentNum={hotPost[0].commentNum}
                    id={hotPost[0].id}
                    registerDate={hotPost[0].registerDate}
                    tags={hotPost[0].tags}
                    thumbnail={hotPost[0].thumbnail}
                    title={hotPost[0].title}
                    profilePic={hotPost[0].profile}
                    deletePost={false}
                  />
                )}
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/new">
            <div className={style.oneSlide}>
              <h2 className={style.board_title}>새로운 글✨</h2>
              <div className={style.onePost}>
                {loading ? null : newPost.length === 0 ? (
                  <img
                    className={style.no_post}
                    src={`https://images-ext-2.discordapp.net/external/12U8QmPxveaAoFe9I8GULJbljTsMlrHBPVj7oB9UDhc/http/img.tf.co.kr/article/sa2da/2018/12/27/20184105154621894310.jpg?width=445&height=670`}
                  />
                ) : (
                  <BoardContent
                    key={newPost[0].id}
                    author={newPost[0].author}
                    commentNum={newPost[0].commentNum}
                    id={newPost[0].id}
                    registerDate={newPost[0].registerDate}
                    tags={newPost[0].tags}
                    thumbnail={newPost[0].thumbnail}
                    title={newPost[0].title}
                    profilePic={newPost[0].profile}
                    deletePost={false}
                  />
                )}
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/deadline">
            <div className={style.oneSlide}>
              <h2 className={style.board_title}>마감임박⏱</h2>
              <div className={style.onePost}>
                {loading ? null : deadlinePost.length === 0 ? (
                  <img
                    className={style.no_post}
                    src={`https://images-ext-2.discordapp.net/external/12U8QmPxveaAoFe9I8GULJbljTsMlrHBPVj7oB9UDhc/http/img.tf.co.kr/article/sa2da/2018/12/27/20184105154621894310.jpg?width=445&height=670`}
                  />
                ) : (
                  <BoardContent
                    key={deadlinePost[0].id}
                    author={deadlinePost[0].author}
                    commentNum={deadlinePost[0].commentNum}
                    id={deadlinePost[0].id}
                    registerDate={deadlinePost[0].registerDate}
                    tags={deadlinePost[0].tags}
                    thumbnail={deadlinePost[0].thumbnail}
                    title={deadlinePost[0].title}
                    profilePic={deadlinePost[0].profile}
                    deletePost={false}
                  />
                )}
              </div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/favtag">
            <div className={style.oneSlide}>
              <h2 className={style.board_title}>관심태그📌</h2>
              {loadingFavtag ? (
                <div className={style.notLogined_favtag}>
                  <p>로그인 후 이용 가능한 게시판입니다</p>
                  <img className={style.favtag_board} src="img/soraLogo.png" />
                </div>
              ) : favtagPost.length === 0 ? (
                <img
                  className={style.no_post}
                  src={`https://images-ext-2.discordapp.net/external/12U8QmPxveaAoFe9I8GULJbljTsMlrHBPVj7oB9UDhc/http/img.tf.co.kr/article/sa2da/2018/12/27/20184105154621894310.jpg?width=445&height=670`}
                />
              ) : (
                <div className={style.onePost}>
                  <BoardContent
                    key={favtagPost[0].id}
                    author={favtagPost[0].author}
                    commentNum={favtagPost[0].commentNum}
                    id={favtagPost[0].id}
                    registerDate={favtagPost[0].registerDate}
                    tags={favtagPost[0].tags}
                    thumbnail={favtagPost[0].thumbnail}
                    title={favtagPost[0].title}
                    profilePic={favtagPost[0].profile}
                    deletePost={false}
                  />
                </div>
              )}
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Board;

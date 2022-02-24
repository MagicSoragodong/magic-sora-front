import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Board.module.css";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";

function Board() {
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div>
      <Swiper
        className={style.slide}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Link to="/hot">
            <h2>핫게🔥</h2>
            <p>어쩌구저쩌구</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/new">
            <h2>new게🔥</h2>
            <p>어쩌구저쩌구</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/deadline">
            <h2>마감임박🔥</h2>
            <p>어쩌구저쩌구</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/favtag">
            <h2>관심태그🔥</h2>
            <p>어쩌구저쩌구</p>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Board;

import React from "react";
import BoardContent from "./BoardContent";
import style from "./BoardContainer.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function BoardContainer({ type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`, {
        params: { type: type },
      });
      console.log(response.data);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.container_empty}>
          <Image
            className={style.img_empty}
            cloudName="duqzktgtq"
            publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/soraLogo_m054ey.png"
          />
          <strong>로딩중...</strong>
        </div>
      ) : posts.length === 0 ? (
        <div className={style.container_empty}>
          <Image
            className={style.img_empty}
            cloudName="duqzktgtq"
            publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/no_posts_ipdxcl.png"
          />
          <strong>아직 게시글이 없습니다</strong>
        </div>
      ) : (
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
    </>
  );
}

export default BoardContainer;

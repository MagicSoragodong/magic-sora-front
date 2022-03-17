import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/post/Detail";

function Post() {
  // useParams: url에 있는 값 반환
  const { id } = useParams();
  const [datas, setDatas] = useState({});

  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://jsonplaceholder.typicode.com/posts?id=${id}`
      );
      setDatas(response.data);
      console.log("data:: ", datas);
      console.log(response.data);
    } catch (error) {
      console.log("error:: ", error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log("아이디: ", id);

  return (
    <div>
      <Detail id={id} />
    </div>
  );
}

export default Post;

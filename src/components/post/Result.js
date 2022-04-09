import React from "react";
import axios from "axios";
import style from "./Result.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import { VictoryPie } from "victory-pie";

function Result({ postId }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const history = useHistory();

  // const data = [
  //   { title: "One", value: 30, color: "#F6CB44" },
  //   { title: "Two", value: 15, color: "#E3A454" },
  //   { title: "Three", value: 20, color: "#76BEE3" },
  // ];

  const myData = [
    { x: "Group A", y: 900 },
    { x: "Group B", y: 400 },
    { x: "Group C", y: 300 },
  ];

  const getResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${postId}/options`,
        { withCredentials: true }
      );
      console.log("res.data:: ", response.data);
      setResults(response.data);
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
    getResults();
  }, []);

  return (
    <div className={style.chartContainer}>
      <VictoryPie
        className={style.chart}
        data={myData}
        colorScale={["#bad0ff", "#ffd993", "#c8dbfd"]}
        radius={100}
      />
      {/* <PieChart
        className={style.chart}
        animate
        animationDuration={500}
        animationEasing="ease-out"
        center={[50, 50]}
        data={data}
        lengthAngle={360}
        lineWidth={15}
        paddingAngle={0}
        radius={50}
        rounded
        startAngle={0}
        viewBoxSize={[100, 100]}
        label={(data) => data.dataEntry.title}
        labelPosition={65}
        labelStyle={{
          fontSize: "10px",
          fontColor: "FFFFFA",
          fontWeight: "800",
        }}
      /> */}
      {loading ? null : <div>{results.map((result) => {})}</div>}
    </div>
  );
}

export default Result;

import React from "react";
import style from "./Result.module.css";
import { VictoryPie } from "victory-pie";
import { useState, useEffect } from "react";
import { VictoryLabel } from "victory";
import { Image } from "cloudinary-react";

function Result({ result }) {
  const [score, setScore] = useState([]);
  const [total, setTotal] = useState(0);
  const colorScale2 = [
    "#69b3f8",
    "#ADA3FF",
    "#D5A0E9",
    "#FFA3C2",
    "#F7AE97",
    "#F0DC96",
    "#EEF09A",
    "#97F0AC",
    "#83E0D7",
    "#8EBFFA",
  ];

  const getMyData = () => {
    let myData = result.map((item) => {
      let myResult = {};
      myResult["x"] = item.choiceId;
      myResult["y"] = item.score;
      return myResult;
    });
    myData = myData.filter((item) => item.y !== 0);
    console.log("2 ", myData);
    setScore(myData);

    let myTotal = 0;
    for (let i in result) {
      myTotal += result[i].score;
    }
    setTotal(myTotal);
    if (myTotal === 0) {
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <div className={style.results}>
      <strong className={style.result}>결과</strong>
      {total === 0 ? (
        <Image
          className={style.total0}
          cloudName="duqzktgtq"
          publicId="https://res.cloudinary.com/duqzktgtq/image/upload/v1654082047/no_attention_wcm7tl.jpg"
        />
      ) : (
        <div className={style.chartContainer}>
          <div className={style.myChart}>
            <VictoryPie
              data={score}
              labels={({ datum }) => `${Math.round((datum.y / total) * 100)}% `}
              labelRadius={110}
              radius={150}
              innerRadius={50}
              colorScale={colorScale2}
              style={{
                labels: { fill: "#404040", fontSize: 14, fontWeight: 700 },
              }}
              padAngle={2}
              labelComponent={<VictoryLabel renderInPortal />}
            />
          </div>
          <ul className={style.chart_detail}>
            {result.map((item) => (
              <li key={item.choiceId} className={style.each_item}>
                <div className={style.color_circle}></div>
                <span>
                  : {item.choiceId}{" "}
                  <span className={style.chart_score}>
                    ({Math.round((item.score / total) * 100)}% / {item.score}표)
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Result;

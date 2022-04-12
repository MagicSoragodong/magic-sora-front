import React from "react";
// import axios from "axios";
import style from "./Result.module.css";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { VictoryPie } from "victory-pie";
import {
  VictoryChart,
  VictoryBar,
  // VictoryTheme,
  // VictoryAxis,
  VictoryGroup,
} from "victory";

function Result({ result }) {
  // const myData_o = [
  //   { x: 1, y: 900 },
  //   { x: 2, y: 500 },
  //   { x: 3, y: 300 },
  // ];
  let myData = result.map((item) => {
    let myResult = {};
    myResult["x"] = item.choiceId;
    myResult["y"] = item.score;
    return myResult;
  });
  console.log(myData);

  return (
    <div className={style.results}>
      <strong>결과</strong>
      <div className={style.chartContainer}>
        <VictoryPie
          className={style.chart}
          data={myData}
          labels={({ datum }) => `${datum.x}: ${datum.y}표`}
          // labelRadius={({ innerRadius }) => innerRadius + 30}
          radius={150}
          innerRadius={100}
          colorScale={["#B2E2F0", "#7EB4D6", "#486ca5", "#9FB4FF"]}
          style={{
            labels: { fill: "#404040", fontSize: 16, fontWeight: 700 },
          }}
          padAngle={2}
        />

        <VictoryPie
          className={style.chart}
          data={myData}
          labels={({ datum }) => `${datum.x}: ${datum.y}표`}
          labelRadius={80}
          radius={150}
          innerRadius={50}
          colorScale={["#486ca5", "#7EB4D6", "#B2E2F0", "#DEF2FB"]}
          style={{
            labels: { fill: "#404040", fontSize: 16, fontWeight: 700 },
          }}
          padAngle={2}
        />

        <VictoryPie
          className={style.chart}
          data={myData}
          labels={({ datum }) => `${datum.x}: ${datum.y}표`}
          labelRadius={80}
          radius={150}
          colorScale={["#486ca5", "#7EB4D6", "#B2E2F0", "#DEF2FB"]}
          style={{
            labels: { fill: "#404040", fontSize: 16, fontWeight: 700 },
          }}
        />
      </div>
      <div className={style.chartContainer}>
        <VictoryChart domainPadding={{ x: 100 }}>
          <VictoryBar
            labels={({ datum }) => `${datum.x}: ${datum.y}표`}
            barRatio={0.8}
            style={{
              data: { fill: "#c43a31" },
            }}
            data={myData}
          />
        </VictoryChart>

        <VictoryChart>
          <VictoryGroup
            offset={20}
            colorScale={["#486ca5", "#7EB4D6", "#B2E2F0"]}
          >
            <VictoryBar data={myData} />
            <VictoryBar data={myData} />
            <VictoryBar data={myData} />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
}

export default Result;

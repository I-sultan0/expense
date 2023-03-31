import React from "react";
import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  console.log(dataPointValues);
  // const totalMaximum = Math.max(...dataPointValues);
  // console.log(dataPointValues);
  const arrOfNum = dataPointValues.map((str) => {
    return Number(str);
  });
  const sum = arrOfNum.reduce((a, b) => a + b, 0);
  console.log(sum);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={sum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;

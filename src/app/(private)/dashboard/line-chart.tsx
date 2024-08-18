"use client";

/* eslint-disable no-new */
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

interface LineChartProps {
  labels: string[];
  outData: any;
  inData: any;
}

const LineChart: React.FC<LineChartProps> = ({ outData, labels, inData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let chartInstance: Chart | null = null;

    const createChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          chartInstance = new Chart(ctx, {
            type: "line",
            data: {
              labels,
              datasets: [
                {
                  label: "Нийт орсон тээвэр",
                  data: inData,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.2,
                },
                {
                  label: "Нийт гарсан тээвэр",
                  data: outData,
                  fill: false,
                  borderColor: "rgb(255, 115, 115)",
                  tension: 0.2,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              // scales: {
              //   x: {
              //     min: 0,
              //     max: 100,
              //   },
              // },
            },
          });
        }
      }
    };

    createChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [labels]);

  return <canvas ref={chartRef} width={400} height={300} />;
};

export default LineChart;

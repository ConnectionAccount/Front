/* eslint-disable no-new */

"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Flex } from "@mantine/core";

interface BarChartProps {
  data: any;
  labels?: any;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let chartInstance: Chart | null = null;
    const createChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
              datasets: [
                {
                  backgroundColor: ["#F39C12"],
                  hoverBorderWidth: 1,
                  type: "bar",
                  label: "Нийт үйлчлүүлэгч",
                  data: [data?.stats?.[4]?.uilchluulegch],
                  borderRadius: 5,
                },
                {
                  backgroundColor: ["#2ECC71"],
                  hoverBorderWidth: 1,
                  type: "bar",
                  label: "Нийт ажилтан",
                  data: [data?.stats?.[1]?.ajiltan],
                  borderRadius: 5,
                },
                {
                  backgroundColor: ["#D35400"],
                  hoverBorderWidth: 1,
                  type: "bar",
                  label: "Нийт үйлчилгээ",
                  data: [data?.stats?.[3]?.uilchilgee],
                  borderRadius: 5,
                },
                {
                  backgroundColor: ["#3498DB"],
                  hoverBorderWidth: 1,
                  type: "bar",
                  label: "Нийт Тасаг",
                  data: [data?.stats?.[2]?.tasag],
                  borderRadius: 5,
                },
                {
                  backgroundColor: ["#E74C3C"],
                  hoverBorderWidth: 1,
                  type: "bar",
                  label: "Нийт өрөө",
                  data: [data?.stats?.[0]?.uruu],
                  borderRadius: 5,
                },
              ],
              labels: [""],
            },
            options: {
              maintainAspectRatio: false,
              indexAxis: "x",
              plugins: {
                legend: {
                  position: "top",
                },
              },
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
  }, [data]);

  return (
    <Flex h="500px">
      <canvas ref={chartRef} />
    </Flex>
  );
};

export default BarChart;

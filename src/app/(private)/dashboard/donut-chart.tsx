import { Flex } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ data }: { data: any }) => {
  const dualAxesChartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: undefined,
    plotOptions: {
      pie: {
        innerSize: "50%",
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        type: "pie",
        colors: [
          "rgb(75, 192, 192)",
          "rgb(255, 115, 115)",
          "rgb(215, 115, 255)",
          "rgb(95, 322, 100)",
          "rgb(112, 128, 255)",
        ],
        name: "Нийт тоо",
        data: [
          {
            name: "Нийт үйлчлүүлэгч",
            y: data?.stats?.[4]?.uilchluulegch,
          },
          {
            name: "Нийт ажилтан",
            y: data?.stats?.[1]?.ajiltan,
          },
          {
            name: "Нийт үйлчилгээ",
            y: data?.stats?.[3]?.uilchilgee,
          },
          {
            name: "Нийт Тасаг",
            y: data?.stats?.[2]?.tasag,
          },
          {
            name: "Нийт өрөө",
            y: data?.stats?.[0]?.uruu,
          },
        ],
      },
    ],
  };

  return (
    <div style={{ height: "500px" }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={dualAxesChartOptions}
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
};

export default PieChart;

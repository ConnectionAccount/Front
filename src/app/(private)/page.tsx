"use client";

import useSWR from "swr";
import React from "react";
import { DatePickerInput } from "@mantine/dates";
import {
  IconDoor,
  IconNurse,
  IconStethoscope,
  IconHeartRateMonitor,
  IconDeviceLandlinePhone,
} from "@tabler/icons-react";
import { Button, Divider, Flex, Grid, Select, Text } from "@mantine/core";
import { statApi } from "@/apis";
import { message } from "@/utils/message";
import BarChart from "./dashboard/bar-chart";
import StatsInfo from "./dashboard/stat-info";
import PageContent from "@/libs/page-content/page";
import { PageFilter } from "@/libs/page-filter/page";
import PageLayout from "@/libs/page-layout/page-layout";
import PieChart from "./dashboard/donut-chart";

export default function HomePage() {
  const [filters, setFilters] = React.useState<any>({ query: "" });

  const dateFilter = (e: any) => {
    setFilters({
      ...filters,
      startDate: e[0],
      endDate: e[1],
    });
  };

  const { data: status } = useSWR<any>("stat.in-out.list", async () => {
    try {
      const res = statApi.list({
        offset: { page: 1, limit: 100 },
        filter: { query: "" },
      });
      return await res;
    } catch (err) {
      message.error("Алдаа гарлаа");
      return err;
    }
  });
  const data = [
    {
      title: "Нийт үйлчлүүлэгч",
      value: status?.stats?.[4]?.uilchluulegch,
      icon: IconHeartRateMonitor,
    },
    {
      title: "Нийт ажилтан",
      value: status?.stats?.[1]?.ajiltan,
      icon: IconStethoscope,
    },
    {
      title: "Нийт үйлчилгээ",
      value: status?.stats?.[3]?.uilchilgee,
      icon: IconDeviceLandlinePhone,
    },
    {
      title: "Нийт Тасаг",
      value: status?.stats?.[2]?.tasag,
      icon: IconDoor,
    },
    {
      title: "Нийт өрөө",
      value: status?.stats?.[0]?.uruu,
      icon: IconNurse,
    },
  ];
  return (
    <PageLayout
      title="Хянах самбар"
      description="Нийт мэдээлэл"
      breadcrumb={[
        {
          label: "Дашбоард",
          href: "/",
        },
      ]}
    >
      {/* <PageFilter
        left={[
          <Flex gap={8} key={1}>
            <Select
              w="250px"
              data={[
                { value: "ng", label: "Сүүлийн 7 өдөр" },
                { value: "express", label: "Сүүлийн сар" },
                { value: "django", label: "Сүүлийн жил" },
                { value: "sdasd", label: "Нийт бүх өдрөөр" },
              ]}
              placeholder="Сонгосон өдрөөр шүүх"
            />
            <DatePickerInput
              clearable
              locale="mn"
              valueFormat="MM сарын DD өдөр"
              monthLabelFormat="YYYY / MM сар"
              yearLabelFormat="YYYY"
              style={{ width: "460px" }}
              placeholder="Эхлэх онгоо - Дуусах огоо"
              leftSectionWidth="30%"
              // value={[
              //   filters.startDate ? new Date(filters.startDate) : null,
              //   filters.endDate ? new Date(filters.endDate) : null,
              // ]}
              // onChange={dateFilter}
              leftSection={
                <Flex align="center" justify="space-between" w="100%" mx="sm">
                  <Text size="sm" c="black" fw={320}>
                    Огноо
                  </Text>
                  <IconArrowRight size="16px" />
                </Flex>
              }
              size="sm"
              miw={200}
              type="range"
            />
            <Button variant="default" onClick={() => setFilters({ query: "" })}>
              Цэвэрлэх
            </Button>
          </Flex>,
        ]}
      /> */}
      <Grid>
        <Grid.Col>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <StatsInfo data={data} />
            </Grid.Col>
          </Grid>
          <br />
          <Grid>
            <Grid.Col span={{ base: 12, xl: 6 }}>
              <PageContent description="Нийт үзүүлэлт">
                <Divider mt="xs" />
                <BarChart data={status} />
              </PageContent>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xl: 6 }}>
              <PageContent description="Нийт үзүүлэлт">
                <Divider mt="xs" />
                <PieChart data={status} />
              </PageContent>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </PageLayout>
  );
}

"use client";

import useSWR from "swr";
import dayjs from "dayjs";
import React from "react";
import {
  Box,
  Flex,
  Text,
  Paper,
  Group,
  Modal,
  Input,
  Button,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconTrash,
  IconSearch,
  IconArrowRight,
  IconArrowBigLeft,
  IconArrowBigRight,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import TimeSet from "./time-set";
import { timeTableApi } from "@/apis";
import { Scheduler } from "@/libs/scheduler";
import { PageFilter } from "@/libs/page-filter/page";
import { TimeScheduler } from "@/libs/scheduler/time";

const initialFilters: {
  startDate: string | undefined;
  endDate: string | undefined;
  scaleCode: string | null;
  query: string | null;
} = {
  startDate: undefined,
  endDate: undefined,
  scaleCode: "",
  query: "",
};

export default function TestPage() {
  const [filters, setFilters] = React.useState(initialFilters);
  const [thisDay, setThisDay] = React.useState(dayjs());
  const [onChange, setOnChange] = React.useState("day");
  const [action, setAction] = React.useState<any>("");

  const { data } = useSWR<any[]>("swr.time.table", async () => {
    const res = await timeTableApi.timeGet({
      filter: {
        ajiltan: ["658d67bf3e3a8f2285c58d29"],
        // tasag: "",
        // uilchilgee: "",
        startDate: "2023-12-10",
        endDate: "2024-01-04",
        // kvot: "",
      },
    });

    return res.rows;
  });
  const renderData = (data || []).map((row: any) => ({
    title: row?.uilchilgee?.ner,
    employee: row?.ajiltan?.ner,
    start: row?.day,
  }));

  console.log(thisDay);
  return (
    <div>
      <h1>Test Page</h1>

      <Box px={24}>
        <PageFilter
          left={[
            <Flex gap={8} key={1}>
              <Input
                placeholder="Хайх"
                size="sm"
                leftSection={<IconSearch size={16} />}
                value={filters.query || ""}
                onChange={(e) => {
                  setFilters({ ...filters, query: e?.currentTarget?.value });
                }}
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
            </Flex>,
          ]}
          right={[
            <Tooltip label="Цэвэрлэх" key={1}>
              <ActionIcon
                variant="light"
                size="36px"
                onClick={() => setFilters(initialFilters)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>,
          ]}
        />
      </Box>

      <Box p={24}>
        <Paper withBorder>
          <Group p={12} justify="space-between">
            <Group>
              <Text fw={600}>{thisDay.format("MM-р сар DD Өдөр  YYYY")}</Text>
            </Group>
            <Group>
              <ActionIcon
                variant="outline"
                size="30px"
                onClick={() => thisDay.subtract(1, "month")}
              >
                <IconArrowBigLeft
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Button
                size="xs"
                onClick={() => {
                  const today = dayjs(new Date()).toISOString();
                  console.log(today);
                }}
              >
                Өнөөдөр
              </Button>
              <ActionIcon
                variant="outline"
                size="30px"
                onClick={() => thisDay.add(1, "month")}
              >
                <IconArrowBigRight
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              {onChange === "time" ? (
                <Button size="xs" onClick={() => setOnChange("day")}>
                  7 хоног
                </Button>
              ) : (
                <Button size="xs" onClick={() => setOnChange("time")}>
                  Сар
                </Button>
              )}
              <Button size="xs" onClick={() => setAction("timeSet")}>
                Тэмдэглэл нэмэх
              </Button>
            </Group>
          </Group>

          <TimeScheduler onChange={onChange} />

          <Scheduler
            // month={thisDay}
            onChange={onChange}
            onSelect={(date, event) => {
              console.log("onSelect: ", date, event);
            }}
            renderItem={(item: any) => {
              return (
                <Flex direction="column" w="100%" gap={10}>
                  <div>
                    <Text size="sm"> Үйлчилгээ</Text>
                    <Text size="sm" c="dimmed">
                      {item?.title}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm"> Ажилтан</Text>
                    <Text size="sm" c="dimmed">
                      {item?.employee}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm"> Цаг</Text>
                    <Text size="sm" c="dimmed">
                      {item?.employee}
                    </Text>
                  </div>
                </Flex>
              );
            }}
            events={renderData}
          />
        </Paper>
      </Box>
      <Modal
        size="50%"
        opened={action === "timeSet"}
        onClose={() => setAction([])}
        centered
        title={<Text>Цаг бүртгэх</Text>}
      >
        <TimeSet />
      </Modal>
    </div>
  );
}

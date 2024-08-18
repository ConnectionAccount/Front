"use client";

/* eslint-disable no-plusplus */
import { Box, Flex, Paper, ScrollArea, UnstyledButton } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import React from "react";
import "dayjs/locale/mn";
import classes from "./style.module.css";

dayjs.extend(weekday);
dayjs.locale("mn");
dayjs().weekday(0);

export type DayStatus = "normal" | "prev" | "next";
export type EventStatus = "free" | "inuse";

export interface SchedulerProps {
  onSelect?: (date: Date, event?: any) => void;
  currentDate?: Date | Dayjs;
  renderItem?: (item: any) => React.ReactNode;
  events?: any[];
  onChange: string;
}

export function getTimes(interval: "1min" | "15min" | "1hour"): string[] {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date();
  dayEnd.setHours(23, 59, 59, 999);

  const times: string[] = [];
  const currentTime = new Date(dayStart);

  while (currentTime <= dayEnd) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    times.push(formattedTime);

    switch (interval) {
      case "1min":
        currentTime.setMinutes(currentTime.getMinutes() + 1);
        break;
      case "15min":
        currentTime.setMinutes(currentTime.getMinutes() + 15);
        break;
      case "1hour":
        currentTime.setHours(currentTime.getHours() + 1);
        break;
      default:
        throw new Error(
          "Invalid interval. Supported intervals are: 1min, 15min, 1hour",
        );
    }
  }

  return times;
}

export function TimeScheduler({
  onSelect,
  currentDate = new Date(),
  renderItem,
  events = [],
  onChange,
}: SchedulerProps) {
  const oneMinuteIntervals: string[] = getTimes("1min");
  const fifteenMinuteIntervals: string[] = getTimes("15min");
  const oneHourIntervals: string[] = getTimes("1hour");

  // console.log("1 Minute Intervals:", oneMinuteIntervals);
  // console.log("15 Minute Intervals:", fifteenMinuteIntervals);
  // console.log("1 Hour Intervals:", oneHourIntervals);

  const [thisDay, setThisDay] = React.useState(dayjs(currentDate));

  const datetimesInWeek = Array.from({ length: 7 }, (_, i) => {
    return thisDay
      .startOf("week")
      .add(i + 1, "day")
      .format("DD");
  });

  return (
    <>
      {onChange === "time" && (
        <div className={classes.calendarBodyContainer}>
          <div className={classes.calendarHeaderTime}>
            {Array.from({ length: 7 }, (_, i) => (
              <span className={classes.calendarHeaderTimeItem} key={i}>
                {dayjs()
                  .weekday(i + 1)
                  .format("dd")}
                <span className={classes.calendarHeaderTimeItem2}>
                  {datetimesInWeek[i]}
                </span>
              </span>
            ))}
          </div>

          <ScrollArea type="scroll" scrollbarSize={6} h={1005}>
            <Flex gap={1} bg="#CED4DA" direction="column">
              {oneHourIntervals.map((e) => (
                <Flex key={e} bg="white" h={100} pl={10}>
                  <UnstyledButton>{e}</UnstyledButton>
                </Flex>
              ))}
            </Flex>
          </ScrollArea>
        </div>
      )}
    </>
  );
}

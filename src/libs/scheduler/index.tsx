"use client";

/* eslint-disable no-plusplus */
import { Box, Button, Group, Paper, Text } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { Calendar } from "@mantine/dates";
import React from "react";
import "dayjs/locale/mn";

import classes from "./style.module.css";
import { DayItem } from "./day-item";
import { EventItem } from "./event-item";

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
  onChange?: string;
}

export function Scheduler({
  onSelect,
  onChange,
  renderItem,
  events = [],
  currentDate = new Date(),
}: SchedulerProps) {
  const [thisDay, setThisDay] = React.useState(dayjs(currentDate));
  const startDayOfTheMonth = thisDay.startOf("month").day();
  const endDayOfTheMonth = thisDay.endOf("month").day();
  const daysInMonth = thisDay.daysInMonth();

  const eventItemIndexed = React.useMemo(() => {
    return events.reduce((acc: any, item: any) => {
      const date = dayjs(item?.start).format("YYYYMMDD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }, [events]);

  const prevMonthDays = startDayOfTheMonth >= 1 ? startDayOfTheMonth - 1 : 6;
  const nextMonthDays = endDayOfTheMonth === 0 ? 0 : 7 - endDayOfTheMonth;

  const datetimesInMonth = Array.from(
    { length: daysInMonth + prevMonthDays + nextMonthDays },
    (_, i) => {
      if (i < prevMonthDays) {
        return thisDay.startOf("month").subtract(prevMonthDays - i, "day");
      }
      if (i < prevMonthDays + daysInMonth) {
        return thisDay.startOf("month").add(i - prevMonthDays, "day");
      }
      return thisDay.startOf("month").add(i - prevMonthDays, "day");
    },
  );

  const handleSelect = (date: Date) => {
    setThisDay(dayjs(date));
  };

  return (
    <>
      {onChange === "day" && (
        <>
          {/* <Calendar
            getDayProps={(date) => ({
              onClick: () => handleSelect(date),
            })}
          /> */}
          <div className={classes.calendarBodyContainer}>
            <div className={classes.calendarHeaderDay}>
              {Array.from({ length: 7 }, (_, i) => (
                <span className={classes.calendarHeaderDayItem} key={i}>
                  {dayjs()
                    .weekday(i + 1)
                    .format("dd")}
                </span>
              ))}
            </div>
            <div className={classes.calendarBody}>
              <div className={classes.calendarBodyDays}>
                {datetimesInMonth.map(
                  (datetime: dayjs.Dayjs) =>
                    ({
                      free: (
                        <DayItem
                          onSelect={onSelect}
                          thisDay={thisDay}
                          key={datetime.format("YYYYMMDD")}
                          datetime={datetime}
                        />
                      ),
                      inuse: (
                        <EventItem
                          onSelect={(date) =>
                            onSelect?.(
                              date,
                              eventItemIndexed[datetime.format("YYYYMMDD")],
                            )
                          }
                          thisDay={thisDay}
                          key={datetime.format("YYYYMMDD")}
                          datetime={datetime}
                          events={eventItemIndexed[datetime.format("YYYYMMDD")]}
                          renderItem={renderItem}
                        />
                      ),
                    })[
                      eventItemIndexed[datetime.format("YYYYMMDD")]
                        ? "inuse"
                        : "free"
                    ],
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

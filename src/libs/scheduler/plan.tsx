/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

"use client";

import useSWR from "swr";
import React from "react";
import { Flex, Group, ScrollArea } from "@mantine/core";
import { getTimes } from "./time";
import { timeTableApi } from "@/apis";
import classes from "./style.module.css";

function partition(array: any[], n: number): any[] {
  return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}

export function Plan() {
  const { data } = useSWR<{
    rows: any[];
    kvot: any[];
  }>("swr.time.plan", async () => {
    const kovot = {};
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
    const kvot = res.rows.reduce((acc: any, it: any) => {
      const start_time = parseInt(
        it.tsagiinHuvaari.ehlehTsag.split(":")[0],
        10,
      );
      const end_time = parseInt(it.tsagiinHuvaari.duusahTsag.split(":")[0], 10);
      const times = [];
      for (let i = start_time; i <= end_time; i++) {
        times.push(i);
      }
      const time_kvot = partition(it.kvot, it.uilchilgee.kvot);

      acc[it._id] = {
        kvots: times.reduce((acc1: any, it1: any, index: number) => {
          acc1[it1] = time_kvot[index];
          return acc1;
        }, {}),
      };

      return acc;
    }, {});
    return {
      rows: res.rows,
      kvot,
    };
  });

  console.log(data);
  const fifteenMinuteIntervals: string[] = getTimes("1hour");
  return (
    <ScrollArea scrollbars="x" scrollbarSize={6}>
      <Flex direction="column" gap={10} p={10}>
        {data?.rows.map((item, index) => (
          <Flex gap={10} key={index} direction="row" wrap="nowrap">
            <Group>{item.ajiltan.ner}</Group>
            <Group>{item.uilchilgee.ner}</Group>
            <Group>{item.uruu.dugaar}</Group>
            <table>
              <thead>
                <tr>
                  {fifteenMinuteIntervals.map((hour) => (
                    <td key={hour}>{hour}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {fifteenMinuteIntervals.map((hour) => (
                    <td key={hour}>
                      <div>[]</div>
                      <div>[]</div>
                      <div>[]</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            {/* <Stack>
              <div
                className={classes.timeHeader}
                style={{ width: "calc(200px * 24)" }}
              >
                {fifteenMinuteIntervals.map((hour) => (
                  <Flex direction="column" key={hour}>
                    <div>
                      <UnstyledButton>{hour}</UnstyledButton>
                    </div>
                    <div
                      className={classes.timebody}
                      style={{ width: "calc(10px * 8)" }}
                    >
                      {(item?.kvot || []).map((kitem: any, kindex: number) => (
                        <Button
                          color={`${
                            kitem.status === "ACTIVE" ? "teal" : "gray"
                          }`}
                          key={kindex}
                        />
                      ))}
                    </div>
                  </Flex>
                ))}
              </div>
            </Stack> */}
          </Flex>
        ))}
      </Flex>
    </ScrollArea>
  );
}

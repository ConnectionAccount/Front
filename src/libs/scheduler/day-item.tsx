import { Badge, Flex, UnstyledButton } from "@mantine/core";
import { Dayjs } from "dayjs";
import classes from "./style.module.css";

export interface DayItemProps {
  datetime: Dayjs;
  thisDay: Dayjs;
  onSelect?: (date: Date) => void;
}

export function DayItem({ datetime, thisDay, onSelect }: DayItemProps) {
  const dayStatus = (datetime: Dayjs) => {
    if (datetime.isBefore(thisDay.startOf("month"))) {
      return "prev";
    }
    if (datetime.isAfter(thisDay.endOf("month"))) {
      return "next";
    }
    return "normal";
  };
  return (
    <UnstyledButton
      onClick={() => onSelect?.(datetime.toDate())}
      className={classes.calendarBodyDay}
      data-status={dayStatus(datetime)}
    >
      <Flex>
        <Badge
          variant={`${
            thisDay.format("YYYYMMDD") === datetime.format("YYYYMMDD")
              ? ""
              : "light"
          }`}
          w={25}
          h={25}
          p={3}
        >
          {datetime.format("D")}
        </Badge>
      </Flex>
    </UnstyledButton>
  );
}

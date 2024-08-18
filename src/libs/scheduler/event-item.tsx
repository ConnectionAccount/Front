import { Badge, Flex, UnstyledButton } from "@mantine/core";
import { Dayjs } from "dayjs";
import classes from "./style.module.css";

export interface DayItemProps {
  datetime: Dayjs;
  events?: any[];
  thisDay: Dayjs;
  onSelect?: (date: Date) => void;
  renderItem?: (item: any) => React.ReactNode;
}

export function EventItem({
  datetime,
  events,
  thisDay,
  onSelect,
  renderItem,
}: DayItemProps) {
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

      {(events || []).map((event: any, index) => {
        return <div key={index}>{renderItem?.(event)}</div>;
      })}
    </UnstyledButton>
  );
}

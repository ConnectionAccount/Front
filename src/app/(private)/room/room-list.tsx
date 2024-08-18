"use clinte";

import {
  IconTrash,
  IconSearch,
  IconArrowRight,
  IconEditCircle,
  IconCalendarTime,
} from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import { ActionIcon, Flex, Input, Text, Tooltip } from "@mantine/core";
import { roomApi } from "@/apis";
import { message } from "@/utils/message";
import { formatDateTime } from "@/utils/time-age";
import { PageFilter } from "@/libs/page-filter/page";
import { isActive } from "@/utils/badges/user-status";
import { ColumnType, IReloadTable, RowAction, Table } from "@/libs/table/table";

const initialFilters: {
  endDate: string | undefined;
  startDate: string | undefined;
  query: string | null;
  scaleCode: string | null;
} = {
  endDate: undefined,
  startDate: undefined,
  query: "",
  scaleCode: "",
};

export default function RoomList() {
  const [action, setAction] = React.useState<[string, any] | []>([]);
  const [filters, setFilters] = React.useState(initialFilters);
  const tableRef = React.useRef<IReloadTable | null>(null);
  const [debounced] = useDebouncedValue(filters, 200);
  const navigation = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: any) => {
      switch (key) {
        case "edit":
          navigation.push(`/room/${record._id}`);
          break;
        case "addTime":
          setAction(["room", record]);
          break;
        case "remove":
          openContextModal({
            modal: "confirm",
            title: (
              <Flex gap={10}>
                <Text>Баталгаажуулах</Text>
              </Flex>
            ),
            innerProps: {
              children: (
                <Flex>
                  <Text size="sm">
                    Та энэ үйлдэлийг хийхдээ итгэлтэй байна уу?
                  </Text>
                </Flex>
              ),
              onConfirm: async (close: () => void) => {
                try {
                  await roomApi.remove(record._id);
                  message.success("Таны хүсэлт амжилттай!");
                  close();
                  tableRef.current?.reload();
                } catch (error) {
                  message.error("Таны хүсэлт амжилтгүй!");
                  close();
                }
              },
            },
          });
          break;
      }
    },
  });

  return (
    <>
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
      <Table
        ref={tableRef}
        limit={100}
        columns={columns}
        filters={{ query: debounced }}
        loadData={roomApi.list}
        name="room.list"
      />
    </>
  );
}

const useHeader = ({
  onClick,
}: {
  onClick: (key: string, record: any) => void;
}): ColumnType<any>[] => [
  {
    title: "#",
    width: "1px",
    render: (record) => record.index,
  },
  {
    title: "Үйлдэл",
    align: "left",
    width: "1px",
    render: (record) => (
      <RowAction
        onClick={(key) => onClick(key, record)}
        extra={{
          edit: (
            <Tooltip position="bottom" label="Засах">
              <ActionIcon variant="light" radius="md" w={30} h={30}>
                <IconEditCircle size={20} />
              </ActionIcon>
            </Tooltip>
          ),
          remove: (
            <Tooltip position="bottom" label="Устгах">
              <ActionIcon
                h={30}
                w={30}
                color="#C92A2A"
                radius="md"
                variant="light"
              >
                <IconTrash size={20} />
              </ActionIcon>
            </Tooltip>
          ),
        }}
      />
    ),
  },
  {
    title: "Нэр",
    align: "left",
    render: (record) => record.ner || "-",
  },
  {
    title: "Өрөө",
    align: "left",
    render: (record) => record.dugaar || "-",
  },
  {
    title: "Давхар",
    align: "left",
    render: (record) => record.davhar || "-",
  },
  {
    title: "Төлөв",
    align: "left",
    render: (record) => isActive(record.isActive) || "-",
  },
  {
    title: "Огноо",
    align: "left",
    render: (record) => formatDateTime(record.createdAt) || "-",
  },
];

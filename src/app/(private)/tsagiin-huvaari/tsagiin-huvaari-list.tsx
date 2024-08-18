"use clinte";

import {
  IconTrash,
  IconSearch,
  IconArrowRight,
  IconEditCircle,
} from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Calendar, CalendarHeader, DatePickerInput } from "@mantine/dates";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import {
  ActionIcon,
  Divider,
  Flex,
  Input,
  SegmentedControl,
  Tabs,
  Text,
  Tooltip,
} from "@mantine/core";
import { timeTableApi } from "@/apis";
import { message } from "@/utils/message";
import { formatDateTime } from "@/utils/time-age";
import { PageFilter } from "@/libs/page-filter/page";
import { isActive } from "@/utils/badges/user-status";
import { ColumnType, IReloadTable, RowAction, Table } from "@/libs/table/table";

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

export default function TsagiinHuvaariList() {
  const [tabValue, settabValue] = React.useState<string>("timeList");
  const [action, setAction] = React.useState<[string, any] | []>([]);
  const [filters, setFilters] = React.useState(initialFilters);
  const tableRef = React.useRef<IReloadTable | null>(null);
  const [debounced] = useDebouncedValue(filters, 200);

  const navigation = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: any) => {
      switch (key) {
        case "edit":
          navigation.push(`/tsagiin-huvaari/${record._id}`);
          break;
        case "addTime":
          setAction(["tsagiin-huvaari", record]);
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
                  await timeTableApi.remove(record._id);
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
      <Tabs variant="outline" value={tabValue}>
        <SegmentedControl
          my={20}
          w="100%"
          size="sm"
          onChange={(e) => settabValue(e)}
          value={tabValue}
          data={[
            {
              label: "Цагийн бүртгэл",
              value: "timeList",
            },
            {
              label: "Төлөвлөгдсөн хуваарь",
              value: "PlannedSchedule",
            },
            {
              label: "Батлагдсан хуваарь",
              value: "ApprovedSchedule",
            },
          ]}
        />
        <Tabs.Panel value="timeList">
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
                    <Flex
                      align="center"
                      justify="space-between"
                      w="100%"
                      mx="sm"
                    >
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
            loadData={timeTableApi.list}
            name="tsagiin-huvaari.list"
          />
        </Tabs.Panel>
        <Tabs.Panel value="PlannedSchedule">
          <Flex>
            <Calendar />
          </Flex>
          Төлөвлөгдсөн хуваарь...
        </Tabs.Panel>
        <Tabs.Panel value="ApprovedSchedule">Батлагдсан хуваарь...</Tabs.Panel>
      </Tabs>
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
    title: "Өдрийн төрөл",
    align: "left",
    render: (record) => record.odorSongoh || "-",
  },
  {
    title: "Ажил эхлэх цаг",
    align: "left",
    render: (record) => record.ehlehTsag || "-",
  },
  {
    title: "Ажил дуусах цаг",
    align: "left",
    render: (record) => record.duusahTsag || "-",
  },
  {
    title: "Цайны цаг эхлэх",
    align: "left",
    render: (record) => record.tsainiiTsagEhleh || "-",
  },
  {
    title: "Цайны цаг дуусах",
    align: "left",
    render: (record) => record.tsainiiTsagDuusah || "-",
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

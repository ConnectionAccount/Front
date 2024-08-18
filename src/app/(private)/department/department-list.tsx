"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import { Text, Flex, Input, Tooltip, ActionIcon, Modal } from "@mantine/core";
import {
  IconTrash,
  IconSearch,
  IconUserPlus,
  IconArrowRight,
  IconEditCircle,
} from "@tabler/icons-react";
import { departmentApi } from "@/apis";
import { message } from "@/utils/message";
import { formatDateTime } from "@/utils/time-age";
import { PageFilter } from "@/libs/page-filter/page";
import EmployeeList from "../employee/employee-list";
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

export default function DepartmentList() {
  const [action, setAction] = React.useState<[string, any] | []>([]);
  const [filters, setFilters] = React.useState(initialFilters);
  const tableRef = React.useRef<IReloadTable | null>(null);
  const [debounced] = useDebouncedValue(filters, 200);
  const navigation = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: any) => {
      switch (key) {
        case "edit":
          navigation.push(`/department/${record._id}`);
          break;
        case "addTime":
          setAction(["department", record]);
          break;
        case "addEmployee":
          setAction(["addEmployee", record._id]);
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
                  await departmentApi.remove(record._id);
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
              size="sm"
              placeholder="Хайх"
              value={filters.query || ""}
              leftSection={<IconSearch size={16} />}
              onChange={(e) => {
                setFilters({ ...filters, query: e?.currentTarget?.value });
              }}
            />
            <DatePickerInput
              clearable
              locale="mn"
              yearLabelFormat="YYYY"
              leftSectionWidth="30%"
              valueFormat="MM сарын DD өдөр"
              monthLabelFormat="YYYY / MM сар"
              placeholder="Эхлэх онгоо - Дуусах огоо"
              style={{ width: "460px" }}
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
              miw={200}
              size="sm"
              type="range"
            />
          </Flex>,
        ]}
        right={[
          <Tooltip label="Цэвэрлэх" key={1}>
            <ActionIcon
              size="36px"
              variant="light"
              onClick={() => setFilters(initialFilters)}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>,
        ]}
      />
      <Table
        limit={100}
        ref={tableRef}
        columns={columns}
        name="department.list"
        loadData={departmentApi.list}
        filters={{ query: debounced }}
      />
      <Modal
        centered
        size="70%"
        onClose={() => setAction([])}
        opened={action[0] === "addEmployee"}
        title={<Text>Тасагт ажилтан бүртгэх</Text>}
      >
        <EmployeeList onSelect={action} />
      </Modal>
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
                radius="md"
                color="#C92A2A"
                variant="light"
              >
                <IconTrash size={20} />
              </ActionIcon>
            </Tooltip>
          ),
          addEmployee: (
            <Tooltip position="bottom" label="Ажилтан нэмэх">
              <ActionIcon variant="light" radius="md" w={30} h={30}>
                <IconUserPlus size={20} />
              </ActionIcon>
            </Tooltip>
          ),
        }}
      />
    ),
  },
  {
    title: "Ажилтан",
    align: "left",
    render: (record) => record.ajiltan || "-",
  },
  {
    title: "Нэр",
    align: "left",
    render: (record) => record.ner || "-",
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

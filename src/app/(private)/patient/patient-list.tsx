"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconTrash,
  IconSearch,
  IconArrowRight,
  IconEditCircle,
} from "@tabler/icons-react";
import {
  Text,
  Flex,
  Input,
  Modal,
  Avatar,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import AddTime from "./add-time";
import { patientApi } from "@/apis";
import { message } from "@/utils/message";
import { PageFilter } from "@/libs/page-filter/page";
import { gender, isActive } from "@/utils/badges/user-status";
import { formatDate, formatDateTime } from "@/utils/time-age";
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

export default function PatientList() {
  const [action, setAction] = React.useState<[string, any] | []>([]);
  const [filters, setFilters] = React.useState(initialFilters);
  const tableRef = React.useRef<IReloadTable | null>(null);
  const [debounced] = useDebouncedValue(filters, 200);
  const navigation = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: any) => {
      switch (key) {
        case "edit":
          navigation.push(`/patient/${record._id}`);
          break;
        case "addTime":
          setAction(["patient", record]);
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
                  await patientApi.remove(record._id);
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
        loadData={patientApi.list}
        name="patient.list"
      />
      <Modal
        centered
        opened={action[0] === "patient"}
        onClose={() => setAction([])}
        title={
          <Text fw={600} size="lg">
            Цаг тохируулах
          </Text>
        }
      >
        <AddTime />
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
    title: "Зураг",
    align: "left",
    render: (record) => (
      <Flex align="left" justify="left">
        <Avatar radius="sm" src={record?.avatar as any} />
      </Flex>
    ),
  },
  {
    title: "Э.М.Д дугаар",
    align: "left",
    render: (record) => record.emdNo || "-",
  },
  {
    title: "Регистрийн дугаар",
    align: "left",
    render: (record) => record.registerDugaar || "-",
  },
  {
    title: "Овог",
    align: "left",
    render: (record) => record.ovog || "-",
  },
  {
    title: "Нэр",
    align: "left",
    render: (record) => record.ner || "-",
  },
  {
    title: "Харшил",
    align: "left",
    render: (record) => record.harshil || "-",
  },
  {
    title: "Цусны бүлэг",
    align: "left",
    render: (record) => record.tsusniiBuleg || "-",
  },
  {
    title: "Хүйс",
    align: "left",
    render: (record) => gender(record.huis) || "-",
  },
  {
    title: "Төрсөн огноо",
    align: "left",
    render: (record) => formatDate(record.tursunOgnoo) || "-",
  },
  {
    title: "Э-мэйл",
    align: "left",
    render: (record) => record.email || "-",
  },
  {
    title: "Утас",
    align: "left",
    render: (record) => record.utas || "-",
  },
  {
    title: "Утас2",
    align: "left",
    render: (record) => record.utas2 || "-",
  },
  {
    title: "Гэрийн хаяг",
    align: "left",
    render: (record) => record.geriinHayag || "-",
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

"use client";

import React from "react";
import {
  IconEye,
  IconPlus,
  IconTrash,
  IconSearch,
  IconArrowRight,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import { ActionIcon, Button, Flex, Input, Text, Tooltip } from "@mantine/core";
import { message } from "@/utils/message";
import { formatDateTime } from "@/utils/time-age";
import { PageFilter } from "@/libs/page-filter/page";
import PageLayout from "@/libs/page-layout/page-layout";
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

export default function RoomRegistrationPage() {
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
                  // await patientApi.remove(record._id);
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
    <PageLayout
      title="Үйлчлүүлэгч бүртгэл"
      description="Үйлчлүүлэгчийн мэдээлэл"
      breadcrumb={[
        {
          label: "Дашбоард",
          href: "/",
        },
        {
          label: "Үйлчлүүлэгч бүртгэл",
          href: "#",
        },
      ]}
      extra={
        <Button
          key={1}
          size="sm"
          leftSection={<IconPlus size={20} />}
          onClick={() => navigation.push("/patient/new")}
        >
          Үйлчлүүлэгч нэмэх
        </Button>
      }
    >
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
        // loadData={receiptApi.list}
        name="patient.list"
      />
    </PageLayout>
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
            <Tooltip position="bottom" label="Дэлгэрэнгүй">
              <ActionIcon variant="light" radius="md" w={30} h={30} p={0}>
                <IconEye size={20} />
              </ActionIcon>
            </Tooltip>
          ),
        }}
      />
    ),
  },
  {
    title: "Огноо",
    align: "left",
    render: (record) => formatDateTime(record.createdAt) || "-",
  },
];

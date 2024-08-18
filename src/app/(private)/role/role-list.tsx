"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { openContextModal } from "@mantine/modals";
import { useDebouncedValue } from "@mantine/hooks";
import { Text, Flex, Input, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconSearch, IconEditCircle } from "@tabler/icons-react";
import { roleApi } from "@/apis";
import { IRole } from "@/interface/role";
import { message } from "@/utils/message";
import { formatDate } from "@/utils/time-age";
import { PageFilter } from "@/libs/page-filter/page";
import { ColumnType, IReloadTable, RowAction, Table } from "@/libs/table/table";

const initialFilters: {
  query: string | null;
} = {
  query: "",
};

export default function RoleList() {
  const [filters, setFilters] = React.useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 200);
  const tableRef = React.useRef<IReloadTable | null>(null);
  const navigation = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: IRole) => {
      switch (key) {
        case "edit":
          navigation.push(`/role/${record._id}`);
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
                  await roleApi.remove(record._id);
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
        filters={{ ...filters, query: debounced }}
        loadData={roleApi.list}
        name="swr.user.role.table"
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
    width: "1px",
    render: (record) => (
      <RowAction
        onClick={(key) => onClick(key, record)}
        extra={{
          edit: (
            <Tooltip position="bottom" label="Дэлгэрэнгүй">
              <ActionIcon w={30} h={30} radius="md" variant="light">
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
    render: (record) => record.name,
  },
  {
    title: "Тайлбар",
    render: (record) => record.description,
  },
  {
    title: "Огноо",
    render: (record) => formatDate(record.createdAt),
  },
];

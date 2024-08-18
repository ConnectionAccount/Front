"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { roomApi } from "@/apis";
import RoomForm from "../room-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EditRoomPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await roomApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/room");
  };

  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <RoomForm payload={data} onCancel={onCancel} />
      ) : (
        <LoadingOverlay visible />
      )}
    </PageLayout>
  );
}

const breadcrumb = [
  {
    label: "Дашбоард",
    href: "/",
  },
  {
    label: "Өрөө бүртгэл",
    href: "/room",
  },
  {
    label: "Засах",
    href: "#",
  },
];

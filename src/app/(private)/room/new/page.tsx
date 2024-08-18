"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RoomForm from "../room-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function NewRoomPage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/room");
  };

  return (
    <PageLayout title="Шинэ бүртгэл хийх" breadcrumb={breadcrumb} bgGray>
      <RoomForm onCancel={onCancel} />
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
    href: "/rooom",
  },
  {
    label: "Нэмэх",
    href: "#",
  },
];

"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import ServiceList from "./room-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function RoomPage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Өрөө бүртгэл"
        description="Өрөөний мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Өрөө бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/room/new")}
          >
            Өрөө нэмэх
          </Button>
        }
      >
        <ServiceList />
      </PageLayout>
    </>
  );
}

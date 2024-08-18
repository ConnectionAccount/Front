"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import RoleList from "./role-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function RolePage() {
  const navigation = useRouter();

  return (
    <PageLayout
      title="Хандах эрх"
      breadcrumb={[
        {
          label: "Дашбоард",
          href: "/",
        },
        {
          label: "Хандах эрх",
          href: "/role",
        },
      ]}
      extra={
        <Button
          key={0}
          onClick={() => navigation.push("/role/new")}
          leftSection={<IconPlus size={20} />}
        >
          Хандах эрх
        </Button>
      }
    >
      <RoleList />
    </PageLayout>
  );
}

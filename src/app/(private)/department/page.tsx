"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import DepartmentList from "./department-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function DepartmentPage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Тасаг бүртгэл"
        description="Тасгийн мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Тасаг бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/department/new")}
          >
            Тасаг нэмэх
          </Button>
        }
      >
        <DepartmentList />
      </PageLayout>
    </>
  );
}

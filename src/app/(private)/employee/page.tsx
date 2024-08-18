"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import EmployeeList from "./employee-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EmployeePage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Ажилтан бүртгэл"
        description="Ажилтны мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Ажилтан бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/employee/new")}
          >
            Ажилтан нэмэх
          </Button>
        }
      >
        <EmployeeList />
      </PageLayout>
    </>
  );
}

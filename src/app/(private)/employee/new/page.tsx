"use client";

import React from "react";
import { useRouter } from "next/navigation";
import EmployeeForm from "../employee-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function NewEmployeePage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/employee");
  };

  return (
    <PageLayout title="Шинэ бүртгэл хийх" breadcrumb={breadcrumb} bgGray>
      <EmployeeForm onCancel={onCancel} />
    </PageLayout>
  );
}

const breadcrumb = [
  {
    label: "Дашбоард",
    href: "/",
  },
  {
    label: "Ажилтан бүртгэл",
    href: "/employee",
  },
  {
    label: "Нэмэх",
    href: "#",
  },
];

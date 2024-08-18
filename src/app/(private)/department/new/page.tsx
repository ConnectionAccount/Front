"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PatientForm from "../department-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function NewDepartmentPage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/department");
  };

  return (
    <PageLayout title="Шинэ бүртгэл хийх" breadcrumb={breadcrumb} bgGray>
      <PatientForm onCancel={onCancel} />
    </PageLayout>
  );
}

const breadcrumb = [
  {
    label: "Дашбоард",
    href: "/",
  },
  {
    label: "Тасаг бүртгэл",
    href: "/department",
  },
  {
    label: "Нэмэх",
    href: "#",
  },
];

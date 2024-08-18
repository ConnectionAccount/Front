"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { departmentApi } from "@/apis";
import DepartmentForm from "../department-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EditDepartmentPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await departmentApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/department");
  };
  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <DepartmentForm payload={data} onCancel={onCancel} />
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
    label: "Тасаг бүртгэл",
    href: "/department",
  },
  {
    label: "Засах",
    href: "#",
  },
];

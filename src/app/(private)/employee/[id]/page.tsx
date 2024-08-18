"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { employeeApi } from "@/apis";
import EmployeeForm from "../employee-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EditDepartmentPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await employeeApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/employee");
  };

  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <EmployeeForm payload={data} onCancel={onCancel} />
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
    label: "Ажилтан бүртгэл",
    href: "/employee",
  },
  {
    label: "Засах",
    href: "#",
  },
];

"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { serviceApi } from "@/apis";
import ServiceForm from "../service-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EditDepartmentPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await serviceApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/service");
  };

  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <ServiceForm payload={data} onCancel={onCancel} />
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
    label: "Үйлчилгээ бүртгэл",
    href: "/service",
  },
  {
    label: "Засах",
    href: "#",
  },
];

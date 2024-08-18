"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { timeTableApi } from "@/apis";
import PageLayout from "@/libs/page-layout/page-layout";
import TsagiinHuvaariForm from "../tsagiin-huvaari-form";

export default function EditTsagiinHuvaariPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await timeTableApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/tsagiin-huvaari");
  };

  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <TsagiinHuvaariForm payload={data} onCancel={onCancel} />
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
    label: "Цагийн бүртгэл бүртгэл",
    href: "/tsagiin-huvaari",
  },
  {
    label: "Засах",
    href: "#",
  },
];

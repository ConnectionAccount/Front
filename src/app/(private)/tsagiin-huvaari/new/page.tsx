"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/libs/page-layout/page-layout";
import TsagiinHuvaariForm from "../tsagiin-huvaari-form";

export default function NewTsagiinHuvaariPage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/tsagiin-huvaari");
  };

  return (
    <PageLayout title="Шинэ бүртгэл хийх" breadcrumb={breadcrumb} bgGray>
      <TsagiinHuvaariForm onCancel={onCancel} />
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
    label: "Нэмэх",
    href: "#",
  },
];

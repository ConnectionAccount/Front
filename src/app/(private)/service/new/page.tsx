"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ServiceForm from "../service-form";
import PageLayout from "@/libs/page-layout/page-layout";

export default function NewServicePage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/service");
  };

  return (
    <PageLayout title="Шинэ бүртгэл хийх" breadcrumb={breadcrumb} bgGray>
      <ServiceForm onCancel={onCancel} />
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
    label: "Нэмэх",
    href: "#",
  },
];

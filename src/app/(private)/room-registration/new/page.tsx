"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/libs/page-layout/page-layout";
import PatientForm from "../form";

export default function NewPatientPage() {
  const router = useRouter();

  const onCancel = () => {
    router.push("/patient");
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
    label: "Үйлчлүүлэгч бүртгэл",
    href: "/patient",
  },
  {
    label: "Нэмэх",
    href: "#",
  },
];

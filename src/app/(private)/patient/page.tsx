"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import PageLayout from "@/libs/page-layout/page-layout";
import PatientList from "./patient-list";

export default function PatientPage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Үйлчлүүлэгч бүртгэл"
        description="Үйлчлүүлэгчийн мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Үйлчлүүлэгч бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/patient/new")}
          >
            Үйлчлүүлэгч нэмэх
          </Button>
        }
      >
        <PatientList />
      </PageLayout>
    </>
  );
}

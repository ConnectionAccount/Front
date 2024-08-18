"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import ServiceList from "./service-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function ServicePage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Үйлчилгээ бүртгэл"
        description="Үйлчилгээний мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Үйлчилгээ бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/service/new")}
          >
            Үйлчилгээ нэмэх
          </Button>
        }
      >
        <ServiceList />
      </PageLayout>
    </>
  );
}

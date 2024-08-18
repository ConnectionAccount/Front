"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import ServiceList from "./tsagiin-huvaari-list";
import PageLayout from "@/libs/page-layout/page-layout";

export default function TsagiinHuvaariPage() {
  const navigation = useRouter();

  return (
    <>
      <PageLayout
        title="Цагийн бүртгэл бүртгэл"
        description="Цагийн бүртгэлийн мэдээлэл"
        breadcrumb={[
          {
            label: "Дашбоард",
            href: "/",
          },
          {
            label: "Цагийн бүртгэл бүртгэл",
            href: "#",
          },
        ]}
        extra={
          <Button
            key={1}
            size="sm"
            leftSection={<IconPlus size={20} />}
            onClick={() => navigation.push("/tsagiin-huvaari/new")}
          >
            Цагийн бүртгэл нэмэх
          </Button>
        }
      >
        <ServiceList />
      </PageLayout>
    </>
  );
}

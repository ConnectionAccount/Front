"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import PatientForm from "../patient-form";
import PageLayout from "@/libs/page-layout/page-layout";
import { patientApi } from "@/apis";

export default function EditPatientPage() {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const router = useRouter();

  const loadData = async () => {
    const res = await patientApi.get(id as string);
    setData(res);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onCancel = () => {
    router.push("/patient");
  };
  return (
    <PageLayout title="Бүртгэл засах" breadcrumb={breadcrumb} bgGray>
      {data ? (
        <PatientForm payload={data} onCancel={onCancel} />
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
    label: "Үйлчлүүлэгч бүртгэл",
    href: "/patient",
  },
  {
    label: "Засах",
    href: "#",
  },
];

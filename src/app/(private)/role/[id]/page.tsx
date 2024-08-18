"use client";

import { useParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { roleApi } from "@/apis";
import RoleForm from "../role-form";
import { IRole } from "@/interface/role";
import PageLayout from "@/libs/page-layout/page-layout";

export default function EditScalePage() {
  const [data, setData] = useState<IRole>();
  const { id } = useParams();

  const loadData = async () => {
    const res = await roleApi.get(id as string);
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <PageLayout
      title="Хандах эрх засах"
      breadcrumb={[
        {
          label: "Дашбоард",
          href: "/",
        },
        {
          label: "Хандах эрх",
          href: "/role",
        },
        {
          label: "Засах",
          href: `/role/${id}`,
        },
      ]}
      bgGray
    >
      {data ? (
        <RoleForm
          payload={{
            _id: data?._id,
            name: data?.name,
            description: data?.description,
            permissions: data?.permissionId?.reduce(
              (acc, iter) => ({
                ...acc,
                [iter.code]: {
                  code: iter.code,
                  name: iter.name,
                  isFull: iter.isFull,
                  isRead: iter.isRead,
                  isWrite: iter.isWrite,
                  isRemove: iter.isRemove,
                  description: iter.description,
                },
              }),
              {},
            ),
          }}
        />
      ) : (
        <LoadingOverlay />
      )}
      <br />
    </PageLayout>
  );
}

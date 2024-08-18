"use client";

import React from "react";
import { useSelector } from "react-redux";
import RoleForm from "../role-form";
import { IGeneral } from "@/interface/general";
import PageLayout from "@/libs/page-layout/page-layout";

export default function NewScalePage() {
  const { permissions } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );

  return (
    <PageLayout
      title="Хандах эрх нэмэх"
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
          label: "Нэмэх",
          href: "/role/new",
        },
      ]}
      bgGray
    >
      <RoleForm
        payload={{
          name: undefined,
          description: undefined,
          permissions: Object.values(permissions).reduce(
            (acc, iter) => ({
              ...acc,
              [iter.code]: {
                code: iter.code,
                isFull: false,
                isRead: false,
                isWrite: false,
                isRemove: false,
              },
            }),
            {},
          ),
        }}
      />
      <br />
    </PageLayout>
  );
}

"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Header from "@/components/layouts/header/header";
import Navigation from "@/components/layouts/navigation/navigation";
import "@mantine/dates/styles.css";
import AdminProvider from "@/utils/init";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AdminProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 130,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header style={{ borderBottom: "8px  solid #1177E8" }}>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar px="md">
          <Navigation />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AdminProvider>
  );
}

"use client";

import { Breadcrumbs, Flex, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";

export default function PageLayout({
  children,
  title,
  description,
  extra,
  breadcrumb = [
    {
      label: "Дашбоард",
      href: "/",
    },
  ],
  bgGray = false,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  extra?: React.ReactNode;
  breadcrumb?: {
    label: string;
    href: string;
  }[];
  bgGray?: boolean;
}) {
  const theme = useMantineTheme();
  return (
    <Flex
      direction="column"
      gap={20}
      p="md"
      style={{
        background: bgGray ? "#F8F9FA" : "#FFFFFF",
        minHeight: "calc(100vh - calc(3.75rem * var(--mantine-scale)))",
      }}
    >
      <Breadcrumbs>
        {breadcrumb.map((item, index) => (
          <Link href={item.href} key={index} style={{ textDecoration: "none" }}>
            <Text size="sm" c={theme.colors.gray[8]}>
              {item.label}
            </Text>
          </Link>
        ))}
      </Breadcrumbs>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text size="lg" fw="600">
            {title}
          </Text>
          <Text size="sm" c="gray" fw="500">
            {description}
          </Text>
        </Flex>
        <Flex align="center">{extra}</Flex>
      </Flex>
      <div>{children}</div>
    </Flex>
  );
}

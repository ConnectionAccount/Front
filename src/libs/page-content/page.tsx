"use client";

import { Flex, Paper, Text } from "@mantine/core";

export default function PageContent({
  title,
  description,
  children,
  extra,
  h,
}: {
  title?: any;
  description?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  h?: any;
}) {
  return (
    <Paper radius="sm" p="md" withBorder w="100%" h={h}>
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
    </Paper>
  );
}

import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconCoin,
  IconUserPlus,
  IconReceipt2,
  IconDiscount2,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./statsGrid1.module.css";

const icons = {
  coin: IconCoin,
  user: IconUserPlus,
  receipt: IconReceipt2,
  discount: IconDiscount2,
};

const data = [
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
] as const;

export function DashboardCard() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>;
}

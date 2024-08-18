import {
  Badge,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";

export default function StatsInfo({ data }: any) {
  const stats = (data || []).map((stat: any) => {
    const IconComponent = stat?.icon;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Flex gap={10} align="center">
              <Text fw={600} fz="xl">
                {stat.value}
              </Text>
              {/* <Badge variant="light" size="md" fw={700}>
                Өнөөдөр
              </Badge> */}
            </Flex>
          </div>
          <ThemeIcon variant="light" size={38} radius="md">
            {IconComponent && <IconComponent size="1.8rem" stroke={1.5} />}
          </ThemeIcon>
        </Group>
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}

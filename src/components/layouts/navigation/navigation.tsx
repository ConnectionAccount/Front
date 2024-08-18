import {
  rem,
  Flex,
  Text,
  Stack,
  Tooltip,
  ActionIcon,
  ScrollArea,
  UnstyledButton,
} from "@mantine/core";
import {
  IconDoor,
  IconLock,
  IconHome2,
  IconNurse,
  IconChartPie,
  IconStethoscope,
  IconCalendarTime,
  IconHeartRateMonitor,
  IconDeviceLandlinePhone,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./navigation.module.css";

const items = [
  { label: "Хянах самбар", icon: IconChartPie, link: "/" },
  {
    label: "Үйлчлүүлэгч ",
    icon: IconHeartRateMonitor,
    link: "/patient",
  },
  {
    label: "Ажилтан",
    icon: IconStethoscope,
    link: "/employee",
  },
  {
    label: "Үйлчилгээ",
    icon: IconDeviceLandlinePhone,
    link: "/service",
  },
  {
    label: "Тасаг",
    icon: IconDoor,
    link: "/department",
  },
  {
    label: "Өрөө",
    icon: IconNurse,
    link: "/room",
  },
  {
    label: "Цагийн хуваарь",
    icon: IconCalendarTime,
    link: "/tsagiin-huvaari",
  },
  {
    label: "Хандах эрх",
    icon: IconLock,
    link: "/role",
  },
  // {
  //   label: "Ор хоног",
  //   icon: IconBed,
  //   link: "/room-registration",
  // },
  // {
  //   label: "Төлбөр тооцоо",
  //   icon: IconCoins,
  //   link: "/tulbur",
  // },
];

interface NavbarLinkProps {
  link: string;
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
}

function NavbarLink({ icon: Icon, label, active, link }: NavbarLinkProps) {
  return (
    <Tooltip
      color="blue.9"
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton href={link} component={Link} className={classes.link}>
        <ActionIcon
          w="40px"
          h="40px"
          color="blue"
          variant="light"
          className={classes.icon}
          data-active={active || undefined}
        >
          <Icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
        </ActionIcon>
        <Flex w="100%" align="center" mt="xs" justify="center">
          <Text style={{ textAlign: "center" }} size="xs" fw={500}>
            {label}
          </Text>
        </Flex>
      </UnstyledButton>
    </Tooltip>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const links = items.map((link, index) => {
    const regex = /^\/[^/]*/;
    const isActive = pathname.match(regex)?.toString() === link.link;
    return (
      <NavbarLink
        {...link}
        key={index}
        active={link.link !== "/" ? isActive : pathname === link.link}
      />
    );
  });

  return (
    <ScrollArea type="never">
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>
      </nav>
    </ScrollArea>
  );
}

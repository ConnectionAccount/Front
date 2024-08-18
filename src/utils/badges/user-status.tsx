import { Badge, Flex, Text, Tooltip } from "@mantine/core";
import {
  IconArrowBarBoth,
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconGenderFemale,
  IconGenderMale,
  IconPoint,
  IconPointFilled,
} from "@tabler/icons-react";
import { formatDate } from "../time-age";

const isActive = (val: boolean) => {
  switch (val) {
    case true: {
      return (
        <Badge
          color="teal.9"
          size="md"
          radius="sm"
          variant="light"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
          style={{ border: "1px solid" }}
        >
          Идэвхтэй
        </Badge>
      );
    }
    case false: {
      return (
        <Badge
          color="red.9"
          size="md"
          radius="sm"
          variant="light"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
          style={{ border: "1px solid" }}
        >
          Идэвхгүй
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          color="blue.9"
          size="md"
          radius="sm"
          variant="light"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
          style={{ border: "1px solid" }}
        >
          Хоосон
        </Badge>
      );
    }
  }
};

const isLoad = (val: boolean) => {
  switch (val) {
    case true: {
      return (
        <Badge
          color="teal.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
        >
          Ачигдсан
        </Badge>
      );
    }
    case false: {
      return (
        <Badge
          color="red.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
        >
          Ачаагүй
        </Badge>
      );
    }
    default: {
      return (
        <Badge color="orange" size="md" radius="sm" variant="default">
          Мэдээлэл байхгүй
        </Badge>
      );
    }
  }
};

const customerId = (val: string) => {
  switch (val) {
    case "BUYER": {
      return (
        <Badge size="md" radius="sm" variant="light" color="grape.9">
          Худалдан авагч
        </Badge>
      );
    }
    case "TRANSPORT": {
      return (
        <Badge size="md" radius="sm" variant="light" color="red.9">
          Тээвэрийн компани
        </Badge>
      );
    }
    case "ROAD": {
      return (
        <Badge size="md" radius="sm" variant="light" color="blue.9">
          Замын компани
        </Badge>
      );
    }
    case "CUSTOMS": {
      return (
        <Badge size="md" radius="sm" variant="light" color="orange.9">
          Гааль
        </Badge>
      );
    }
    case "MINE": {
      return (
        <Badge size="md" radius="sm" variant="light" color="orange.9">
          Уурхайн компани
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};
const gender = (val: string) => {
  switch (val) {
    case "FEMALE": {
      return (
        <Badge
          size="md"
          radius="sm"
          color="grape"
          variant="outline"
          leftSection={<IconGenderFemale size={15} />}
        >
          Эмэгтэй
        </Badge>
      );
    }
    case "MALE": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          leftSection={<IconGenderMale size={15} />}
        >
          Эрэгтэй
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};

const buyerStatus = (val: string) => {
  switch (val) {
    case "NEW": {
      return (
        <Badge size="md" radius="sm" variant="outline" color="yellow.9">
          Шинэ
        </Badge>
      );
    }
    case "VERIFIED": {
      return (
        <Badge size="md" radius="sm" variant="outline" color="teal.9">
          Баталгаажсан
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};
const TruckScaleType = (val: string) => {
  switch (val) {
    case "INCOME": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          color="grape.9"
          leftSection={<IconArrowBarToRight size={15} />}
        >
          Орох
        </Badge>
      );
    }
    case "OUTCOME": {
      return (
        <Badge
          color="red.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={<IconArrowBarToLeft size={15} />}
        >
          Гарах
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};
const WarehouseStatus = (val: string) => {
  switch (val) {
    case "ACTIVE": {
      return (
        <Badge
          color="teal.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
        >
          Идэвхтэй
        </Badge>
      );
    }
    case "PASSIVE": {
      return (
        <Badge
          color="red.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={
            <IconPoint
              size={8}
              stroke={10}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
        >
          Идэвхгүй
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};

const createdAt = (createdAt: string, updatedAt: string) => {
  return (
    <>
      <Tooltip label="Бүртэгсэн огноо" position="bottom-start">
        <Text style={{ whiteSpace: "nowrap" }} size="xs">
          {createdAt ? formatDate(createdAt) : "0000-00-00 00:00:00"}
        </Text>
      </Tooltip>
      <Tooltip label="Зассан огноо" position="bottom-start">
        <Text style={{ whiteSpace: "nowrap" }} size="xs">
          {updatedAt ? formatDate(updatedAt) : "0000-00-00 00:00:00"}
        </Text>
      </Tooltip>
    </>
  );
};
const titude = (latitude: string, longitude: string) => {
  return (
    <>
      <Tooltip label="Өргөрөг" position="bottom-start">
        <Text style={{ whiteSpace: "nowrap" }} size="xs">
          {latitude}
        </Text>
      </Tooltip>
      <Tooltip label="Уртраг" position="bottom-start">
        <Text style={{ whiteSpace: "nowrap" }} size="xs">
          {longitude}
        </Text>
      </Tooltip>
    </>
  );
};

const Scaletype = (val: string) => {
  switch (val) {
    case "IN": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          color="grape.9"
          leftSection={<IconArrowBarToRight size={15} />}
        >
          Орох
        </Badge>
      );
    }
    case "OUT": {
      return (
        <Badge
          color="red.9"
          size="md"
          radius="sm"
          variant="outline"
          leftSection={<IconArrowBarToLeft size={15} />}
        >
          Гарах
        </Badge>
      );
    }
    case "BOTH": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          color="green.9"
          leftSection={<IconArrowBarBoth size={15} />}
        >
          Орох, Гарах
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};

const contractType = (val: string) => {
  switch (val) {
    case "BUYER": {
      return (
        <Badge size="md" radius="sm" variant="light" color="grape.9">
          Худалдан авагчийн гэрээ
        </Badge>
      );
    }
    case "TRANSPORT": {
      return (
        <Badge size="md" radius="sm" variant="light" color="red.9">
          Тээврийн гэрээ
        </Badge>
      );
    }
    case "LIABILITY": {
      return (
        <Badge size="md" radius="sm" variant="light" color="orange.9">
          Хариуцлагын гэрээ
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};

const scaleStatus = (val: string) => {
  switch (val) {
    case "NEW": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Шинэ
        </Badge>
      );
    }
    case "VERIFIED": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Баталгаажсан
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Тодорхойгүй
        </Badge>
      );
    }
  }
};
const isClearance = (val: boolean) => {
  switch (val) {
    case true: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Бүрдүүлэлттэй
        </Badge>
      );
    }
    case false: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          color="orange.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Бүрдүүлэлтгүй
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          color="grape.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Тодорхойгүй
        </Badge>
      );
    }
  }
};
const exportType = (val: string) => {
  switch (val) {
    case "DONE": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          color="green.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Амжилттай
        </Badge>
      );
    }
    case "CANCELED": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          color="orange.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Цуцлагдсан
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          color="orange.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Хүлээгдэж буй
        </Badge>
      );
    }
  }
};
const receiptStatus = (val: string) => {
  switch (val) {
    case "NEW": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Ачилт
        </Badge>
      );
    }
    case "UPDATED": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Баталгаат агуулах
        </Badge>
      );
    }
    case "DONE": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Шилжүүлэн ачих талбай
        </Badge>
      );
    }
    case "TOAVG": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Тээврийн хэрэгсэл солих
        </Badge>
      );
    }
    case "EXPORT": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Экспорт хийгдсэн
        </Badge>
      );
    }
    case "OWN_SCALE": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Өөрийн жингээ өгөх
        </Badge>
      );
    }
    case "START": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Хоосон чинглэг авах
        </Badge>
      );
    }
    case "OUT": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Баталгаат агуулхаас гарах
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Тодорхойгүй
        </Badge>
      );
    }
  }
};
const weightType = (val: string) => {
  switch (val) {
    case "LADED": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          color="teal.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Ачаатай
        </Badge>
      );
    }
    case "UNLADED": {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="outline"
          color="orange.9"
          leftSection={<IconPointFilled size={15} />}
        >
          Ачаагүй
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="default"
          leftSection={<IconPointFilled size={15} />}
        >
          Тодорхойгүй
        </Badge>
      );
    }
  }
};
const contractStatus = (val: string) => {
  switch (val) {
    case "CONFIRMED": {
      return (
        <Badge size="md" radius="sm" variant="outline" color="teal.9">
          Баталгаажсан
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          color="blue.9"
          size="md"
          radius="sm"
          variant="light"
          style={{ border: "1px solid" }}
        >
          Илгээсэн
        </Badge>
      );
    }
  }
};

const name = (lastName: string, firstName: string) => {
  return (
    <>
      <Text c="gray" size="xs">
        {lastName || "-"}
      </Text>
      <Text style={{ whiteSpace: "nowrap" }}>{firstName || "-"}</Text>
    </>
  );
};

const isDetect = (val: boolean) => {
  switch (val) {
    case true: {
      return (
        <Badge
          color="teal.9"
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Дугаар танилттай
        </Badge>
      );
    }
    case false: {
      return (
        <Badge
          color="orange.9"
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Дугаар танилтгүй
        </Badge>
      );
    }
    default: {
      return (
        <Badge
          size="md"
          radius="sm"
          variant="light"
          leftSection={<IconPointFilled size={15} />}
        >
          Мэдээлэл байхгүй
        </Badge>
      );
    }
  }
};

const connectionStatus = (val: string) => {
  switch (val) {
    case "CONNECTED": {
      return (
        <Flex gap={6} align="center">
          <IconPoint
            size={8}
            color="green"
            stroke={10}
            style={{ display: "flex", justifyContent: "center" }}
          />
          <Text size="sm" c="green" tt="uppercase">
            Connected
          </Text>
        </Flex>
      );
    }
    case "DISCONNECTED": {
      return (
        <Flex align="center" gap={6}>
          <IconPoint
            size={8}
            color="red"
            stroke={10}
            style={{ display: "flex", justifyContent: "center" }}
          />
          <Text size="sm" c="red" tt="uppercase">
            Disconnected
          </Text>
        </Flex>
      );
    }
    default: {
      return (
        <Flex align="center" gap={6}>
          <IconPoint
            size={8}
            color="red"
            stroke={10}
            style={{ display: "flex", justifyContent: "center" }}
          />
          <Text size="sm" c="red" tt="uppercase">
            Мэдээлэл байхгүй
          </Text>
        </Flex>
      );
    }
  }
};

export {
  weightType,
  receiptStatus,
  customerId,
  titude,
  isActive,
  name,
  gender,
  Scaletype,
  createdAt,
  scaleStatus,
  contractType,
  contractStatus,
  TruckScaleType,
  buyerStatus,
  WarehouseStatus,
  connectionStatus,
  isLoad,
  isClearance,
  exportType,
  isDetect,
};

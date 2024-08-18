"use client";

import * as yup from "yup";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  PinInput,
  Text,
} from "@mantine/core";
import { otpApi } from "@/apis";
import { Form } from "@/libs/form";
import { message } from "@/utils/message";
import { IAuth } from "@/interface/auth";
import { setToken } from "@/store/auth-slice";

const formSchema = yup.object({
  otpCode: yup.string().min(1, "Баталгаажуулах код оруулна уу").optional(),
});

export default function ForgotOtp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { otp } = useSelector((state: { auth: IAuth }) => state.auth);
  const [, setTiker] = React.useState<number>(0);

  const { expiresAt, message: alertMessage } = otp;
  const expriesOn = expiresAt
    ? dayjs(expiresAt)
    : dayjs().subtract(3, "minute");

  const countDownExpiresAt = () => {
    const now = dayjs();
    const diff = expriesOn.diff(now, "second");
    const minutes = Math.floor(diff / 60);
    const seconds = diff - minutes * 60;
    return `${minutes} минут ${seconds} секунд`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTiker((prev) => prev + 1);
    }, 1000);

    if (expriesOn.isBefore(dayjs())) {
      setTimeout(() => {
        clearInterval(timer);
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [expriesOn]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card padding="sm" radius="md" style={{ width: 320 }}>
        <Flex direction="column" mb={10}>
          <Text size="xl" fw="700" c="#1177E8">
            Digital med
          </Text>
          {/* <Text size="xs" c="dimmed">
            Баталгаажуулах хэсэг
          </Text> */}
        </Flex>
        <Form
          initialValues={{
            otpCode: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await otpApi.verify({
                otpMethod: "FORGOT",
                otpCode: values.otpCode || "",
              });
              dispatch(setToken(res));
              message.success("Та шинэ нууц үг үүсгэнэ үү");
              router.push("/change-password");
            } catch (error: any) {
              message.error(error.message);
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={formSchema}
        >
          {({ values, errors, setFieldValue }) => (
            <>
              <Flex gap={12} direction="column">
                <div>
                  <Text size="xs" fw={700}>
                    Баталгаажуулах
                  </Text>
                  <Text size="xs" c="dimmed">
                    {alertMessage ||
                      "Таны бүртгэлтэй э-майл хаяг руу баталгаажуулах 6 оронтой код илгээсэн."}
                  </Text>
                </div>
                {expriesOn.isBefore(dayjs()) && (
                  <Flex
                    direction="column"
                    variant="light"
                    p={12}
                    bg="#D0EBFF"
                    style={{ borderRadius: "6px" }}
                  >
                    <Text c="black" fw="bold" size="xs">
                      OTP код идвэхтэй байх хугацаа:
                    </Text>
                    <Text size="xs">{countDownExpiresAt()}</Text>
                  </Flex>
                )}

                <PinInput
                  error={errors.otpCode}
                  onChange={(values) => setFieldValue("otpCode", values)}
                  value={values.otpCode}
                  style={{ display: "flex", justifyContent: "center" }}
                  radius="md"
                  size="sm"
                  length={6}
                  mask
                />
                <Button type="submit" fullWidth loading={loading}>
                  Баталгаажуулах
                </Button>
              </Flex>
              <Group mt="xs" justify="center">
                <Text size="xs" c="#303030" fw={400}>
                  Нэврэх хэсэгрүү буцах бол
                  <Link href="/login">
                    <Text mx="3px" span inherit fw={500}>
                      энд дарна уу!
                    </Text>
                  </Link>
                </Text>
              </Group>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}

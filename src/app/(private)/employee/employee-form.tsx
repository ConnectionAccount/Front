/* eslint-disable no-useless-escape */

"use client";

import React from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Button, Divider, Flex, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
import { employeeApi } from "@/apis";
import { message } from "@/utils/message";
import { IGeneral } from "@/interface/general";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import PageContent from "@/libs/page-content/page";
import { SwitchField } from "@/libs/form/switch-field";
import { PasswordField } from "@/libs/form/password-filed";
import { MultiSelectField } from "@/libs/form/multi-select-field";

const formSchema = yup.object({
  utas: yup
    .string()
    .matches(/^[0-9]{8}$/, "Дугаарын формат буруу байна!")
    .required("Заавал бөглөнө үү!"),
  email: yup
    .string()
    .email("Заавал и-мэйл байна!")
    .required("Заавал бөглөнө үү!"),
  registerDugaar: yup
    .string()
    .matches(/^[А-Яа-я|Үү|Өө|Ёё]{2}[0-9]{8}$/, "Регистрийн формат буруу байна!")
    .required("Заавал бөглөнө үү!"),
  ner: yup.string().required("Заавал бөглөнө үү!"),
  ovog: yup.string().required("Заавал бөглөнө үү!"),
  nuutsUg: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "8 тэмдэгт, нэг том, нэг жижиг, нэг тоо, нэг тусгай үсэг агуулсан байх ёстой",
    ),
  nuutsUgDavtah: yup
    .string()
    .oneOf([yup.ref("nuutsUg")], "Нууц үг таарахгүй байна")
    .required("Заавал бөглөнө үү!"),
  albanTushaal: yup.string().required("Заавал бөглөнө үү!"),
  roleId: yup.array().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function EmployeeForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { roles } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );
  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await employeeApi.update(payload._id, {
          ner: values.ner,
          utas: values.utas,
          ovog: values.ovog,
          email: values.email,
          roleId: values.roleId,
          isActive: values.isActive,
          albanTushaal: values.albanTushaal,
          registerDugaar: values.registerDugaar,
        });
      } else {
        await employeeApi.create({
          ner: values.ner,
          utas: values.utas,
          ovog: values.ovog,
          email: values.email,
          roleId: values.roleId,
          nuutsUg: values.nuutsUg,
          isActive: values.isActive,
          albanTushaal: values.albanTushaal,
          registerDugaar: values.registerDugaar,
        });
      }
      message.success("Таны хүсэлт амжилттай.");
      onCancel && onCancel();
    } catch (err) {
      errorParse(err);
    } finally {
      setLoading(false);
    }
  };

  const [data] = React.useState({
    ner: payload?.ner || "",
    utas: payload?.utas || "",
    ovog: payload?.ovog || "",
    email: payload?.email || "",
    nuutsUg: payload ? null : "",
    roleId: payload?.roleId || null,
    albanTushaal: payload?.albanTushaal || "",
    registerDugaar: payload?.registerDugaar || "",
    isActive: payload?.isActive || false,
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={data}
        validationSchema={formSchema}
      >
        {({ values, setFieldValue, errors }) => (
          <>
            <PageContent
              title="Ажилтны мэдээлэл"
              description="Ажилтны үндсэн мэдээлэл."
              extra={[
                <Flex justify="center" align="center" key={0} mr={15}>
                  <SwitchField name="isActive" label="Төлөв" />
                </Flex>,
                <Button
                  key={1}
                  onClick={() => onCancel && onCancel()}
                  size="sm"
                  variant="default"
                  mr={15}
                >
                  Буцах
                </Button>,
                <Button key={2} type="submit" size="sm" loading={loading}>
                  Хадгалах
                </Button>,
              ]}
            >
              <Divider my={20} />
              <Grid>
                <Grid.Col span={{ base: 12, xl: 6 }}>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="ovog"
                        label="Овог"
                        placeholder="Овог"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="ner"
                        label="Нэр"
                        placeholder="Нэр"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="albanTushaal"
                        label="Албан тушаал"
                        placeholder="Албан тушаал"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        isUpperCase
                        name="registerDugaar"
                        label="Регистрийн дугаар"
                        placeholder="Регистрийн дугаар"
                        required
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="email"
                        label="Цахим шуудан"
                        placeholder="Цахим шуудан"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        type="number"
                        name="utas"
                        label="Утас"
                        placeholder="Утас"
                        required
                      />
                    </Grid.Col>
                    {!payload && (
                      <>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <PasswordField
                            name="nuutsUg"
                            label="Нууц үг"
                            placeholder="Нууц үг"
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <PasswordField
                            name="nuutsUgDavtah"
                            label="Нууц үг давтах"
                            placeholder="Нууц үг давтах"
                          />
                        </Grid.Col>
                      </>
                    )}
                  </Grid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <MultiSelectField
                    name="roleId"
                    label="Хандах эрх"
                    placeholder="Хандах эрх"
                    required
                    options={(roles || []).map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  />
                </Grid.Col>
              </Grid>
            </PageContent>
          </>
        )}
      </Form>
    </>
  );
}

"use client";

import * as yup from "yup";
import React from "react";
import {
  Flex,
  Grid,
  Tabs,
  Button,
  Divider,
  SegmentedControl,
} from "@mantine/core";
import { Form } from "@/libs/form";
import { patientApi } from "@/apis";
import { message } from "@/utils/message";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import PageContent from "@/libs/page-content/page";
import { NumberField } from "@/libs/form/number-field";
import { SelectField } from "@/libs/form/select-field";
import { SwitchField } from "@/libs/form/switch-field";
import { ImageUpload } from "@/libs/upload/image-upload";
import { TextareaField } from "@/libs/form/textarea-field";
import { DatePickerField } from "@/libs/form/datepickerinput-field";

const formSchema = yup.object({
  email: yup
    .string()
    .email("Заавал и-мэйл байна!")
    .required("Заавал бөглөнө үү!"),
  utas: yup
    .string()
    .matches(/^[0-9]{8}$/, "Дугаарын формат буруу байна!")
    .required("Заавал бөглөнө үү!"),
  utas2: yup
    .string()
    .matches(/^[0-9]{8}$/, "Дугаарын формат буруу байна!")
    .required("Заавал бөглөнө үү!"),
  registerDugaar: yup
    .string()
    .matches(/^[А-Яа-я|Үү|Өө|Ёё]{2}[0-9]{8}$/, "Регистрийн формат буруу байна!")
    .required("Заавал бөглөнө үү!"),
  harshil: yup.string().required("Заавал бөглөнө үү!"),
  huis: yup.string().required("Заавал бөглөнө үү!"),
  geriinHayag: yup.string().required("Заавал бөглөнө үү!"),
  tsusniiBuleg: yup.string().required("Заавал бөглөнө үү!"),
  tursunOgnoo: yup.string().required("Заавал бөглөнө үү!"),
  emdNo: yup.string().required("Заавал бөглөнө үү!"),
  ner: yup.string().required("Заавал бөглөнө үү!"),
  ovog: yup.string().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function PatientForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tabValue, settabValue] = React.useState<string>("patientForm");

  const [data] = React.useState({
    ovog: payload?.ovog || "",
    ner: payload?.ner || "",
    registerDugaar: payload?.registerDugaar || "",
    utas: payload?.utas || "",
    utas2: payload?.utas2 || "",
    email: payload?.email || "",
    emdNo: payload?.emdNo || "",
    harshil: payload?.harshil || "",
    huis: payload?.huis || "",
    geriinHayag: payload?.geriinHayag || "",
    tsusniiBuleg: payload?.tsusniiBuleg || "",
    avatar: payload?.avatar || null,
    tursunOgnoo: payload?.tursunOgnoo || "",
    isActive: payload?.isActive || false,
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await patientApi.update(payload._id, {
          ovog: values.ovog,
          ner: values.ner,
          registerDugaar: values.registerDugaar,
          utas: values.utas,
          utas2: values.utas2,
          email: values.email,
          emdNo: values.emdNo,
          harshil: values.harshil,
          huis: values.huis,
          geriinHayag: values.geriinHayag,
          tsusniiBuleg: values.tsusniiBuleg,
          avatar: values.avatar,
          tursunOgnoo: values.tursunOgnoo,
          isActive: values.isActive,
        });
      } else {
        await patientApi.create({
          ovog: values.ovog,
          ner: values.ner,
          registerDugaar: values.registerDugaar,
          utas: values.utas,
          utas2: values.utas2,
          email: values.email,
          emdNo: values.emdNo,
          harshil: values.harshil,
          huis: values.huis,
          geriinHayag: values.geriinHayag,
          tsusniiBuleg: values.tsusniiBuleg,
          avatar: values.avatar,
          tursunOgnoo: values.tursunOgnoo,
          isActive: values.isActive,
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
              title="Үйлчлүүлэгчийн мэдээлэл"
              description="Үйлчлүүлэгчийн үндсэн мэдээлэл."
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
              <Tabs variant="outline" value={tabValue}>
                <SegmentedControl
                  my={20}
                  w="600px"
                  size="sm"
                  onChange={(e) => settabValue(e)}
                  value={tabValue}
                  data={[
                    {
                      label: "Өвчтөний мэдээлэл",
                      value: "patientForm",
                    },
                    {
                      label: "Өвчтөний түүх",
                      value: "patientStory",
                      disabled: !payload && true,
                    },
                  ]}
                />
                <Tabs.Panel value="patientForm">
                  <Divider mb={20} />
                  <Grid>
                    <Grid.Col span={{ base: 12, xl: 6 }}>
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <ImageUpload
                            w="200px"
                            h="100px"
                            name="avatar"
                            error={errors?.avatar}
                            value={values.avatar}
                            onChange={(url) => {
                              setFieldValue("avatar", url?.url);
                            }}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} />
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
                          <DatePickerField
                            valueFormat="YYYY оны MM сарын DD өдөр"
                            name="tursunOgnoo"
                            label="Төрсөн огноо"
                            placeholder="Төрсөн огноо"
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
                            name="tsusniiBuleg"
                            label="Цусны бүлэг"
                            placeholder="Цусны бүлэг"
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextField
                            name="harshil"
                            label="Харшил"
                            placeholder="Харшил"
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextField
                            name="emdNo"
                            label="Эрүүл мэндийн даатгалын дугаар"
                            placeholder="Эрүүл мэндийн даатгалын дугаар"
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
                          <SelectField
                            required
                            name="huis"
                            label="Хүйс"
                            placeholder="Хүйс"
                            options={[
                              {
                                label: "Эрэгтэй",
                                value: "MALE",
                              },
                              { label: "Эмэгтэй", value: "FEMALE" },
                            ]}
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
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <TextField
                            type="number"
                            name="utas2"
                            label="Утас2"
                            placeholder="Утас2"
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <TextareaField
                            name="geriinHayag"
                            label="Гэрийн хаяг"
                            placeholder="Гэрийн хаяг"
                            withAsterisk
                          />
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  </Grid>
                </Tabs.Panel>

                <Tabs.Panel value="patientStory">
                  <Divider mb={20} />
                  Өвчтөний түүх...
                </Tabs.Panel>
              </Tabs>
            </PageContent>
          </>
        )}
      </Form>
    </>
  );
}

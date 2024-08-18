"use client";

import * as yup from "yup";
import React from "react";
import { DateInput } from "@mantine/dates";
import { Button, Divider, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
// import { patientApi } from "@/apis";
import { message } from "@/utils/message";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import PageContent from "@/libs/page-content/page";
import { NumberField } from "@/libs/form/number-field";
import { SelectField } from "@/libs/form/select-field";
import { TextareaField } from "@/libs/form/textarea-field";

const formSchema = yup.object({
  //??!!!!!!!!!!!!!!!
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function PatientForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      //   if (payload) {
      //     await patientApi.update(payload._id, {
      //       type: values.type,
      //       weightType: values.weightType,
      //       weightValue: values.weightValue,
      //       sealNumbers: values.sealNumbers,
      //       vehiclePlateNo: values.vehiclePlateNo,
      //       containerNumbers: values.containerNumbers,
      //       trailerPlateNumbers: values.trailerPlateNumbers,
      //     });
      //   } else {
      //     await patientApi.create({
      //       type: values.type,
      //       weightType: values.weightType,
      //       weightValue: values.weightValue,
      //       sealNumbers: values.sealNumbers,
      //       vehiclePlateNo: values.vehiclePlateNo,
      //       containerNumbers: values.containerNumbers,
      //       trailerPlateNumbers: values.trailerPlateNumbers,
      //     });
      //   }
      message.success("Таны хүсэлт амжилттай.");
      onCancel && onCancel();
    } catch (err) {
      errorParse(err);
    } finally {
      setLoading(false);
    }
  };

  const [data] = React.useState({
    //!!!!!!
    ...(payload || {}),
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={data}
        validationSchema={formSchema}
      >
        {({ values, setFieldValue }) => (
          <>
            <PageContent
              title="Үйлчлүүлэгчийн мэдээлэл"
              description="Үйлчлүүлэгчийн үндсэн мэдээлэл."
              extra={[
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
                      <DateInput
                        name="birthday"
                        label="Төрсөн огноо"
                        placeholder="Төрсөн огноо"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="registerNo"
                        label="Регистэр"
                        placeholder="Регистэр"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="lasrtName"
                        label="Овог"
                        placeholder="Овог"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="firstName"
                        label="Нэр"
                        placeholder="Нэр"
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
                      <NumberField
                        name="age"
                        label="Нас"
                        placeholder="Нас"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <SelectField
                        name="gender"
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
                      <NumberField
                        name="HealthInsuranceNumber"
                        label="Эрүүл мэндийн даатгалын дугаар"
                        placeholder="Эрүүл мэндийн даатгалын дугаар"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <NumberField
                        name="phone"
                        label="Утас"
                        placeholder="Утас"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <TextareaField
                        name="address"
                        label="Гэрийн хаяг"
                        placeholder="Гэрийн хаяг"
                        withAsterisk
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </PageContent>
          </>
        )}
      </Form>
    </>
  );
}

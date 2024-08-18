"use client";

import * as yup from "yup";
import { Button, Divider, Grid } from "@mantine/core";
import React from "react";
import { DateTimePicker } from "@mantine/dates";
import { Form } from "@/libs/form";
import { DatePickerField } from "@/libs/form/datepickerinput-field";
import { NumberField } from "@/libs/form/number-field";
import { SelectField } from "@/libs/form/select-field";
import { TextField } from "@/libs/form/text-field";
import { TextareaField } from "@/libs/form/textarea-field";
import PageContent from "@/libs/page-content/page";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";

const formSchema = yup.object({});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function AddTime({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data] = React.useState({
    //!!!!!!
    ...(payload || {}),
  });

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
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={data}
        validationSchema={formSchema}
      >
        {({ values, setFieldValue }) => (
          <>
            <Divider />
            <Grid>
              <Grid.Col span={{ base: 12 }}>
                <SelectField
                  clearable
                  searchable
                  required
                  name="tasag"
                  label="Тасаг сонгох"
                  placeholder="Тасаг сонгох"
                  options={[
                    {
                      label: "Зүрх судас",
                      value: "Зүрх судас",
                    },
                    { label: "Дотод", value: "Дотод" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <SelectField
                  clearable
                  searchable
                  required
                  name="emch"
                  label="Эмч сонгох"
                  placeholder="Эмч сонгох"
                  options={[
                    {
                      label: "Дорж",
                      value: "Дорж",
                    },
                    { label: "Дулам", value: "Дулам" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <DateTimePicker
                  locale="mn"
                  valueFormat="MM сарын DD өдөр HH:mm"
                  monthLabelFormat="YYYY / MM сар"
                  yearLabelFormat="YYYY"
                  required
                  label="Цаг сонгох"
                  placeholder="Цаг сонгох"
                />
              </Grid.Col>
            </Grid>
          </>
        )}
      </Form>
    </>
  );
}

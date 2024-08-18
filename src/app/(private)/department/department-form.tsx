"use client";

import React from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Button, Divider, Flex, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
import { departmentApi } from "@/apis";
import { message } from "@/utils/message";
import { ITasag } from "@/interface/tasag";
import { IGeneral } from "@/interface/general";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import PageContent from "@/libs/page-content/page";
import { SelectField } from "@/libs/form/select-field";
import { SwitchField } from "@/libs/form/switch-field";
import { MultiSelectField } from "@/libs/form/multi-select-field";

const formSchema = yup.object({
  ner: yup.string().required("Заавал бөглөнө үү!"),
  torol: yup.string().required("Заавал бөглөнө үү!"),
  uruuniiDugaar: yup.array().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: ITasag;
  onCancel?: (reload?: boolean) => void;
};

export default function DepartmentForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { uruus } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await departmentApi.update(payload._id, {
          ner: values.ner,
          torol: values.torol,
          isActive: values.isActive,
          uruuniiDugaar: values.uruuniiDugaar,
        });
      } else {
        await departmentApi.create({
          ner: values.ner,
          torol: values.torol,
          isActive: values.isActive,
          uruuniiDugaar: values.uruuniiDugaar,
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
    torol: payload?.torol || "",
    uruuniiDugaar: payload?.uruuniiDugaar || [],
    isActive: payload?.isActive || false,
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={data}
        validationSchema={formSchema}
      >
        {({ values }) => (
          <>
            <PageContent
              title="Тасгийн мэдээлэл"
              description="Тасгийн үндсэн мэдээлэл."
              extra={[
                <Flex justify="center" align="center" key={0} mr={15}>
                  <SwitchField name="isActive" label="Төлөв" />
                </Flex>,
                <Button
                  key={1}
                  mr={15}
                  size="sm"
                  variant="default"
                  onClick={() => onCancel && onCancel()}
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
                        name="ner"
                        label="Нэр"
                        placeholder="Нэр"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <SelectField
                        required
                        name="torol"
                        label="Төрөл"
                        placeholder="Төрөл"
                        options={[
                          {
                            label: "Амбулатор",
                            value: "Амбулатор",
                          },
                          { label: "Лаборатор", value: "Лаборатор" },
                          { label: "Дүрс оношилгоо", value: "Дүрс оношилгоо" },
                          {
                            label: "Хэвтэн эмчлүүлэх",
                            value: "Хэвтэн эмчлүүлэх",
                          },
                          { label: "Сувилахуй", value: "Сувилахуй" },
                        ]}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <MultiSelectField
                        name="uruuniiDugaar"
                        required
                        placeholder="Өрөө"
                        label="Өрөө"
                        options={(uruus || []).map((item: any) => ({
                          label: item.ner,
                          value: item._id,
                        }))}
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

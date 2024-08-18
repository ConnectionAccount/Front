"use client";

import * as yup from "yup";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Flex, Grid, Table, Button, Switch, Divider } from "@mantine/core";
import { roleApi } from "@/apis";
import { Form } from "@/libs/form";
import { IAuth } from "@/interface/auth";
import { message } from "@/utils/message";
import { IGeneral } from "@/interface/general";
import { errorParse } from "@/utils/errorParse";
import PageContent from "@/libs/page-content/page";
import { TextField } from "@/libs/form/text-field";

const formSchema = yup.object({
  name: yup.string().min(1, "Заавал бөглөнө!"),
  description: yup.string().min(1, "Заавал бөглөнө!"),
});

type IFormData = {
  _id?: string;
  name?: string;
  description?: string;
  permissions: {
    [code: string]: {
      code: string;
      isFull: boolean;
      isRead: boolean;
      isWrite: boolean;
      isRemove: boolean;
    };
  };
};

type Props = {
  payload: IFormData;
};

export default function RoleForm({ payload }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const { permissions } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );
  const { permissions: accesses } = useSelector(
    (state: { auth: IAuth }) => state.auth,
  );
  const [permission, setPermission] = useState<{
    [code: string]: {
      code: string;
      isFull: boolean;
      isRead: boolean;
      isWrite: boolean;
      isRemove: boolean;
    };
  }>(payload.permissions);

  const onChange = (checked: boolean, access: string, code: string) => {
    const perm = permission[code];
    switch (access) {
      case "read": {
        perm.isRead = checked;
        break;
      }
      case "write": {
        perm.isWrite = checked;
        break;
      }
      case "remove": {
        perm.isRemove = checked;
        break;
      }
      default: {
        perm.isFull = checked;
        perm.isRead = checked;
        perm.isWrite = checked;
        perm.isRemove = checked;
      }
    }

    if (perm.isRead && perm.isWrite && perm.isRemove) {
      perm.isFull = true;
    } else {
      perm.isFull = false;
    }

    setPermission({
      ...permission,
      [code]: perm,
    });
  };

  const onSubmit = async (values: IFormData) => {
    setLoading(true);
    try {
      if (id) {
        await roleApi.update(id as string, {
          name: values.name,
          description: values.description,
          permissionId: Object.values(permission),
        });
      } else {
        await roleApi.create({
          name: values.name,
          description: values.description,
          permissionId: Object.values(permission),
        });
      }
      message.success("Таны хүсэлт амжилттай!");
      router.push("/role");
    } catch (err: any) {
      errorParse(err);
    } finally {
      setLoading(false);
    }
  };

  const [data] = useState({
    name: payload.name || "",
    description: payload.description || "",
    permissionId: payload.permissions || undefined,
  });
  return (
    <Form
      initialValues={data}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <>
          <PageContent
            title="Хэрэглэгчийн роль дэлгэрэнгүй"
            description="Хэрэглэгчийн роль дэлгэрэнгүй"
            extra={[
              <Button
                mr={15}
                size="sm"
                key={0}
                variant="default"
                onClick={() => router.push("/role")}
              >
                Болих
              </Button>,
              <Button key={1} type="submit" size="sm" loading={loading}>
                Хадгалах
              </Button>,
            ]}
          >
            <Divider my={20} />
            <Grid>
              <Grid.Col span={4}>
                <Flex gap={10} direction="column">
                  <TextField name="name" placeholder="Нэр" label="Нэр" />
                </Flex>
              </Grid.Col>
              <Grid.Col span={4}>
                <Flex gap={10} direction="column">
                  <TextField
                    name="description"
                    placeholder="Тайлбар"
                    label="Тайлбар"
                  />
                </Flex>
              </Grid.Col>
              {(permissions || [])
                .filter(
                  (p) =>
                    accesses?.map((acc) => acc.code).indexOf(p.code) !== -1,
                )
                .map((perm, index) => {
                  accesses?.find((acc) => acc.code === perm.code) || {
                    isFull: false,
                    isRead: false,
                    isWrite: false,
                    isRemove: false,
                  };
                  return (
                    <Grid.Col span={12} key={index}>
                      <Table.ScrollContainer minWidth={500}>
                        <Table>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th style={{ width: "200px" }}>
                                Үйлдэл
                              </Table.Th>
                              <Table.Th style={{ width: "400px" }}>
                                Тайлбар
                              </Table.Th>
                              <Table.Th style={{ width: "100px" }}>
                                Full access
                              </Table.Th>
                              <Table.Th style={{ width: "100px" }}>
                                Read
                              </Table.Th>
                              <Table.Th style={{ width: "100px" }}>
                                Write
                              </Table.Th>
                              <Table.Th style={{ width: "100px" }}>
                                Remove
                              </Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {permissions.map((perm: any, index: number) => (
                              <Table.Tr key={index}>
                                <Table.Td>{perm.code}</Table.Td>
                                <Table.Td>{perm.description}</Table.Td>
                                <Table.Td>
                                  {perm.isFull ? (
                                    <Switch
                                      checked={permission[perm.code]?.isFull}
                                      onChange={(e) =>
                                        onChange(
                                          e.target.checked,
                                          "full",
                                          perm.code,
                                        )
                                      }
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </Table.Td>
                                <Table.Td>
                                  {perm.isRead ? (
                                    <Switch
                                      checked={permission[perm.code]?.isRead}
                                      onChange={(e) =>
                                        onChange(
                                          e.target.checked,
                                          "read",
                                          perm.code,
                                        )
                                      }
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </Table.Td>
                                <Table.Td>
                                  {perm.isWrite ? (
                                    <Switch
                                      checked={permission[perm.code]?.isWrite}
                                      onChange={(e) =>
                                        onChange(
                                          e.target.checked,
                                          "write",
                                          perm.code,
                                        )
                                      }
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </Table.Td>
                                <Table.Td>
                                  {perm.isRemove ? (
                                    <Switch
                                      checked={permission[perm.code]?.isRemove}
                                      onChange={(e) =>
                                        onChange(
                                          e.target.checked,
                                          "remove",
                                          perm.code,
                                        )
                                      }
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </Table.ScrollContainer>
                    </Grid.Col>
                  );
                })}
            </Grid>
          </PageContent>
        </>
      )}
    </Form>
  );
}

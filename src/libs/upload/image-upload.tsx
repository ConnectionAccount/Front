import React from "react";
import Image from "next/image";
import { IconPhotoPlus } from "@tabler/icons-react";
import { Button, FileButton, LoadingOverlay, Text, Flex } from "@mantine/core";
import { mediaApi } from "@/apis";
import { message } from "@/utils/message";

export type IFile = {
  uploading: boolean;
  file: Blob | null;
  name?: string;
  url?: string;
  size?: number;
};

type Props = {
  value?: string | undefined | null;
  onChange?: (file: IFile) => void;
  error?: string;
  label?: string;
  name?: string;
  w: string;
  h: string;
};

export function ImageUpload({ onChange, error, value, label, w, h }: Props) {
  const maxSizeInBytes = 10 * 1024 * 1024; //10mb
  const [file, setFile] = React.useState<IFile>();
  const resetRef = React.useRef<() => void>(null);
  const onFileUpload = (blob: Blob | null) => {
    if (!blob) return;

    if (blob.size > maxSizeInBytes) {
      message.error("Файлын хэмжээ 10MB байна");
      return;
    }

    (async () => {
      try {
        const form = new FormData();
        form.append("file", blob);
        const res = await mediaApi.upload(form);
        if (onChange) {
          onChange({
            file: blob,
            url: res,
            uploading: false,
            size: blob.size,
          });
        }
        setFile({
          file: blob,
          url: res,
          uploading: false,
          size: blob.size,
        });
      } catch (err) {
        message.error("Алдаа гарлаа");
      }
    })();

    setFile({
      file: blob,
      uploading: true,
    });
  };

  React.useEffect(() => {
    value &&
      setFile({
        file: null,
        url: value,
        uploading: false,
      });
  }, [value]);

  const fileUrl = file?.file ? URL?.createObjectURL(file?.file) : file?.url;

  return (
    <Flex direction="column" gap={5}>
      <Text fw={500}>{label}</Text>
      <FileButton
        resetRef={resetRef}
        onChange={onFileUpload}
        accept="image/png,image/jpeg,image/heic"
      >
        {(props) =>
          file ? (
            <Button w={w} h={h} {...props} color="white">
              {fileUrl ? (
                <Image
                  src={fileUrl}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt=""
                />
              ) : null}
              <LoadingOverlay
                visible={file.uploading}
                opacity={0.3}
                loaderProps={{ size: "sm" }}
              />
            </Button>
          ) : (
            <Button
              aria-label={label}
              variant="default"
              {...props}
              w={w}
              h={h}
              style={{
                border: "1px dashed black",
                background: "white",
              }}
            >
              <Flex direction="column" justify="center " align="center">
                <IconPhotoPlus />
                <Text size="xs" fw={550}>
                  Зураг оруулах
                </Text>
              </Flex>
            </Button>
          )
        }
      </FileButton>
    </Flex>
  );
}

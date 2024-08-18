/* eslint-disable no-return-assign */

"use client";

import React, { useEffect, useRef } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { ActionIcon, Avatar, Flex, Image, Paper } from "@mantine/core";

const ImageCarousel = ({ images }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<any>();
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length,
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx: number) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <Paper w="100%" bg="black">
      <Flex w="100%">
        <Flex
          align="center"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
          justify="space-between"
        >
          <ActionIcon
            size="xl"
            radius="xl"
            onClick={handleLeftClick}
            bg="rgba(0, 0, 0, .40)"
            ml="md"
            mb="160px"
          >
            <IconArrowLeft size="30px" />
          </ActionIcon>
          <ActionIcon
            mr="md"
            onClick={handleRightClick}
            size="xl"
            radius="xl"
            bg="rgba(0, 0, 0, .40)"
            mb="160px"
          >
            <IconArrowRight size="30px" />
          </ActionIcon>
        </Flex>

        <Image src={selectedImage} alt="Selected" />
      </Flex>
      {images && (
        <div
          style={{
            overflowX: "scroll",
            display: "flex",
            gap: 10,
            marginTop: "10px",
          }}
        >
          {images.map((image: any, idx: any) => (
            <Paper
              onClick={() => handleSelectedImageChange(idx)}
              style={{ display: "flex" }}
              w="1000px"
              bg="black"
            >
              <Avatar src={image} radius="xs" w="200px" h="150px" />
            </Paper>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default ImageCarousel;

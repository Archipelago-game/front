import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";

import type { ReactNode } from "react";

import type { SwiperOptions } from "swiper/types";

export interface CarouselItem<T extends string | number> {
  id: T;
  element: ReactNode;
}

interface Props<T extends string | number> {
  swiperProps: SwiperOptions;
  items: CarouselItem<T>[];
  onClick?: (id: T) => void;
}

export default function Carousel<T extends string | number>({
  swiperProps,
  items,
  onClick,
}: Props<T>) {
  const { spaceBetween = 16, slidesPerView = 3, ...rest } = swiperProps;
  return (
    <Box width="100%">
      <Swiper
        {...rest}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Box sx={{ cursor: "pointer" }} onClick={() => onClick?.(item.id)}>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "fill",
                }}
              >
                {item.element}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

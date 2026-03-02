import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";

import type { ReactNode } from "react";

export interface CarouselItem<T extends string | number> {
  id: T;
  element: ReactNode;
}

interface Props<T extends string | number> {
  items: CarouselItem<T>[];
  slidesToShow?: number;
  spaceBetween?: number;
  onClick?: (id: T) => void;
}

export default function Carousel<T extends string | number>({
  items,
  slidesToShow = 3,
  spaceBetween = 16,
  onClick,
}: Props<T>) {
  return (
    <Box width="100%">
      <Swiper slidesPerView={slidesToShow} spaceBetween={spaceBetween}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Box sx={{ cursor: "pointer" }} onClick={() => onClick?.(item.id)}>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
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

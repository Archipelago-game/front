import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import type { Swiper as SwiperInstance } from "swiper";
import "swiper/swiper.css";
import "swiper/css";
import "swiper/css/navigation";

import { type ReactNode, useEffect, useRef } from "react";
import type { SwiperOptions } from "swiper/types";
import { useTheme } from "@mui/material/styles";

export interface CarouselItem<T extends string | number> {
  id: T;
  element: ReactNode;
}

interface Props<T extends string | number> {
  items: CarouselItem<T>[];
  onClick?: (id: T) => void;
  value?: number | string;
  swiperOptions?: SwiperOptions;
}

export default function Carousel<T extends string | number>({
  items,
  swiperOptions,
  onClick,
  value,
}: Props<T>) {
  const { slidesPerView = 3, spaceBetween = 16, ...rest } = swiperOptions ?? {};
  const theme = useTheme();
  const swiperRef = useRef<SwiperInstance | null>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      width="100%"
      sx={{
        position: "relative",
        paddingInline: 2,
      }}
    >
      <Box
        ref={prevRef}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        ◀
      </Box>
      <Box
        ref={nextRef}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        ▶
      </Box>
      <Swiper
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        {...rest}
        style={{
          padding: "8px",
          borderRadius: "8px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2) , 0 6px 20px 0 rgba(0, 0, 0, 0.19) ",
        }}
      >
        {items.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Box
                className="carousel-card"
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  height: "auto",
                  objectFit: "fill",

                  "& .swiper-slide-active": {
                    transform: "scale(1)",
                    opacity: 1,
                    filter: "none",
                    zIndex: 2,
                  },
                }}
                onClick={() => onClick?.(item.id)}
              >
                {item.element}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

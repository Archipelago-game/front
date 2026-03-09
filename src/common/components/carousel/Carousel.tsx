import "swiper/swiper.css";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import { Navigation } from "swiper/modules";

import { type ReactNode, useEffect, useRef } from "react";
import type { SwiperOptions } from "swiper/types";

import ArrowTriangleLeft from "../img/icons/ArrowTriangleLeft.tsx";
import ArrowTriangleRight from "../img/icons/ArrowTriangleRight.tsx";

export interface CarouselItem<T extends string | number> {
  id: T;
  element: ReactNode;
}

interface Props<T extends string | number> {
  items: CarouselItem<T>[];
  onChange?: (id: T) => void;
  value?: T;
  disabled?: boolean;
  swiperOptions?: SwiperOptions;
}

export default function Carousel<T extends string | number>({
  items,
  swiperOptions,
  onChange,
  value,
  disabled = false,
}: Props<T>) {
  const { slidesPerView = 3, spaceBetween = 16, ...rest } = swiperOptions ?? {};

  const swiperRef = useRef<SwiperInstance | null>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!swiperRef.current || value === undefined) {
      return;
    }

    const index = items.findIndex((item) => item.id === value);
    console.log(index);
    if (index >= 0) {
      swiperRef.current.slideToLoop(index);
    }
  }, [value, items]);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (disabled) {
      swiperRef.current.disable();
    } else {
      swiperRef.current.enable();
    }
  }, [disabled]);

  return (
    <Box
      width="100%"
      sx={{
        position: "relative",
        paddingInline: 3,
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

          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <ArrowTriangleLeft />
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

          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <ArrowTriangleRight />
      </Box>
      <Swiper
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const activeId = items[swiper.realIndex]?.id;
          if (activeId && onChange) {
            onChange(activeId);
          }
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
                }}
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

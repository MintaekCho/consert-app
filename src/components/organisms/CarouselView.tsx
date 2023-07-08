"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1924 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
  type: "auto" | "menual";
};

export default function CarouselView({ children, type }: Props) {
  return type === "auto" ? (
    <Carousel
      infinite
      draggable={true}
      partialVisible={true}
      additionalTransfrom={-25}
      autoPlay
      responsive={responsive}
      itemClass="m-1"
      ssr={true}
      swipeable={true}
      removeArrowOnDeviceType={"mobile"}
    >
      {children}
    </Carousel>
  ) : (
    <Carousel
      infinite
      draggable={true}
      responsive={responsive}
      itemClass="m-2"
      swipeable={true}
      removeArrowOnDeviceType={"mobile"}
    >
      {children}
    </Carousel>
  );
}

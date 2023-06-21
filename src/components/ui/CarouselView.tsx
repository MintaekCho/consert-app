"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

type Props = {
  children: React.ReactNode;
  type: 'auto' | 'menual'
};

export default function CarouselView({ children, type }: Props) {
  return (
    type === 'auto' ?
    <Carousel
      infinite
      draggable
      autoPlay
      responsive={responsive}
      itemClass="m-2"
    >
      {children}
    </Carousel>
    :
    <Carousel
      infinite
      draggable
      responsive={responsive}
      itemClass="m-2"
    >
      {children}
    </Carousel>
  );
}

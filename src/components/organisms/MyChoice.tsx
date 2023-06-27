'use client'
import React from "react";
import ArtistInfiniteScroll from "../ArtistInfiniteScroll";

export default function MyChoice() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">My-Choice</h2>
      <ArtistInfiniteScroll />
    </section>
  );
}

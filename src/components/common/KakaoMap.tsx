import React from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
} from "react-kakao-maps-sdk";

export default function KakaoMap({ x, y }: { x: string; y: string }) {

  console.log(x);
  return (x && y) ? (
      <Map
        center={{ lng: Number(x), lat: Number(y) }}
        className="w-full h-[450px]"
      >
        <MapMarker position={{ lng: Number(x), lat: Number(y) }} />
        <MapTypeControl />
        <ZoomControl />
      </Map>
  ) : null;
}

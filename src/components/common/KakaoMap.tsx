import Script from "next/script";
import React from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
} from "react-kakao-maps-sdk";

export default function KakaoMap({ x, y }: { x: string; y: string }) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
  console.log(x)
  return (
    <>
      <Script src={KAKAO_SDK_URL} />
      {x && y ? (
        <Map
          center={{ lng: Number(x), lat: Number(y) }}
          className="w-full h-[450px]"
        >
          <MapMarker position={{ lng: Number(x), lat: Number(y) }} />
          <MapTypeControl />
          <ZoomControl />
        </Map>
      ) : null}
    </>
  );
}

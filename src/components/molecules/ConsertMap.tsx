"use client";
import { placeSearch } from "@/hooks/usePlaceSearch";
import React, { useEffect, useState } from "react";
import KakaoMap from "../common/KakaoMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import Title from "../atoms/Title";
import { BiCurrentLocation } from "react-icons/bi";
import Subtitle from "../atoms/Subtitle";
import SubContent from "../atoms/SubContent";

type PlaceData = {
  id: string;
  address_name: string;
  place_url: string;
  x: string;
  y: string;
};

export default function ConsertMap({ place }: { place: string }) {
  const [placeData, setPlaceData] = useState<PlaceData>();
  useEffect(() => {
    placeSearch(place).then((res) => {
      setPlaceData(res.result.documents[0]);
    });
  }, [place]);

  return (
    <div className="m-4 ">
      <div className="flex flex-col p-4 mb-4 border-b">
        <Subtitle>{place}</Subtitle>
        <SubContent>{placeData?.address_name}</SubContent>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div className="flex pl-4 pb-2 gap-4 font-bold text-sm">
          <a
            href={`https://map.kakao.com/link/to/${placeData?.id}`}
            target={"_blank"}
            className={"hover:underline"}
          >
            길찾기
          </a>
          <a
            href={`https://map.kakao.com/link/roadview/${placeData?.id}`}
            target={"_blank"}
            className={"hover:underline"}
          >
            로드뷰
          </a>
        </div>
      </div>
      {placeData ? (
        <KakaoMap x={placeData?.x as string} y={placeData?.y as string} />
      ) : (
        <div className="p-24">
          <a
            href="https://map.kakao.com/"
            target={"_blank"}
            className="text-xl font-bold flex gap-2 items-center justify-center hover:underline"
          >
            <FaMapMarkerAlt />
            <p>카카오지도에서 검색하기</p>
          </a>
        </div>
      )}
    </div>
  );
}

"use client";
import { placeSearch } from "@/hooks/usePlaceSearch";
import React, { useEffect, useState } from "react";
import KakaoMap from "../common/KakaoMap";
import { FaMapMarkerAlt } from "react-icons/fa";

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
    <div className="mt-8">
      <div className="flex items-end justify-between p-4">
        <h2 className="text-2xl font-bold">🧭 콘서트 장소</h2>
        <div className="flex gap-4 font-bold text-sm">
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
      <div className="flex items-center gap-4 mt-2">
        <p className="text-lg text-yellow-400 font-bold">{place}</p>
        <p className="text-sm text-gray-300 font-bold">
          {placeData?.address_name}
        </p>
      </div>
    </div>
  );
}

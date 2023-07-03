"use client";
import Link from "next/link";
import BookmarkIcon from "./icons/BookmarkIcon";
import { ArtistData, ConcertData } from "@/types/_type";
import { useState } from "react";
import Modal from "../common/Modal";
import { signIn } from "next-auth/react";

type CardType = ArtistData | ConcertData;
interface CardProps<T> {
  type: "artist" | "concert";
  canBook?: boolean;
  data: T;
}

const Card = ({ type, canBook = false, data }: CardProps<CardType>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleVisible = () => setModalVisible(!modalVisible);

  const cardData = (data: CardType) => {
    if (type === "artist") {
      const { _id: id, profile: img, korName, enName } = data as ArtistData;
      const title = korName || enName;
      return { id, img, title };
    }
    if (type === "concert") {
      const { _id: id, image: img, title, date, place } = data as ConcertData;
      return { id, img, title, date, place };
    }
    return null;
  };

  const { id, img, title, date, place } = cardData(data) || {};
  return (
    <>
      {modalVisible && (
        <Modal
          description="로그인이 후 이용 가능합니다."
          buttonText="로그인"
          onClick={signIn}
          setVisible={handleVisible}
        />
      )}
      <article className="max-w-[300px] relative group rounded-xl flex flex-col items-center overflow-hidden bg-white p-2 m-2 hover:scale-105 duration-300 ease-in-out">
        <Link href={`/${type === "concert" ? "consert" : type}/${id}`}>
          <div
            className="relative w-300 h-300 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              width: "250px",
              height: "250px",
            }}
          ></div>
          <p className="text-lg font-bold text-center text-black mt-2 group-hover:tracking-widest group-hover:text-red-400 duration-300 ease-in-out">
            {title}
          </p>
          <div className="text-sm text-black flex flex-col items-center text-gray-400 hover:text-gray-300 duration-300 ease-in-out">
            {type === "concert" && (
              <>
                <p>{date}</p>
                <p>{place}</p>
              </>
            )}
          </div>
        </Link>
        {/* @todo 추후 확장성을 위해 bookmarkIcon이 받는 타입을 추상화하는 게 좋을 것 같습니다. */}
        {canBook && (
          <BookmarkIcon
            artist={data as ArtistData}
            modalVisible={handleVisible}
          />
        )}
      </article>
    </>
  );
};

export default Card;

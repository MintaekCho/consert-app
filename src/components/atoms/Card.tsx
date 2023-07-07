"use client";
import Link from "next/link";
import { ArtistData, ConcertData } from "@/types/_type";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { signIn, useSession } from "next-auth/react";
import Toggle from "./Toggle";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";
import useBookmark from "@/hooks/useBookmark";

type CardType = ArtistData | ConcertData;
interface CardProps<T> {
  type: "artist" | "concert";
  canBook?: boolean;
  data: T;
}

const Card = ({ type, canBook = false, data }: CardProps<CardType>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleVisible = () => setModalVisible(!modalVisible);
  const { data: session } = useSession();
  const cardData = (data: CardType) => {
    if (type === "artist") {
      const {
        _id: id,
        profile: img,
        korName,
        enName,
        bookmark,
      } = data as ArtistData;
      const title = korName || enName;
      return { id, img, title, bookmark };
    }
    if (type === "concert") {
      const {
        _id: id,
        image: img,
        title,
        startDate,
        endDate,
        place,
      } = data as ConcertData;
      return { id, img, title, startDate, endDate, place };
    }
    return null;
  };

  const { id, img, title, startDate, endDate, place, bookmark } =
    cardData(data) || {};
  const [isBookmark, setIsBookmark] = useState(
    bookmark?.includes(session?.user.id as string)
  );
  const { setBookmark } = useBookmark();
  const handleLike = (toggled: boolean) => {
    setBookmark(
      session?.user.id as string,
      data as ArtistData,
      isBookmark as boolean
    );
    setIsBookmark(!isBookmark);
  };

  useEffect(() => {
    setIsBookmark(bookmark?.includes(session?.user.id as string));
  }, [bookmark, session?.user.id]);

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
      <article className="w-full max-w-[300px] relative group rounded-xl flex flex-col items-center overflow-hidden bg-white p-2 m-2 hover:scale-105 duration-300 ease-in-out">
        <Link
          href={`/${type === "concert" ? "consert" : type}/${id}`}
          className="w-full flex flex-col items-center"
        >
          <div
            className="relative w-300 h-300 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              width: "250px",
              height: "250px",
            }}
          ></div>
          <p className="w-full truncate text-lg font-bold text-center text-black mt-2 group-hover:tracking-widest group-hover:text-red-400 duration-300 ease-in-out">
            {title}
          </p>
          <div className="w-full text-sm flex flex-col items-center text-gray-400 hover:text-gray-300 duration-300 ease-in-out">
            {type === "concert" && (
              <>
                <p className="w-full truncate text-center">{`${startDate} ~ ${endDate}`}</p>
                <p className="w-full truncate text-center">{place}</p>
              </>
            )}
          </div>
        </Link>
        {/* @todo 추후 확장성을 위해 bookmarkIcon이 받는 타입을 추상화하는 게 좋을 것 같습니다. */}
        {canBook && (
          <div className="absolute top-4 right-[6%] p-2 z-10 text-white">
            <Toggle
              toggled={isBookmark as boolean}
              onToggle={handleLike}
              onIcon={<HeartFillIcon />}
              offIcon={<HeartIcon />}
            />
          </div>
        )}
      </article>
    </>
  );
};

export default Card;

import Image from "next/image";
interface ItemProps {
  label: string;
  img?: string;
}

const RowItem = ({ label, img }: ItemProps) => {
  return (
    <li className="flex items-center justify-between overflow-hidden">
      {label && (
        <>
          <Image
            sizes="210px"
            width={50}
            height={50}
            alt={label}
            src={
              img
                ? img
                : "https://cdnimg.melon.co.kr/resource/image/web/default/noArtist_300_160727.jpg/melon/resize/208"
            }
            className="object-cover rounded"
            style={{
              height: "50px",
            }}
          />
          <span className="m1-2">{label}</span>
        </>
      )}
    </li>
  );
};

export default RowItem;

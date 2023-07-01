import Image from "next/image";
interface ItemProps {
  label: string;
  img?: string;
}

const RowItem = ({ label, img }: ItemProps) => {
  return (
    <li className="flex items-center justify-between overflow-hidden">
      {label && img ? (
        <>
          <Image
            sizes="210px"
            width={50}
            height={50}
            alt={label}
            src={img}
            className="object-cover rounded"
            style={{
              height: "50px",
            }}
          />
          <span className="m1-2">{label}</span>
        </>
      ) : (
        <span className="m1-2 w-full text-right">{label}</span>
      )}
    </li>
  );
};

export default RowItem;

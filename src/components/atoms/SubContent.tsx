import { WrapperProps } from "@/types/_type";

const SubContent = ({ children }: WrapperProps) => {
  return <p className={`text-gray-400 text-sm md:text-base`}>{children}</p>;
};

export default SubContent;

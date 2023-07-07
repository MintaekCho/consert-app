import { WrapperProps } from "@/types/_type";

const GuideTxt = ({ children }: WrapperProps) => {
  return (
    <p className="font-bold text-gray-400 text-base md:text-md lg:text-lg xl:text-2xl">
      {children}
    </p>
  );
};

export default GuideTxt;

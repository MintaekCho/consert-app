import { WrapperProps } from "@/types/_type";

type Large = "large";
type Medium = "medium";
type SubTitleType = Large | Medium;
interface SubTitle extends WrapperProps {
  type?: SubTitleType;
}
const Subtitle = ({ children, type = "medium" }: SubTitle) => {
  const textStyle = [
    {
      id: "large",
      style: "font-extrabold text-lg mb-4 sm:text-2xl md:text-3xl",
    },
    {
      id: "medium",
      style: "font-medium text-base mb-4 sm:text-2xl sm:font-bold",
    },
  ];
  const selectedStyle = textStyle.find((style) => style.id === type);
  const className = selectedStyle ? selectedStyle.style : "";

  return (
    <h3 className={`text-left font-extrabold ${className}`}>{children}</h3>
  );
};

export default Subtitle;

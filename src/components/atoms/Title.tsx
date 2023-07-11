import { WrapperProps } from "@/types/_type";

interface Title extends WrapperProps {
  icon?: React.ReactElement;
}

const Title = ({ children, icon }: Title) => {
  return (
    <h2 className="flex items-center text-xl font-bold p-2 mb-4 text-white sm:text-2xl md:text-3xl">
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </h2>
  );
};

export default Title;

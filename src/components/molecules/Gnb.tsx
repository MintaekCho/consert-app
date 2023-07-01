import { pageList } from "@/router/pages";
import LinkItem from "../atoms/LinkItem";

const Gnb = () => {
  return (
    <ul className="flex">
      {pageList.map(({ id, href, label }, index) => {
        return (
          <LinkItem href={href} key={id}>
            {label}
          </LinkItem>
        );
      })}
    </ul>
  );
};

export default Gnb;

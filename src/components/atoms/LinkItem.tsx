import Link from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
const LinkItem = ({ href, children }: LinkProps) => {
  return (
    <li className="mr-8 text-base">
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default LinkItem;
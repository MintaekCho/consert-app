import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
const LinkItem = ({ href, children }: LinkProps) => {
  const path = usePathname();

  return (
    <li className={`mr-4 text-base px-2 py-1 hover:opacity-90 ${path === href ? 'text-red-400 text-lg' : ''} `}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default LinkItem;

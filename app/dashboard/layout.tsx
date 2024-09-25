import { IoIosSettings } from "react-icons/io";
import { FaTshirt } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/common/header";

const navigation = [
  {
    icon: <FaTshirt />,
    text: "내 디자인",
    href: "/dashboard",
  },
  {
    icon: <IoIosSettings />,
    text: "내 정보",
    href: "/dashboard/profile",
  },
];

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full overflow-hidden pt-[74px]">
      <Header />
      <nav className="flex h-full w-44 flex-col space-y-3 bg-indigo-700 px-2 py-10 shadow-lg shadow-indigo-400">
        {navigation.map((button) => (
          <Link
            className="flex items-center rounded-xl bg-indigo-700 px-4 py-2 text-lg text-primary-foreground transition hover:bg-indigo-600"
            href={button.href}
          >
            <div className="mr-3 text-2xl">{button.icon}</div>
            {button.text}
          </Link>
        ))}
      </nav>
      <div className="flex grow flex-col px-10 pt-8">
        <h1 className="text-4xl font-bold">내 디자인</h1>
        <div className="scrollbar-hide grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

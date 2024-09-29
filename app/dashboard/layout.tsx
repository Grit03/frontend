import { IoIosSettings } from "react-icons/io";
import { FaTshirt } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProfileActions } from "./_components/profile-actions";

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
    <div className="flex h-full w-full overflow-hidden">
      <nav className="flex h-full w-64 flex-col space-y-1.5 border border-indigo-100 px-2 py-6 shadow-lg">
        <ProfileActions>
          <div className="group mb-5 flex cursor-pointer gap-4 rounded-xl px-3 py-2 transition hover:bg-indigo-50">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gray-100">
              <Image
                priority
                alt="프로필 placeholder"
                src="/images/dashboard/profile-placeholder.png"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex grow flex-col justify-center leading-5">
              <div className="mt-1 font-semibold">사용자 이름</div>
              <div className="text-sm text-zinc-400">계정 아이디</div>
            </div>
          </div>
        </ProfileActions>

        {navigation.map((button) => (
          <Link key={button.text} href={button.href} className="">
            <Button
              size="xl"
              variant="design"
              className="group w-full justify-start text-base"
            >
              <div className="mr-3 text-2xl text-zinc-600 group-hover:text-indigo-500">
                {button.icon}
              </div>
              {button.text}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="flex grow flex-col px-10 pt-8">{children}</div>
    </div>
  );
}

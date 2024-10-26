import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "./_components/dashboard-sidebar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    redirect("/");
  }
  return (
    <div className="flex h-full w-full overflow-hidden">
      <DashboardSidebar accessToken={token} />
      <div className="flex grow flex-col px-10 pt-8">{children}</div>
    </div>
  );
}

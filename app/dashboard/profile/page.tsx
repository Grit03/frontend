import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <>
      <h1 className="py-2 text-4xl font-bold">내 정보</h1>
      <div className="flex h-full flex-col py-7">
        {/* 프로필 이미지 */}
        <div className="group mb-5 flex cursor-pointer gap-4 rounded-xl py-2 transition">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
            <Image
              priority
              alt="프로필 placeholder"
              src="/images/dashboard/profile-placeholder.png"
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex grow items-center gap-6 px-4">
            <Button variant="action">사진 바꾸기</Button>
            <Button variant="secondary">제거</Button>
          </div>
        </div>
        <div className="flex grow flex-col gap-6">
          {/* 사용자 이름 */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">사용자 이름</Label>
            <Input id="username" placeholder="사용자 이름" />
          </div>
          {/* 계정 이메일 */}
          <div className="mb-10 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">계정 이메일</Label>
            <Input type="email" id="email" placeholder="계정 이메일" />
          </div>
          {/* 회원정보 저장 및 탈퇴 */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex grow justify-end gap-6">
              <Button variant="action">회원정보 저장</Button>
              <Button variant="secondary">회원탈퇴</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

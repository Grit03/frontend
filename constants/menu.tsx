import React from "react";
import { IoIosSettings } from "react-icons/io";
import { FaTshirt, FaClipboardList } from "react-icons/fa";

export const navigation = [
  {
    icon: <FaTshirt />,
    text: "내 디자인",
    href: "/dashboard",
  },
  // {
  //   icon: <FaClipboardList />,
  //   text: "주문 내역",
  //   href: "/dashboard/invoice",
  // },
  {
    icon: <IoIosSettings />,
    text: "내 정보",
    href: "/dashboard/profile",
  },
];

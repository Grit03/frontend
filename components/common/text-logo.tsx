import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Shantell_Sans } from "next/font/google";
import React, { CSSProperties } from "react";

const ShantellSans = Shantell_Sans({
  subsets: ["latin"],
});

const textLogoVarints = cva("font-extrabold tracking-wide text-indigo-800", {
  variants: {
    size: {
      default: "text-2xl",
      lg: "text-4xl",
    },
    color: {
      default: "text-indigo-800",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
});

export interface TextLogoProps extends VariantProps<typeof textLogoVarints> {
  className?: string;
  style?: CSSProperties;
}

export default function TextLogo({
  size,
  color,
  className,
  style,
}: TextLogoProps) {
  return (
    <span
      className={cn(
        textLogoVarints({ size, color, className }),
        ShantellSans.className,
      )}
      style={style}
    >
      Tindy
    </span>
  );
}

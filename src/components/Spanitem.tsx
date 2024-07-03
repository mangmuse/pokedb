import { PropsWithChildren } from "react";

interface SpanItemProps {
  bold?: boolean;
  bgColor:
    | "bg-gray-300"
    | "bg-red-400"
    | "bg-green-300"
    | "bg-green-100"
    | "bg-red-100";
}

export default function SpanItem({
  children,
  bold,
  bgColor,
}: PropsWithChildren<SpanItemProps>) {
  const spanItemClass = `text-sm rounded-lg  px-2 py-[3px] p-4
  ${bgColor} ${bold && "font-semibold"}
  `;

  return <span className={spanItemClass}>{children}</span>;
}

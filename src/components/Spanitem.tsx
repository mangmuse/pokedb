import { PropsWithChildren } from "react";

interface SpanItemProps {
  bgColor: "bg-gray-300" | "bg-red-400" | "bg-green-300";
}

export default function Spanitem({
  children,
  bgColor,
}: PropsWithChildren<SpanItemProps>) {
  return (
    <span className={`text-sm rounded-lg ${bgColor} px-2 leading-5`}>
      {children}
    </span>
  );
}

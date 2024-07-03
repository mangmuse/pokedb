import { PropsWithChildren } from "react";

interface ButtonProps {
  bgColor: "bg-gray-500" | "bg-blue-500";
  isDisabled?: boolean;
}

export default function Button({
  children,
  bgColor,
  isDisabled,
}: PropsWithChildren<ButtonProps>) {
  const buttonClass = `text-white px-3 py-1 rounded-md mt-2 
  ${bgColor} ${isDisabled && "opacity-40"}`; //

  return (
    <button className={buttonClass} disabled={isDisabled}>
      {children}
    </button>
  );
}

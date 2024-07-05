import QueryProvider from "@/query/QueryProvider";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "PokeDB | 전체 포켓몬 리스트",
  description: "포켓몬 도감",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <main className="flex flex-col w-full max-w-screen-xl  h-screen mx-auto ">
        {children}
      </main>
    </QueryProvider>
  );
}

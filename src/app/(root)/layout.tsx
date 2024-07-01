import QueryProvider from "@/query/QueryProvider";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <main className="flex flex-col w-full max-w-screen-2xl  h-screen mx-auto ">
        {children}
      </main>
    </QueryProvider>
  );
}

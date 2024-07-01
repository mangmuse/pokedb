import QueryProvider from "@/query/QueryProvider";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <main>{children}</main>
    </QueryProvider>
  );
}

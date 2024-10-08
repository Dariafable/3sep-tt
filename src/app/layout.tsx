import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parcel check",
  description: "Test task",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="main">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

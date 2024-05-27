import { ThemeProvider } from "@/context/theme-provider";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { userSessionType } from "@/typings";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vegetable Flow Data Entry",
  description:
    "Data entry & Visualization for vegetables flow by different roles",
};

export default async function RootLayout({
  children,
  admin,
  procurement_team,
  sales_manager,
  salesman,
  login,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  procurement_team: React.ReactNode;
  sales_manager: React.ReactNode;
  salesman: React.ReactNode;
  login: React.ReactNode;
}>) {
  const session = await getSession<userSessionType>();

  const parallelRouteToRender = !session
    ? login
    : session.userInfo.userRole.toLowerCase() === "admin"
    ? admin
    : session.userInfo.userRole.toLowerCase() === "pt"
    ? procurement_team
    : session.userInfo.userRole.toLowerCase() === "sm"
    ? sales_manager
    : session.userInfo.userRole.toLowerCase() === "sr"
    ? salesman
    : null;

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          forcedTheme="light"
        >
          {parallelRouteToRender ?? children}
        </ThemeProvider>
      </body>
    </html>
  );
}

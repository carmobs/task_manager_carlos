import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Asegúrate de que este archivo esté correctamente importado

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`html { font-family: ${inter.style.fontFamily}; }`}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

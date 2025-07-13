import { removeAuth } from "@/lib/auth-actions";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background max-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

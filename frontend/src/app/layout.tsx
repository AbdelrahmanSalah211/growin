import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="__body"
        className="bg-background flex flex-col gap-[1.875rem] transition-[overflow]"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

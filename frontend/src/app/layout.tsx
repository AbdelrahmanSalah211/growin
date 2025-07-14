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
      <body className="bg-background">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

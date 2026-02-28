import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Canário Marketplace",
  description: "Marketplace de Canários - Direto do Criador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${quicksand.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <I18nProvider>
            <Navbar />
            <main className="flex-1 flex flex-col pt-8 pb-16">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

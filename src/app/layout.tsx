import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vivienda Chile - SERVIU | NewCooltura Informada",
  description: "Buscador de oficinas SERVIU, subsidios habitacionales, calculadora de financiamiento y proceso de postulacion en Chile",
  keywords: ["vivienda Chile", "SERVIU", "subsidios habitacionales", "postulacion vivienda", "casa propia"],
  openGraph: {
    title: "Vivienda Chile - NewCooltura Informada",
    description: "SERVIU, subsidios y financiamiento",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

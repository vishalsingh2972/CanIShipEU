import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CanIShipEU",
  description: "Voice-first regulatory research for European founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientCursor from "@/components/ClientCursor";
import WhatsAppButton from "@/components/WhatsAppButton"; // Import the WhatsApp button

// Initialize Prompt font
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Metadata with correct favicon path
export const metadata = {
  title: "Levatio",
  description: "Your premium fitness experience",
  icons: {
    icon: "/favicon.ico",
  },
};

// Full RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={prompt.className}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton /> {/* Replace with your actual phone number */}
        <ClientCursor />
      </body>
    </html>
  );
}
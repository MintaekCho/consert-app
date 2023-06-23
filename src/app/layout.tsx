import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/organisms/Header";
import AuthContext from "../context/AuthContext";
import { YoutubeApiProvider } from "@/context/YoutubeApiContext";
import ConsertApiProvider from "@/context/ConsertApiContext";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Consert-App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className} suppressHydrationWarning={true}>
      <body className="w-full  max-w-screen-2xl mx-auto overflow-auto p-4">
        <AuthContext>
          <YoutubeApiProvider>
            <ConsertApiProvider>
              <Header />
              <main>{children}</main>
            </ConsertApiProvider>
          </YoutubeApiProvider>
        </AuthContext>
      </body>
    </html>
  );
}

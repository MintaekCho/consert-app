import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import AuthContext from "../context/AuthContext";
import { YoutubeApiProvider } from "@/context/YoutubeApiContext";

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
      <body className="w-full  max-w-screen-xl mx-auto overflow-auto p-4">
        <AuthContext>
          <YoutubeApiProvider>
            <Header />
            <main>{children}</main>
          </YoutubeApiProvider>
        </AuthContext>
      </body>
    </html>
  );
}

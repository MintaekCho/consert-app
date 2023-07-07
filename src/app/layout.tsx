import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/organisms/Header";
import AuthContext from "../context/AuthContext";
import { YoutubeApiProvider } from "@/context/YoutubeApiContext";
import ConsertApiProvider from "@/context/ConsertApiContext";
import Footer from "@/components/organisms/Footer";
import Script from "next/script";

const sans = Open_Sans({ subsets: ["latin"] });

const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;

export const metadata = {
  title: "CONCON",
  description: "내가 좋아하는 가수의 콘서트, 앨범, 관련 유튜브 영상을 한눈에 볼 수 있는 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className} suppressHydrationWarning={true}>
      <Script src={KAKAO_SDK_URL} />
      <body className="w-full min-w-[320px] max-w-screen-2xl mx-auto overflow-auto p-4">
        <AuthContext>
          <YoutubeApiProvider>
            <ConsertApiProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ConsertApiProvider>
          </YoutubeApiProvider>
        </AuthContext>
      </body>
    </html>
  );
}

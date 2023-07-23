import CommingConcert from "@/components/organisms/CommingConcert";
import HotRank from "@/components/organisms/HotRank";
import MainBanner from "@/components/organisms/MainBanner";
import MyChoice from "@/components/organisms/MyChoice";

export default async function Home() {
  const API_URL = "https://consert-app.vercel.app";

  const rankRes = await fetch(
    `https://consert-app.vercel.app/api/consert/rank`,
    {
      cache: "no-cache",
    }
  );
  const commingRes = await fetch(`${API_URL}/api/consert/come`, {
    cache: "no-cache",
  });

  const rank = await rankRes.json();
  const comming = await commingRes.json();

  return (
    <section className="flex flex-col p-6">
      <MainBanner />
      <HotRank data={rank} />
      <CommingConcert data={comming} />
      <MyChoice />
    </section>
  );
}

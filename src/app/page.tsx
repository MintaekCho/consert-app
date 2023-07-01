import HotRank from "@/components/organisms/HotRank";
import MainBanner from "@/components/organisms/MainBanner";
import MyChoice from "@/components/organisms/MyChoice";

export default function Home() {
  return (
    <section className="flex flex-col p-6">
      <MainBanner />
      <HotRank />
      <MyChoice />
    </section>
  );
}

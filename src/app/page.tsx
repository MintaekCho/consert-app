import HotRank from "@/components/organisms/HotRank";
import MyChoice from "@/components/organisms/MyChoice";

export default function Home() {
  return (
    <section className="flex flex-col">
      <HotRank />
      <MyChoice />
    </section>
  );
}

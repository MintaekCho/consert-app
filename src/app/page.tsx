import ArtistCart from '@/components/ArtistCard'
import HotRank from '@/components/HotRank'
import MyChoice from '@/components/MyChoice'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex flex-col">
      <HotRank />
      <MyChoice />
    </section>
  )
}

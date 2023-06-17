import ArtistCart from '@/components/ArtistCart'
import MyChoice from '@/components/MyChoice'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex flex-col">
      <MyChoice />
      <ArtistCart />
    </section>
  )
}

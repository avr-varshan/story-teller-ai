import Image from "next/image";
import Logo from '../images/Wizard Hat.png'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoryWriter from "@/components/StoryWriter";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
    <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-purple-500 flex flex-col space-y-5 justify-center items-center lg:pb-10 order-1 lg:-order-1">
        <Image src={Logo} height={250} alt="logo" />

        <Button className="px-20 bg-purple-700 p-10 text-xl text-white">
          <Link href="/stories">Explore Story Library</Link>
        </Button>
      </div>
      <StoryWriter />
    </section>
  </main>
  );
}


import Features from "@/components/Features";
import Hero from "@/components/hero";
import Team from "@/components/Team";
import Image from "next/image";
import logo from "@/public/logo.png";
export default async function Home() {
  return (
    <>
      <main className="flex-1 py-24 px-48">
        <Hero />
        <Features />
        <Team />
      </main>
    </>
  );
}

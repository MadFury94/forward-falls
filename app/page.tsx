import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionAndFocus from "@/components/Mission";
import Programs from "@/components/Programs";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <MissionAndFocus />
      <Programs />
      <Team />
      <Partners />
      <Footer />
    </main>
  );
}

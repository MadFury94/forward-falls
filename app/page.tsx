import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import AdoptionsSection from "@/components/AdoptionsSection";
import Programs from "@/components/Programs";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import NewsTicker from "@/components/NewsTicker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <AdoptionsSection />
      <Programs />
      <NewsTicker />
      <Team />
      <Partners />
      <Footer />
    </main>
  );
}

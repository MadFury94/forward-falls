import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditableSection from "@/components/admin/EditableSection";
import { Hero, AboutSection, AdoptionsSection, Programs, Team, Partners, PhotoMosaic, BlogSection } from "@/components/HomeSections";

export const revalidate = 0;
import {
  heroDefaults,
  aboutDefaults,
  visionMissionDefaults,
  programsDefaults,
  partnersDefaults,
} from "@/content/defaults/homepage";

const WP_URL = process.env.WORDPRESS_SITE_URL || '';

function pick<T>(wpVal: T | null | undefined, def: T): T {
  if (wpVal === null || wpVal === undefined || wpVal === '' || wpVal === false || (Array.isArray(wpVal) && (wpVal as unknown[]).length === 0)) return def;
  return wpVal;
}

async function getHomepageContent() {
  try {
    const res = await fetch(`${WP_URL}/wp-json/ffi/v1/homepage`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.acf || Array.isArray(data.acf)) return null;
    return data.acf;
  } catch {
    return null;
  }
}

export default async function Home() {
  const acf = await getHomepageContent() || {};

  // ── Hero ──
  const wpSlides = acf.hero_slides as Array<Record<string, string>> | null;
  const heroContent = {
    slides: wpSlides && wpSlides.length > 0
      ? wpSlides.map((s: Record<string, string>, i: number) => ({
        image: pick(s.slide_image, heroDefaults.slides[i]?.image ?? heroDefaults.slides[0].image),
        title: pick(s.slide_title, heroDefaults.slides[i]?.title ?? ''),
        description: pick(s.slide_description, heroDefaults.slides[i]?.description ?? ''),
        button_text: pick(s.slide_button_text, heroDefaults.slides[i]?.button_text ?? 'DONATE NOW'),
        button_link: pick(s.slide_button_link, heroDefaults.slides[i]?.button_link ?? '/donate'),
      }))
      : heroDefaults.slides,
  };

  // ── About ──
  const wpParas = acf.about_paragraphs as Array<{ paragraph: string }> | null;
  const aboutContent = {
    eyebrow: pick(acf.about_eyebrow as string, aboutDefaults.eyebrow),
    heading: pick(acf.about_heading as string, aboutDefaults.heading),
    paragraphs: wpParas && wpParas.length > 0 ? wpParas.map((p) => p.paragraph) : aboutDefaults.paragraphs,
    stat_number: pick(acf.about_stat_number as number, aboutDefaults.stat_number),
    stat_label: pick(acf.about_stat_label as string, aboutDefaults.stat_label),
    image: pick(acf.about_image as string, aboutDefaults.image),
  };

  // ── Vision & Mission ──
  const wpPillars = acf.sdg_pillars as Array<Record<string, string>> | null;
  const vmContent = {
    eyebrow: pick(acf.vm_eyebrow as string, visionMissionDefaults.eyebrow),
    heading: pick(acf.vm_heading as string, visionMissionDefaults.heading),
    intro: pick(acf.vm_intro as string, visionMissionDefaults.intro),
    vision_text: pick(acf.vision_text as string, visionMissionDefaults.vision_text),
    mission_text: pick(acf.mission_text as string, visionMissionDefaults.mission_text),
    sdg_pillars: wpPillars && wpPillars.length > 0
      ? wpPillars.map((p, i) => ({
        category: pick(p.pillar_category, visionMissionDefaults.sdg_pillars[i]?.category ?? ''),
        title: pick(p.pillar_title, visionMissionDefaults.sdg_pillars[i]?.title ?? ''),
        description: pick(p.pillar_description, visionMissionDefaults.sdg_pillars[i]?.description ?? ''),
        image: pick(p.pillar_image, visionMissionDefaults.sdg_pillars[i]?.image ?? ''),
        link: pick(p.pillar_link, visionMissionDefaults.sdg_pillars[i]?.link ?? '#'),
      }))
      : visionMissionDefaults.sdg_pillars,
  };

  // ── Programs ──
  const wpStats = acf.programs_stats as Array<{ stat_value: number; stat_label: string }> | null;
  const wpBars = acf.programs_progress_bars as Array<{ bar_label: string; bar_percent: number; bar_color: string }> | null;
  const wpInitiatives = acf.programs_initiatives as Array<{ initiative_title: string; initiative_description: string; initiative_badge: string }> | null;
  const programsContent = {
    eyebrow: pick(acf.programs_eyebrow as string, programsDefaults.eyebrow),
    heading: pick(acf.programs_heading as string, programsDefaults.heading),
    description: pick(acf.programs_description as string, programsDefaults.description),
    stats: wpStats && wpStats.length > 0
      ? wpStats.map((s, i) => ({ value: pick(s.stat_value, programsDefaults.stats[i]?.value ?? 0), label: pick(s.stat_label, programsDefaults.stats[i]?.label ?? '') }))
      : programsDefaults.stats,
    progress_bars: wpBars && wpBars.length > 0
      ? wpBars.map((b, i) => ({ label: pick(b.bar_label, programsDefaults.progress_bars[i]?.label ?? ''), percent: pick(b.bar_percent, programsDefaults.progress_bars[i]?.percent ?? 0), color: pick(b.bar_color, programsDefaults.progress_bars[i]?.color ?? '#00baa3') }))
      : programsDefaults.progress_bars,
    initiatives: wpInitiatives && wpInitiatives.length > 0
      ? wpInitiatives.map((item, i) => ({ title: pick(item.initiative_title, programsDefaults.initiatives[i]?.title ?? ''), description: pick(item.initiative_description, programsDefaults.initiatives[i]?.description ?? ''), badge: pick(item.initiative_badge, programsDefaults.initiatives[i]?.badge ?? '') }))
      : programsDefaults.initiatives,
  };

  // ── Partners ──
  const wpPartners = acf.partners as Array<{ partner_name: string }> | null;
  const partnersContent = {
    partners: wpPartners && wpPartners.length > 0 ? wpPartners.map((p) => p.partner_name) : partnersDefaults.partners,
  };

  return (
    <main className="min-h-screen">
      <Header />
      <EditableSection label="Hero" href="/admin-dashboard/pages/homepage#hero">
        <Hero content={heroContent} />
      </EditableSection>
      <EditableSection label="About" href="/admin-dashboard/pages/homepage#about">
        <AboutSection content={aboutContent} />
      </EditableSection>
      <EditableSection label="Vision & Mission" href="/admin-dashboard/pages/homepage#vision">
        <AdoptionsSection content={vmContent} />
      </EditableSection>
      <EditableSection label="Programs" href="/admin-dashboard/pages/homepage#programs">
        <Programs content={programsContent} />
      </EditableSection>
      <EditableSection label="Team" href="/admin-dashboard/team">
        <Team />
      </EditableSection>
      <EditableSection label="Partners" href="/admin-dashboard/pages/homepage#partners">
        <Partners content={partnersContent} />
      </EditableSection>
      <PhotoMosaic />
      <EditableSection label="Blog Posts" href="/admin-dashboard/posts">
        <BlogSection />
      </EditableSection>
      <Footer />
    </main>
  );
}

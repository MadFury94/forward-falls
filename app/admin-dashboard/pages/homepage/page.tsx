"use client";

import React, { useEffect, useState, useCallback } from 'react';// Token is stored in localStorage under 'wp_token'
function getToken(): string { return typeof window !== 'undefined' ? localStorage.getItem('wp_token') || '' : ''; }
import { heroDefaults, aboutDefaults, visionMissionDefaults, programsDefaults, partnersDefaults } from '@/content/defaults/homepage';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink, Loader2 } from 'lucide-react';
import { revalidatePages } from '@/lib/revalidate';
import MediaPickerModal from '@/components/editor/MediaPickerModal';

// ── Types ──────────────────────────────────────────────────────────────────
type HeroSlide = { image: string; title: string; description: string; button_text: string; button_link: string };
type SdgPillar = { category: string; title: string; description: string; image: string; link: string };
type ProgressBar = { label: string; percent: number; color: string };
type Initiative = { title: string; description: string; badge: string };

interface HomepageState {
    hero_slides: HeroSlide[];
    about_eyebrow: string;
    about_heading: string;
    about_paragraphs: string[];
    about_stat_number: number;
    about_stat_label: string;
    about_image: string;
    vm_eyebrow: string;
    vm_heading: string;
    vm_intro: string;
    vision_text: string;
    mission_text: string;
    sdg_pillars: SdgPillar[];
    programs_eyebrow: string;
    programs_heading: string;
    programs_description: string;
    programs_stats: Array<{ value: number; label: string }>;
    programs_progress_bars: ProgressBar[];
    programs_initiatives: Initiative[];
    partners: string[];
}

// ── Helpers ────────────────────────────────────────────────────────────────
const Section = ({ title, children, defaultOpen = false, id }: { title: string; children: React.ReactNode; defaultOpen?: boolean; id?: string }) => {
    const [open, setOpen] = useState(defaultOpen);

    // Auto-open if URL hash matches this section
    useEffect(() => {
        if (id && typeof window !== 'undefined' && window.location.hash === `#${id}`) {
            setOpen(true);
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    }, [id]);

    return (
        <div id={id} className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="font-semibold text-gray-800">{title}</span>
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open && <div className="p-6 space-y-4">{children}</div>}
        </div>
    );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
        {children}
    </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/30 ${props.className || ''}`} />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} rows={3} className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/30 resize-y ${props.className || ''}`} />
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function HomepageEditor() {
    const [state, setState] = useState<HomepageState>({
        hero_slides: heroDefaults.slides,
        about_eyebrow: aboutDefaults.eyebrow,
        about_heading: aboutDefaults.heading,
        about_paragraphs: aboutDefaults.paragraphs,
        about_stat_number: aboutDefaults.stat_number,
        about_stat_label: aboutDefaults.stat_label,
        about_image: aboutDefaults.image,
        vm_eyebrow: visionMissionDefaults.eyebrow,
        vm_heading: visionMissionDefaults.heading,
        vm_intro: visionMissionDefaults.intro,
        vision_text: visionMissionDefaults.vision_text,
        mission_text: visionMissionDefaults.mission_text,
        sdg_pillars: visionMissionDefaults.sdg_pillars,
        programs_eyebrow: programsDefaults.eyebrow,
        programs_heading: programsDefaults.heading,
        programs_description: programsDefaults.description,
        programs_stats: programsDefaults.stats,
        programs_progress_bars: programsDefaults.progress_bars,
        programs_initiatives: programsDefaults.initiatives,
        partners: partnersDefaults.partners,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
    const [mediaPicker, setMediaPicker] = useState<{ field: string; index?: number } | null>(null);

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Load current WP values and merge with defaults
    useEffect(() => {
        fetch('/api/page-content')
            .then(r => r.json())
            .then(data => {
                if (data.success && data.content) {
                    const c = data.content;
                    setState({
                        hero_slides: c.hero.slides,
                        about_eyebrow: c.about.eyebrow,
                        about_heading: c.about.heading,
                        about_paragraphs: c.about.paragraphs,
                        about_stat_number: c.about.stat_number,
                        about_stat_label: c.about.stat_label,
                        about_image: c.about.image,
                        vm_eyebrow: c.visionMission.eyebrow,
                        vm_heading: c.visionMission.heading,
                        vm_intro: c.visionMission.intro,
                        vision_text: c.visionMission.vision_text,
                        mission_text: c.visionMission.mission_text,
                        sdg_pillars: c.visionMission.sdg_pillars,
                        programs_eyebrow: c.programs.eyebrow,
                        programs_heading: c.programs.heading,
                        programs_description: c.programs.description,
                        programs_stats: c.programs.stats,
                        programs_progress_bars: c.programs.progress_bars,
                        programs_initiatives: c.programs.initiatives,
                        partners: c.partners.partners,
                    });
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const set = useCallback(<K extends keyof HomepageState>(key: K, value: HomepageState[K]) => {
        setState(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSave = async () => {
        const token = getToken();
        if (!token) { showToast('Not authenticated', 'error'); return; }
        setSaving(true);

        // Build ACF-compatible payload
        const fields: Record<string, unknown> = {
            about_eyebrow: state.about_eyebrow,
            about_heading: state.about_heading,
            about_stat_number: state.about_stat_number,
            about_stat_label: state.about_stat_label,
            about_image: state.about_image,
            vm_eyebrow: state.vm_eyebrow,
            vm_heading: state.vm_heading,
            vm_intro: state.vm_intro,
            vision_text: state.vision_text,
            mission_text: state.mission_text,
            programs_eyebrow: state.programs_eyebrow,
            programs_heading: state.programs_heading,
            programs_description: state.programs_description,
            // Repeaters
            hero_slides: state.hero_slides.map(s => ({
                slide_image: s.image,
                slide_title: s.title,
                slide_description: s.description,
                slide_button_text: s.button_text,
                slide_button_link: s.button_link,
            })),
            about_paragraphs: state.about_paragraphs.map(p => ({ paragraph: p })),
            sdg_pillars: state.sdg_pillars.map(p => ({
                pillar_category: p.category,
                pillar_title: p.title,
                pillar_description: p.description,
                pillar_image: p.image,
                pillar_link: p.link,
            })),
            programs_stats: state.programs_stats.map(s => ({ stat_value: s.value, stat_label: s.label })),
            programs_progress_bars: state.programs_progress_bars.map(b => ({ bar_label: b.label, bar_percent: b.percent, bar_color: b.color })),
            programs_initiatives: state.programs_initiatives.map(i => ({ initiative_title: i.title, initiative_description: i.description, initiative_badge: i.badge })),
            partners: state.partners.map(p => ({ partner_name: p })),
        };

        try {
            const res = await fetch('/api/page-content', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-wp-token': token },
                body: JSON.stringify(fields),
            });
            const data = await res.json();
            if (data.success) {
                showToast('Homepage saved successfully', 'success');
                await revalidatePages({ paths: ['/'], tags: ['homepage'] });
            } else showToast(data.error || 'Save failed', 'error');
        } catch {
            showToast('Network error', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-primary-green" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Homepage Editor</h1>
                    <p className="text-sm text-gray-500 mt-1">Changes override hardcoded defaults. Leave blank to use defaults.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        <ExternalLink size={15} /> Preview
                    </a>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-primary-green text-white rounded-lg text-sm font-semibold hover:bg-primary-green/90 transition-colors disabled:opacity-60"
                    >
                        {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type === 'success' ? 'bg-primary-green' : 'bg-red-500'}`}>
                    {toast.msg}
                </div>
            )}

            {/* ── Hero Section ── */}
            <Section title="Hero Slides" defaultOpen id="hero">
                {state.hero_slides.map((slide, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 relative">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600">Slide {i + 1}</span>
                            {state.hero_slides.length > 1 && (
                                <button onClick={() => set('hero_slides', state.hero_slides.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                        <Field label="Background Image">
                            <div className="flex gap-2">
                                <Input value={slide.image} onChange={e => { const s = [...state.hero_slides]; s[i] = { ...s[i], image: e.target.value }; set('hero_slides', s); }} placeholder="/slide1.jpg or https://..." />
                                <button onClick={() => setMediaPicker({ field: 'hero_slide_image', index: i })} className="px-3 py-2 border border-gray-200 rounded-lg text-xs hover:bg-gray-50 whitespace-nowrap">Pick</button>
                            </div>
                            {slide.image && <img src={slide.image} alt="" className="mt-2 h-20 w-auto rounded object-cover" />}
                        </Field>
                        <Field label="Title (use \\n for line break)">
                            <Input value={slide.title} onChange={e => { const s = [...state.hero_slides]; s[i] = { ...s[i], title: e.target.value }; set('hero_slides', s); }} />
                        </Field>
                        <Field label="Description">
                            <Input value={slide.description} onChange={e => { const s = [...state.hero_slides]; s[i] = { ...s[i], description: e.target.value }; set('hero_slides', s); }} />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Button Text">
                                <Input value={slide.button_text} onChange={e => { const s = [...state.hero_slides]; s[i] = { ...s[i], button_text: e.target.value }; set('hero_slides', s); }} />
                            </Field>
                            <Field label="Button Link">
                                <Input value={slide.button_link} onChange={e => { const s = [...state.hero_slides]; s[i] = { ...s[i], button_link: e.target.value }; set('hero_slides', s); }} />
                            </Field>
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => set('hero_slides', [...state.hero_slides, { image: '', title: '', description: '', button_text: 'DONATE NOW', button_link: '/donate' }])}
                    className="flex items-center gap-2 text-sm text-primary-green hover:underline"
                >
                    <Plus size={15} /> Add Slide
                </button>
            </Section>

            {/* ── About Section ── */}
            <Section title="About Section" id="about">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Eyebrow Text"><Input value={state.about_eyebrow} onChange={e => set('about_eyebrow', e.target.value)} /></Field>
                    <Field label="Stat Number"><Input type="number" value={state.about_stat_number} onChange={e => set('about_stat_number', Number(e.target.value))} /></Field>
                </div>
                <Field label="Heading (use \\n for line break)"><Input value={state.about_heading} onChange={e => set('about_heading', e.target.value)} /></Field>
                <Field label="Stat Label"><Input value={state.about_stat_label} onChange={e => set('about_stat_label', e.target.value)} /></Field>
                <Field label="Section Image">
                    <div className="flex gap-2">
                        <Input value={state.about_image} onChange={e => set('about_image', e.target.value)} placeholder="/about.jpg or https://..." />
                        <button onClick={() => setMediaPicker({ field: 'about_image' })} className="px-3 py-2 border border-gray-200 rounded-lg text-xs hover:bg-gray-50 whitespace-nowrap">Pick</button>
                    </div>
                    {state.about_image && <img src={state.about_image} alt="" className="mt-2 h-20 w-auto rounded object-cover" />}
                </Field>
                <Field label="Paragraphs">
                    {state.about_paragraphs.map((p, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <Textarea value={p} onChange={e => { const arr = [...state.about_paragraphs]; arr[i] = e.target.value; set('about_paragraphs', arr); }} rows={2} />
                            {state.about_paragraphs.length > 1 && (
                                <button onClick={() => set('about_paragraphs', state.about_paragraphs.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 self-start mt-1"><Trash2 size={15} /></button>
                            )}
                        </div>
                    ))}
                    <button onClick={() => set('about_paragraphs', [...state.about_paragraphs, ''])} className="flex items-center gap-2 text-sm text-primary-green hover:underline mt-1">
                        <Plus size={15} /> Add Paragraph
                    </button>
                </Field>
            </Section>

            {/* ── Vision & Mission ── */}
            <Section title="Vision & Mission / SDG Pillars" id="vision">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Eyebrow"><Input value={state.vm_eyebrow} onChange={e => set('vm_eyebrow', e.target.value)} /></Field>
                    <Field label="Heading (\\n for line break)"><Input value={state.vm_heading} onChange={e => set('vm_heading', e.target.value)} /></Field>
                </div>
                <Field label="Intro Text"><Textarea value={state.vm_intro} onChange={e => set('vm_intro', e.target.value)} /></Field>
                <Field label="Vision Text"><Textarea value={state.vision_text} onChange={e => set('vision_text', e.target.value)} /></Field>
                <Field label="Mission Text"><Textarea value={state.mission_text} onChange={e => set('mission_text', e.target.value)} /></Field>
                <div className="mt-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SDG Pillars</label>
                    {state.sdg_pillars.map((pillar, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-4 mb-3 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-600">Pillar {i + 1}</span>
                                {state.sdg_pillars.length > 1 && (
                                    <button onClick={() => set('sdg_pillars', state.sdg_pillars.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Category (e.g. SDG 4)"><Input value={pillar.category} onChange={e => { const arr = [...state.sdg_pillars]; arr[i] = { ...arr[i], category: e.target.value }; set('sdg_pillars', arr); }} /></Field>
                                <Field label="Title"><Input value={pillar.title} onChange={e => { const arr = [...state.sdg_pillars]; arr[i] = { ...arr[i], title: e.target.value }; set('sdg_pillars', arr); }} /></Field>
                            </div>
                            <Field label="Description"><Input value={pillar.description} onChange={e => { const arr = [...state.sdg_pillars]; arr[i] = { ...arr[i], description: e.target.value }; set('sdg_pillars', arr); }} /></Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Image URL">
                                    <div className="flex gap-2">
                                        <Input value={pillar.image} onChange={e => { const arr = [...state.sdg_pillars]; arr[i] = { ...arr[i], image: e.target.value }; set('sdg_pillars', arr); }} />
                                        <button onClick={() => setMediaPicker({ field: 'sdg_pillar_image', index: i })} className="px-3 py-2 border border-gray-200 rounded-lg text-xs hover:bg-gray-50 whitespace-nowrap">Pick</button>
                                    </div>
                                </Field>
                                <Field label="Link"><Input value={pillar.link} onChange={e => { const arr = [...state.sdg_pillars]; arr[i] = { ...arr[i], link: e.target.value }; set('sdg_pillars', arr); }} /></Field>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => set('sdg_pillars', [...state.sdg_pillars, { category: '', title: '', description: '', image: '', link: '#' }])} className="flex items-center gap-2 text-sm text-primary-green hover:underline">
                        <Plus size={15} /> Add Pillar
                    </button>
                </div>
            </Section>

            {/* ── Programs ── */}
            <Section title="Programs Section" id="programs">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Eyebrow"><Input value={state.programs_eyebrow} onChange={e => set('programs_eyebrow', e.target.value)} /></Field>
                    <Field label="Heading"><Input value={state.programs_heading} onChange={e => set('programs_heading', e.target.value)} /></Field>
                </div>
                <Field label="Description"><Textarea value={state.programs_description} onChange={e => set('programs_description', e.target.value)} /></Field>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Stats</label>
                    {state.programs_stats.map((stat, i) => (
                        <div key={i} className="flex gap-3 mb-2 items-center">
                            <Input type="number" value={stat.value} onChange={e => { const arr = [...state.programs_stats]; arr[i] = { ...arr[i], value: Number(e.target.value) }; set('programs_stats', arr); }} className="w-28" />
                            <Input value={stat.label} onChange={e => { const arr = [...state.programs_stats]; arr[i] = { ...arr[i], label: e.target.value }; set('programs_stats', arr); }} placeholder="Label" />
                            {state.programs_stats.length > 1 && <button onClick={() => set('programs_stats', state.programs_stats.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>}
                        </div>
                    ))}
                    <button onClick={() => set('programs_stats', [...state.programs_stats, { value: 0, label: '' }])} className="flex items-center gap-2 text-sm text-primary-green hover:underline mt-1"><Plus size={15} /> Add Stat</button>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Progress Bars</label>
                    {state.programs_progress_bars.map((bar, i) => (
                        <div key={i} className="flex gap-3 mb-2 items-center">
                            <Input value={bar.label} onChange={e => { const arr = [...state.programs_progress_bars]; arr[i] = { ...arr[i], label: e.target.value }; set('programs_progress_bars', arr); }} placeholder="Label" />
                            <Input type="number" value={bar.percent} min={0} max={100} onChange={e => { const arr = [...state.programs_progress_bars]; arr[i] = { ...arr[i], percent: Number(e.target.value) }; set('programs_progress_bars', arr); }} className="w-20" />
                            <input type="color" value={bar.color} onChange={e => { const arr = [...state.programs_progress_bars]; arr[i] = { ...arr[i], color: e.target.value }; set('programs_progress_bars', arr); }} className="w-10 h-9 rounded border border-gray-200 cursor-pointer" />
                            {state.programs_progress_bars.length > 1 && <button onClick={() => set('programs_progress_bars', state.programs_progress_bars.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>}
                        </div>
                    ))}
                    <button onClick={() => set('programs_progress_bars', [...state.programs_progress_bars, { label: '', percent: 50, color: '#00baa3' }])} className="flex items-center gap-2 text-sm text-primary-green hover:underline mt-1"><Plus size={15} /> Add Bar</button>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Other Initiatives</label>
                    {state.programs_initiatives.map((item, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-4 mb-3 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-600">Initiative {i + 1}</span>
                                {state.programs_initiatives.length > 1 && <button onClick={() => set('programs_initiatives', state.programs_initiatives.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Title"><Input value={item.title} onChange={e => { const arr = [...state.programs_initiatives]; arr[i] = { ...arr[i], title: e.target.value }; set('programs_initiatives', arr); }} /></Field>
                                <Field label="Badge (optional)"><Input value={item.badge} onChange={e => { const arr = [...state.programs_initiatives]; arr[i] = { ...arr[i], badge: e.target.value }; set('programs_initiatives', arr); }} placeholder="e.g. COMING 2027" /></Field>
                            </div>
                            <Field label="Description"><Textarea value={item.description} onChange={e => { const arr = [...state.programs_initiatives]; arr[i] = { ...arr[i], description: e.target.value }; set('programs_initiatives', arr); }} rows={2} /></Field>
                        </div>
                    ))}
                    <button onClick={() => set('programs_initiatives', [...state.programs_initiatives, { title: '', description: '', badge: '' }])} className="flex items-center gap-2 text-sm text-primary-green hover:underline"><Plus size={15} /> Add Initiative</button>
                </div>
            </Section>

            {/* ── Partners ── */}
            <Section title="Partners" id="partners">
                {state.partners.map((p, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <Input value={p} onChange={e => { const arr = [...state.partners]; arr[i] = e.target.value; set('partners', arr); }} placeholder="Partner name" />
                        {state.partners.length > 1 && <button onClick={() => set('partners', state.partners.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>}
                    </div>
                ))}
                <button onClick={() => set('partners', [...state.partners, ''])} className="flex items-center gap-2 text-sm text-primary-green hover:underline mt-1"><Plus size={15} /> Add Partner</button>
            </Section>

            {/* Bottom save */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-green text-white rounded-xl font-semibold hover:bg-primary-green/90 transition-colors disabled:opacity-60"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {/* Media Picker Modal */}
            {mediaPicker && (
                <MediaPickerModal
                    token={getToken()}
                    onSelect={(item) => {
                        const url = item.source_url;
                        if (mediaPicker.field === 'about_image') set('about_image', url);
                        else if (mediaPicker.field === 'hero_slide_image' && mediaPicker.index !== undefined) {
                            const s = [...state.hero_slides]; s[mediaPicker.index] = { ...s[mediaPicker.index], image: url }; set('hero_slides', s);
                        } else if (mediaPicker.field === 'sdg_pillar_image' && mediaPicker.index !== undefined) {
                            const arr = [...state.sdg_pillars]; arr[mediaPicker.index] = { ...arr[mediaPicker.index], image: url }; set('sdg_pillars', arr);
                        }
                        setMediaPicker(null);
                    }}
                    onClose={() => setMediaPicker(null)}
                />
            )}
        </div>
    );
}

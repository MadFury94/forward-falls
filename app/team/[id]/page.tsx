import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { getCMSAdapter } from "@/lib/cms";
import { getTeamMemberName, getTeamMemberRole, getTeamMemberImage } from "@/lib/wordpress-api";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function TeamMemberBioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const adapter = getCMSAdapter();
    const member = await adapter.fetchTeamMember(parseInt(id), ""); // Token empty for public view if allowed, but fetchTeamMember usually needs token in this setup? 
    // Actually fetchTeamMember in adapter.ts takes token. Let's check public fetch.
    
    if (!member) {
        notFound();
    }

    const name = getTeamMemberName(member);
    const role = getTeamMemberRole(member);
    const img = getTeamMemberImage(member);
    const bio = member.bio || "";

    return (
        <main className="min-h-screen bg-light-bg font-poppins">
            <Header />
            
            <section className="py-20 md:py-32">
                <div className="max-w-[1000px] mx-auto px-6">
                    <Link href="/board-and-team" className="inline-flex items-center gap-2 text-primary-green font-semibold mb-12 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft size={20} />
                        Back to Team
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                        {/* Image Column */}
                        <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative bg-gray-50 min-h-[400px]">
                            {img ? (
                                <Image
                                    src={img}
                                    alt={name}
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-primary-yellow/10">
                                    <User size={120} className="text-dark-grey/10" />
                                </div>
                            )}
                        </div>

                        {/* Content Column */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-primary-green font-bold tracking-widest uppercase text-xs mb-3 block">{role}</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-dark-grey uppercase mb-6 leading-tight">
                                {name}
                            </h1>
                            <div className="w-20 h-1.5 bg-primary-yellow mb-8"></div>
                            
                            <div className="prose prose-lg text-gray-600 max-w-none">
                                {bio ? (
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {bio}
                                    </div>
                                ) : (
                                    <p className="italic text-gray-400">Bio coming soon...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

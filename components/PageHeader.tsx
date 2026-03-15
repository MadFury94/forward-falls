"use client";

interface PageHeaderProps {
    label?: string;
    title: string;
    titleHighlight?: string;
    description?: string;
    backgroundImage?: string;
}

export default function PageHeader({
    label,
    title,
    titleHighlight,
    description,
    backgroundImage,
}: PageHeaderProps) {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                ) : (
                    <div className="w-full h-full bg-dark-grey" />
                )}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="animate-fade-in-up">
                    {label && (
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                            {label}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">
                        {titleHighlight ? (
                            <>
                                {title} <span className="text-primary-yellow">{titleHighlight}</span>
                            </>
                        ) : (
                            title
                        )}
                    </h1>
                    <div className="w-24 h-1 bg-primary-yellow mb-8" />
                    {description && (
                        <p className="max-w-2xl text-gray-200 text-lg">{description}</p>
                    )}
                </div>
            </div>
        </section>
    );
}

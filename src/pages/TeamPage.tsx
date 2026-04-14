"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLangValue } from "@/hooks/useLangValue";
import { useQuery } from "@tanstack/react-query";

interface TeamMember {
  id: string;
  name: string; name_bn?: string;
  role: string; role_bn?: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string; bio_bn?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const TeamPage = () => {
  const { t } = useLanguage();
  const lv = useLangValue();

  const { data: members = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
    queryFn: async () => {
      const r = await fetch("/api/admin/team");
      if (!r.ok) return [];
      return r.json();
    },
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-10 relative">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-sm uppercase tracking-widest text-primary mb-3">{t.teamTag}</p>
            <h1 className="section-heading">
              {t.teamHeading} <span className="gradient-text">{t.teamHeadingHighlight}</span>
            </h1>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[1,2,3,4].map(i => <div key={i} className="h-52 rounded-2xl bg-muted/30 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {members.map((member) => {
                const displayName = lv(member.name, member.name_bn);
                const displayRole = lv(member.role, member.role_bn);
                const displayBio  = lv(member.bio, member.bio_bn);
                const initials = (member.avatar || member.name || "?").substring(0, 2).toUpperCase();

                return (
                  <div key={member.id} className="glass-card-hover p-6 text-center group glow-border animate-fade-in-up">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={displayName}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                        {initials}
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-foreground mb-1">{displayName}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{displayRole}</p>
                    {displayBio && (
                      <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4 line-clamp-3">{displayBio}</p>
                    )}

                    <div className="flex justify-center gap-3">
                      {[
                        { icon: Github,   href: member.github },
                        { icon: Linkedin, href: member.linkedin },
                        { icon: Twitter,  href: member.twitter },
                      ].filter(s => s.href && s.href !== "#").map((s, j) => (
                        <a
                          key={j}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted/70 border border-border/60 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-primary/10 hover:border-primary/40 hover:scale-125 transition-all duration-300"
                        >
                          <s.icon size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeamPage;

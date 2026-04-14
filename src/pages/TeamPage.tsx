"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const teamMembers = [
  {
    name: "Rasel Ahmed",
    role: { en: "Founder & Lead Developer", bn: "প্রতিষ্ঠাতা ও লিড ডেভেলপার", hi: "संस्थापक और लीड डेवलपर" },
    avatar: "RA",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Sakib Hasan",
    role: { en: "UI/UX Designer", bn: "UI/UX ডিজাইনার", hi: "UI/UX डिज़ाइनर" },
    avatar: "SH",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Nusrat Jahan",
    role: { en: "SEO & Marketing Lead", bn: "SEO ও মার্কেটিং লিড", hi: "SEO और मार्केटिंग लीड" },
    avatar: "NJ",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Tanvir Islam",
    role: { en: "Video & Creative Director", bn: "ভিডিও ও ক্রিয়েটিভ ডিরেক্টর", hi: "वीडियो और क्रिएटिव डायरेक्टर" },
    avatar: "TI",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
];

const TeamPage = () => {
  const { t, lang } = useLanguage();

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="glass-card-hover p-6 text-center group glow-border animate-fade-in-up"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role[lang]}</p>
                <div className="flex justify-center gap-3">
                  {[
                    { icon: Github, href: member.socials.github },
                    { icon: Linkedin, href: member.socials.linkedin },
                    { icon: Twitter, href: member.socials.twitter },
                  ].map((s, j) => (
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
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeamPage;

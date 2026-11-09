import { notFound } from "next/navigation";

import { Bonus } from "@/components/Bonus";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LargeOrder } from "@/components/LargeOrder";
import { Menu } from "@/components/Menu";
import { Preview } from "@/components/Preview";
import { Terms } from "@/components/Terms";
import { getDictionary, isLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);
  const waGeneral = waLink(dict.wa.general);
  const waLarge = waLink(dict.wa.large);

  return (
    <>
      <Header
        lang={lang}
        waHref={waGeneral}
        labels={{ ...dict.nav, chatWhatsapp: dict.common.chatWhatsapp }}
      />
      <main id="top">
        <Hero dict={dict} waHref={waGeneral} />
        <Menu dict={dict} />
        <Terms dict={dict} />
        <Bonus dict={dict} />
        <LargeOrder dict={dict} waHref={waLarge} />
        <Preview dict={dict} />
      </main>
      <Footer dict={dict} waHref={waGeneral} />
      <FloatingWhatsApp href={waGeneral} label={dict.common.chatWhatsapp} />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero, HeroBackdrop } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Education } from "@/components/sections/Education";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const title = "Aryan Singh | Frontend Developer";
const description =
  "Frontend Developer portfolio showcasing projects, skills, education and interactive web experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Frontend Developer, React Developer, Next.js Developer, JavaScript Developer, Web Developer, Aryan Singh",
      },
      { name: "author", content: "Aryan Singh" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aryan Singh",
          jobTitle: "Frontend Developer",
          description,
          knowsAbout: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Frontend Development"],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <>
      <SmoothScroll />
      <Loader onDone={handleDone} />
      <HeroBackdrop />
      <Navbar />
      <main id="main" className="relative">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Expertise />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

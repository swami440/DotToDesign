import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import DotLogo from "../components/DotLogo";
import ProjectGallery from "../components/ProjectGallery";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      <Header />
      <Hero />
      <Services />
      <section
        id="about"
        style={{
          minHeight: "135vh",
          display: "grid",
          placeItems: "center",
          padding: "12vh 24px",
        }}
      >
        <DotLogo hoverScatter={40} hoverRadius={35} />
      </section>

      <section
        id="work"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <ProjectGallery />
      </section>
    </main>
  );
}

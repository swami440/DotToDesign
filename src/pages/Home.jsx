import React from "react";
import DotLogo from "../components/DotLogo";
import ProjectGallery from "../components/ProjectGallery";

export default function Home() {
  return (
    <main>
      <section
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

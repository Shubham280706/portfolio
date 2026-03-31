"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./about-section.module.css";

const valueCards = [
  {
    icon: "🧠",
    title: "Systems Thinking",
    description: "I design for long-term maintainability, not one-off screens."
  },
  {
    icon: "⚡",
    title: "Fast Iteration",
    description: "I move quickly from rough idea to validated interface."
  },
  {
    icon: "🤝",
    title: "Async Friendly",
    description: "Clear docs, updates, and handoff flow across time zones."
  },
  {
    icon: "🎯",
    title: "Outcome Focused",
    description: "I optimize for user and business impact, not vanity features."
  }
];

const coreSkills = ["React", "Next.js", "TypeScript"];
const allSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "AWS",
  "Docker"
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({
    who: false,
    work: false,
    build: false,
    connect: false
  });

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      const max = panel.scrollHeight - panel.clientHeight;
      const progress = max <= 0 ? 1 : panel.scrollTop / max;

      panel.style.setProperty("--about-scroll-progress", progress.toFixed(4));
      panel.style.setProperty("--about-parallax", `${((progress - 0.5) * 24).toFixed(2)}px`);

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleY(${Math.max(progress, 0.06)})`;
      }

      frame = 0;
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    panel.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      panel.removeEventListener("scroll", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const blocks = Array.from(
      panel.querySelectorAll<HTMLElement>("[data-about-block]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          let changed = false;
          const next = { ...prev };

          for (const entry of entries) {
            const key = entry.target.getAttribute("data-about-block");

            if (!key || !entry.isIntersecting || next[key]) {
              continue;
            }

            next[key] = true;
            changed = true;
          }

          return changed ? next : prev;
        });
      },
      {
        root: panel,
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    for (const block of blocks) {
      observer.observe(block);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.about}
      style={
        {
          "--about-font-serif": '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
          "--about-font-mono": '"SFMono-Regular", "SF Mono", "Roboto Mono", "Menlo", "Consolas", monospace',
          "--color-bg": "#FAF9F6",
          "--color-surface": "#ffffff",
          "--color-border": "rgba(0,0,0,0.07)",
          "--color-text": "#111111",
          "--color-muted": "rgba(17,17,17,0.68)",
          "--color-accent": "#5B8EF0",
          "--color-ghost": "rgba(91,142,240,0.12)"
        } as React.CSSProperties
      }
    >
      <div className={styles.mesh} aria-hidden />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.photoWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="profile-photo"
              src="/images/about-profile.png"
              alt="Shubham Shah"
              className={styles.photo}
            />
            <span className={styles.availability} aria-hidden />
          </div>

          <h2 className={styles.name}>Shubham Shah</h2>
          <p className={styles.role}>FULL STACK · UI/UX DEVELOPER</p>

          <div className={styles.infoList}>
            <p>
              <span className={styles.icon}>📍</span> India · Remote Ready
            </p>
            <p>
              <span className={styles.icon}>✉️</span> hello@shubhamshah.in
            </p>
            <p>
              <span className={styles.icon}>⏱</span> Time-zone agnostic
            </p>
          </div>

          <span className={styles.progressTrack} aria-hidden>
            <span ref={progressFillRef} className={styles.progressFill} />
          </span>
        </aside>

        <div ref={panelRef} className={styles.panel} data-lenis-prevent>
          <div className={styles.panelGlow} aria-hidden />

          <article
            data-about-block="who"
            className={`${styles.block} ${visible.who ? styles.visible : ""}`}
          >
            <p className={styles.kicker}>01 / who i am</p>
            <h3 className={styles.heading}>
              I build calm product systems with {" "}
              <span className={styles.accent}>sharp human focus.</span>
            </h3>
            <p className={styles.copy}>
              I am a full-stack developer who loves turning messy ideas into
              clear digital experiences. I combine design sensitivity with
              engineering discipline so products feel effortless and scale well.
            </p>
          </article>

          <article
            data-about-block="work"
            className={`${styles.block} ${visible.work ? styles.visible : ""}`}
          >
            <p className={styles.kicker}>02 / how i work</p>
            <h3 className={styles.heading}>Collaborative, fast, and precise.</h3>
            <p className={styles.copy}>
              I keep communication simple, decision-making visible, and
              execution iterative. Every sprint is optimized for clarity,
              velocity, and measurable outcomes.
            </p>
            <div className={styles.valueGrid}>
              {valueCards.map((card) => (
                <div key={card.title} className={styles.valueCard}>
                  <p className={styles.valueIcon}>{card.icon}</p>
                  <p className={styles.valueTitle}>{card.title}</p>
                  <p className={styles.valueBody}>{card.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article
            data-about-block="build"
            className={`${styles.block} ${visible.build ? styles.visible : ""}`}
          >
            <p className={styles.kicker}>03 / what i build with</p>
            <h3 className={styles.heading}>Modern stack, grounded decisions.</h3>
            <div className={styles.skillWrap}>
              {allSkills.map((skill) => (
                <span
                  key={skill}
                  className={`${styles.skillPill} ${
                    coreSkills.includes(skill) ? styles.skillCore : ""
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article
            data-about-block="connect"
            className={`${styles.block} ${visible.connect ? styles.visible : ""}`}
          >
            <p className={styles.kicker}>04 / let&apos;s build</p>
            <h3 className={styles.heading}>Ready to shape the next product?</h3>
            <p className={styles.copy}>
              If you are building something meaningful, we should connect. I can
              help with product architecture, polished UI, and full-stack
              execution.
            </p>
            <div className={styles.ctaRow}>
              <a href="mailto:hello@shubhamshah.in" className={styles.ctaPrimary}>
                Let&apos;s Connect →
              </a>
              <a href="#work" className={styles.ctaGhost}>
                View Projects
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

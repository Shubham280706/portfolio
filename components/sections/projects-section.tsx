"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

type ProjectCard = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  description: string;
  features: string[];
  stack: string[];
  demoHref?: string;
  repoHref?: string;
  image?: string;
  gallery?: string[];
  accent: string;
  glow: string;
};

const projects: ProjectCard[] = [
  {
    id: "ai-trading-assistant",
    title: "AI Trading Assistant",
    category: "Fintech + AI",
    blurb:
      "An Indian equities workspace that combines technical indicators, AI recommendations, watchlists, and live market context.",
    description:
      "Built as TradeWithS, this product helps traders review NSE and BSE names through a cleaner decision surface. It pairs technical signals, AI-assisted summaries, latest news, and watchlist flows so users can scan opportunities without bouncing between tools.",
    features: [
      "Market cockpit with search, trending stocks, and watchlist preview",
      "AI recommendation panel backed by RSI, MA50, MA200, and MACD context",
      "Stock detail views with price charts, news sentiment, and Google login"
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
    demoHref: "https://ai-trading-assistent.vercel.app",
    repoHref: "https://github.com/Shubham280706/ai-trading-assistent",
    image: "/images/ai-trading-assistant-dashboard.png",
    gallery: [
      "/images/ai-trading-assistant-stock.png",
      "/images/ai-trading-assistant-news.png"
    ],
    accent: "from-[#0b1425] via-[#11243d] to-[#18344c]",
    glow: "rgba(97, 211, 192, 0.28)"
  },
  {
    id: "fintech-dashboard",
    title: "Money Expense Tracker (Full Stack)",
    category: "Fintech UX",
    blurb: "A multi-panel operations dashboard for balances, cash flow, fraud monitoring, and reporting.",
    description:
      "Built for fintech operators who need a single command center. The interface balances dense financial data with calm interactions, quick drill-downs, and confident visual hierarchy.",
    features: [
      "Portfolio, revenue, and transaction intelligence",
      "Fraud and anomaly monitoring surfaces",
      "Responsive widgets with saved custom views"
    ],
    stack: ["React", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    demoHref: "https://fintech-dashboard-expense-tracker.vercel.app",
    accent: "from-[#dcfbf4] via-[#c5f0e8] to-[#f4fbf8]",
    glow: "rgba(106,209,194,0.18)"
  },
  {
    id: "solar-inverter-checker",
    title: "Solar Inverter Intelligence",
    category: "Energy Ops",
    blurb:
      "A monitoring workspace for inverter fleets with risk scoring, telemetry snapshots, AI narrative summaries, and maintenance guidance.",
    description:
      "Built as a failure-prediction platform for solar operations teams, this dashboard turns inverter telemetry into a readable command center. It highlights critical units, fleet-level health, explainability views, and RAG-style operator support so teams can prioritize intervention faster.",
    features: [
      "Fleet overview with inverter cards, degradation signals, and risk scoring",
      "Narrative and explainability surfaces for operator decision support",
      "RAG copilot workflow for maintenance questions and prioritization"
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "AI Workflows"],
    demoHref: "https://solar-inverter-five.vercel.app",
    repoHref: "https://github.com/Shubham280706/Solar-Inverter",
    image: "/images/solar-inverter-dashboard.png",
    gallery: ["/images/solar-inverter-narrative.png"],
    accent: "from-[#050913] via-[#0b1020] to-[#12192e]",
    glow: "rgba(120, 104, 255, 0.18)"
  },
  {
    id: "face-emotion-detector",
    title: "Face Emotion Detector",
    category: "Vision ML",
    blurb: "A vision-based app that detects expressions and visualizes emotional signals in real time.",
    description:
      "This project turns computer vision inference into a clean, human-readable interface with live camera states, confidence outputs, and interaction history for testing and demos.",
    features: [
      "Real-time webcam inference pipeline",
      "Confidence visualization and emotion breakdown",
      "Session logs for demos and usability review"
    ],
    stack: ["React", "Python", "TensorFlow", "Computer Vision"],
    demoHref: "https://face-emotion-detector-nine.vercel.app",
    repoHref: "https://github.com/Shubham280706/Face-emotion-detector",
    image: "/images/face-emotion-detector-light.png",
    gallery: ["/images/face-emotion-detector-dark.png"],
    accent: "from-[#f6ecdd] via-[#efe4cf] to-[#faf5ec]",
    glow: "rgba(171, 147, 96, 0.2)"
  }
];

export function ProjectsSection() {
  const [activeId, setActiveId] = useState<ProjectCard["id"]>(projects[0].id);

  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0];
  const projectImages = [activeProject.image, ...(activeProject.gallery ?? [])].filter(
    (image): image is string => Boolean(image)
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeId]);

  useEffect(() => {
    if (projectImages.length <= 1) {
      return;
    }

    const initialTimeout = window.setTimeout(() => {
      setActiveImageIndex((current) => (current + 1) % projectImages.length);
    }, 700);

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % projectImages.length);
    }, 2200);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(interval);
    };
  }, [projectImages.length]);

  return (
    <section id="projects" className="relative z-10 mt-8">
      <div className="section-shell overflow-hidden p-6 sm:p-8 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(122,141,255,0.16),rgba(255,255,255,0)_26%),radial-gradient(circle_at_84%_16%,rgba(214,225,255,0.22),rgba(255,255,255,0)_24%),radial-gradient(circle_at_72%_86%,rgba(255,223,238,0.22),rgba(255,255,255,0)_28%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(23,19,17,0.18)_0.7px,transparent_0.7px)] [background-size:14px_14px]"
        />

        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/48">

          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="relative inline-block max-w-3xl pb-3">
              <h2 className="relative z-10 font-display text-[4rem] leading-[1] tracking-[-0.06em] text-foreground sm:text-[4rem] lg:text-[4.75rem]">
                Projects
              </h2>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(105deg,transparent_0%,transparent_38%,rgba(255,255,255,0.1)_44%,rgba(255,255,255,0.92)_50%,rgba(255,255,255,0.18)_56%,transparent_64%,transparent_100%)] [background-size:220%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["180% 0", "-40% 0"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              >
                <span className="font-display text-[4rem] leading-[1] tracking-[-0.06em] sm:text-[4rem] lg:text-[4.75rem]">
                  Projects
                </span>
              </motion.span>
            </div>
            <p className="max-w-xl text-base leading-7 text-foreground/62 sm:text-lg">
              A calmer project presentation shaped to match the rest of the site
              — editorial structure, softer surfaces, and clearer hierarchy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
            <div className="grid gap-3 self-start">
              {projects.map((project, index) => {
                const isActive = project.id === activeId;

                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveId(project.id)}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease }}
                    className={`group relative overflow-hidden rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-300 ${isActive
                      ? "border-black/10 bg-white/86 shadow-soft"
                      : "border-black/8 bg-white/56 hover:border-black/10 hover:bg-white/72"
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white/70 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/48">
                        0{index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-[1.3rem] font-semibold tracking-[-0.04em] text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-foreground/56">
                          {project.blurb}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      layout
                      className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-sage/70 to-transparent ${isActive ? "w-full" : "w-0 group-hover:w-1/2"
                        }`}
                      transition={{ duration: 0.35, ease }}
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className="relative min-h-[38rem] overflow-hidden rounded-[1.8rem] border border-black/8 bg-white/64 shadow-soft">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-[-35%] z-20 w-[42%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04)_18%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.08)_82%,transparent)] opacity-45 mix-blend-screen"
                animate={{ x: ["0%", "420%"] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_46%,transparent_58%)] opacity-35"
                animate={{ backgroundPosition: ["-220% 0", "220% 0"] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "220% 100%" }}
              />
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 22, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.985 }}
                  transition={{ duration: 0.55, ease }}
                  className="grid min-h-[38rem] h-full lg:grid-cols-[1.05fr_0.95fr]"
                >
                  <div className="relative overflow-hidden border-b border-black/8 lg:border-b-0 lg:border-r">
                    <div
                      className={`gpu-layer absolute inset-0 bg-gradient-to-br ${activeProject.accent}`}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 18% 18%, ${activeProject.glow}, rgba(255,255,255,0) 30%)`
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_22%,rgba(255,255,255,0.02)_52%,rgba(255,255,255,0.32)_100%)]" />
                    {projectImages.length > 0 ? (
                      <div className="absolute inset-x-8 top-20 h-[20rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0b1320] shadow-[0_28px_70px_rgba(4,12,24,0.24)] sm:h-[22rem] lg:h-[23rem]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeProject.id}-${projectImages[activeImageIndex]}`}
                            initial={{ opacity: 0, scale: 1.018, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.992, filter: "blur(8px)" }}
                            transition={{ duration: 0.75, ease }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={projectImages[activeImageIndex]}
                              alt={`${activeProject.title} preview ${activeImageIndex + 1}`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,26,0.01),rgba(8,14,26,0.08)_62%,rgba(8,14,26,0.18)_100%)]" />
                      </div>
                    ) : null}
                    <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white">
                      <span>{activeProject.category}</span>
                      <span>{activeProject.stack[0]}</span>
                    </div>
                    <div className="absolute inset-x-6 bottom-6 max-w-[24rem]">
                      <h3 className="text-[2.4rem] font-semibold leading-[0.94] tracking-[-0.06em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)] sm:text-[3rem]">
                        {activeProject.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)] sm:text-lg">
                        {activeProject.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col px-6 py-6 sm:px-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/42">
                      Overview
                    </p>
                    <p className="mt-4 text-base leading-8 text-foreground/68 sm:text-lg">
                      {activeProject.description}
                    </p>

                    <div className="mt-8">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/42">
                        Key Features
                      </p>
                      <ul className="mt-4 space-y-4 text-sm leading-7 text-foreground/72 sm:text-[15px]">
                        {activeProject.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage/80" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/42">
                        Tech Stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeProject.stack.map((tag) => (
                          <span
                            key={`${activeProject.id}-${tag}`}
                            className="rounded-full border border-black/8 bg-white/72 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/58"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {activeProject.demoHref ? (
                          <a
                            href={activeProject.demoHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            Live Demo
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : null}
                        {activeProject.repoHref ? (
                          <a
                            href={activeProject.repoHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/84 px-4 py-2.5 text-sm font-medium text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            GitHub
                            <GitBranch className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

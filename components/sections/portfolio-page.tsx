"use client";

import {
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Copy,
  MapPin,
  UserRound
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealText } from "@/components/ui/reveal-text";
import { AboutSection } from "@/components/sections/about-section";
import { DotGlobe } from "@/components/sections/dot-globe";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { developerName, skills, socialLinks } from "@/data/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const landingNav = ["Home", "About", "Work", "Blog", "Hire Me"];
const contactEmail = "hello@shubhamshah.dev";
const rolePhrases = [
  "Full Stack Developer",
  "Fintech",
  "UI/UX",
  "Backend",
  "Product Systems",
  "Frontend"
];
const skillPillStyles: Record<string, string> = {
  React: "bg-[#eef8ff] text-[#3b82f6] border-[#bfdbfe]",
  "Next.js": "bg-[#f4f4f5] text-[#18181b] border-[#d4d4d8]",
  TypeScript: "bg-[#eef4ff] text-[#2563eb] border-[#c7d2fe]",
  "Node.js": "bg-[#eefdf1] text-[#2f855a] border-[#bbf7d0]",
  PostgreSQL: "bg-[#eef3ff] text-[#4f46e5] border-[#c7d2fe]",
  MongoDB: "bg-[#effcf5] text-[#16a34a] border-[#bbf7d0]",
  Docker: "bg-[#eef8ff] text-[#0ea5e9] border-[#bae6fd]",
  AWS: "bg-[#fff6e8] text-[#d97706] border-[#fed7aa]",
  Git: "bg-[#fff1ed] text-[#ea580c] border-[#fdba74]",
  Figma: "bg-[#fff1f8] text-[#db2777] border-[#f9a8d4]"
};

const bentoContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

const bentoCard = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: premiumEase
    }
  }
};

const BentoCard = forwardRef<
  HTMLElement,
  {
    children: ReactNode;
    className: string;
  }
>(function BentoCard({ children, className }, ref) {
  const cardRef = useRef<HTMLElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.6
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.6
  });

  const setRefs = (node: HTMLElement | null) => {
    cardRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const handlePointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * 7);
    rotateY.set((x - 0.5) * 7);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={setRefs}
      variants={bentoCard}
      whileHover={{ scale: 1.01, y: -2 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      {children}
    </motion.article>
  );
});

export function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const profileCardRef = useRef<HTMLElement | null>(null);
  const scrollProgress = useScrollProgress();
  const { scrollYProgress: profileCardScrollYProgress } = useScroll({
    target: profileCardRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.2
  });
  const profileHeadingX = useTransform(
    profileCardScrollYProgress,
    [0, 0.5, 1],
    ["-14%", "0%", "14%"]
  );
  const profileSubheadingX = useTransform(
    profileCardScrollYProgress,
    [0, 0.5, 1],
    ["14%", "0%", "-14%"]
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % rolePhrases.length);
    }, 1900);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const syncTime = () => {
      setCurrentTime(formatter.format(new Date()));
    };

    syncTime();
    const timer = window.setInterval(syncTime, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-[120] w-1/2 bg-[#f4ecff]"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.05, ease: [0.87, 0, 0.13, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-[120] w-1/2 bg-[#f4ecff]"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.05, ease: [0.87, 0, 0.13, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[121] flex items-center justify-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.08 }}
        transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
      >
        <span className="font-display text-[4.5rem] uppercase leading-none tracking-[-0.08em] text-foreground sm:text-[6.8rem]">
          SS
        </span>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-[119] w-1/2 bg-foreground"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.15, delay: 0.08, ease: [0.87, 0, 0.13, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-[119] w-1/2 bg-foreground"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.15, delay: 0.08, ease: [0.87, 0, 0.13, 1] }}
      />

      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-sage"
        style={{ scaleX }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 z-0 mx-auto h-[820px] w-[98%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.98),rgba(255,232,198,0.72)_30%,rgba(255,214,170,0.24)_52%,rgba(255,255,255,0)_76%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5.5rem] left-1/2 z-0 h-[116px] w-[62%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(129,150,255,0.68)_0%,rgba(255,181,124,0.32)_34%,rgba(255,255,255,0)_78%)] blur-[22px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[4.8rem] left-1/2 z-0 h-[144px] w-[78%] -translate-x-1/2 rounded-[100%] border-t border-white/80 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,245,232,0.16)_42%,rgba(255,255,255,0.42)_60%,rgba(255,255,255,0)_78%)]"
      />

      <div className="bg-ambient bg-grain relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 py-5 sm:px-6 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.65, ease: "easeOut" }}
          className="mb-4 flex items-center justify-between gap-3"
        >
          <div className="min-w-[7rem] font-display text-[2.2rem] leading-none text-foreground">
            SS
          </div>

          <nav className="hidden items-center gap-1 rounded-[1.2rem] border border-black/8 bg-white/72 p-1.5 shadow-soft backdrop-blur md:flex">
            {landingNav.map((item, index) => (
              <a
                key={item}
                href="#top"
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${index === 0
                  ? "bg-white text-sage"
                  : "text-foreground/80 hover:bg-white/80"
                  }`}
              >
                {item}
              </a>
            ))}
            <Button asChild className="h-9 rounded-xl px-4 text-sm">
              <a href="#top">Book a Call</a>
            </Button>
          </nav>

          <div className="rounded-[1.1rem] border border-black/8 bg-white/72 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground/72 shadow-soft backdrop-blur sm:text-sm">
            {currentTime || "--:-- --"}
          </div>
        </motion.header>

        <section
          id="top"
          className="relative mb-16 flex min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-center overflow-hidden px-2 py-16 text-center sm:mb-24 sm:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto flex max-w-6xl translate-y-6 flex-col items-center sm:translate-y-8"
          >
            <motion.div
              aria-hidden
              className="gpu-layer absolute inset-x-[8%] top-[18%] -z-10 h-[42%] rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(126,141,255,0.18),rgba(255,255,255,0)_68%)] blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 1.02, ease: "easeOut" }}
            />

            <motion.div
              initial={{ opacity: 0, filter: "blur(18px)", y: 36 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.05, delay: 0.96, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="max-w-100xl font-display text-[1.8rem] font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.6rem] lg:text-[3.4rem]">
                <span className="block">
                  <RevealText
                    text="I don't just build apps — I craft systems that think,"
                    delay={0.08}
                    wordClassName="will-change-transform"
                  />
                </span>
                <span className="block">
                  <RevealText
                    text="adapt, and"
                    delay={0.2}
                    wordClassName="will-change-transform"
                  />{" "}
                  <motion.span
                    className="bg-gradient-to-r from-[#6d80ff] via-[#5c96ff] to-[#8eb8ff] bg-clip-text italic text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    create impact.
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.16, ease: "easeOut" }}
              className="mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm tracking-[0.04em] text-foreground/68 sm:text-[1.35rem]"
            >
              <span>Hello I&apos;m {developerName}</span>
              <span className="text-foreground/36">|</span>
              <span className="relative inline-flex min-w-[15ch] justify-start overflow-hidden text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rolePhrases[roleIndex]}
                    initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block whitespace-nowrap"
                  >
                    {rolePhrases[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.28, ease: "easeOut" }}
              className="mt-20 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              <Magnetic strength={14}>
                <Button
                  asChild
                  className="h-12 rounded-full bg-black/70 px-6 text-sm text-white hover:bg-black"
                  size="lg"
                >
                  <motion.a
                    href={`mailto:${contactEmail}`}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    Let&apos;s Connect
                    <motion.span
                      className="ml-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.a>
                </Button>
              </Magnetic>

              <Magnetic strength={16}>
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full border border-black/10 bg-white/82 px-4 text-sm text-foreground shadow-soft backdrop-blur transition-all hover:bg-white"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  {copied ? <Check className="h-4 w-4 text-sage" /> : <Copy className="h-4 w-4" />}
                  <span className="font-medium">{copied ? "Email copied" : contactEmail}</span>
                </motion.button>
              </Magnetic>

              <div className="flex items-center gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Magnetic key={link.label} strength={14}>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/82 text-foreground shadow-soft backdrop-blur transition-all hover:bg-white"
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    </Magnetic>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.8, y: 18 }}
              animate={{ opacity: 1, scaleX: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.42, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-sage/55 to-transparent"
            />
          </motion.div>
        </section>

        <section className="relative z-10 pb-12">
          <motion.div
            variants={bentoContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 lg:grid-cols-[1.06fr_1.06fr_0.86fr] lg:grid-rows-[24rem_26.5rem]"
          >
            <BentoCard className="relative h-full overflow-hidden rounded-[1.9rem] border border-[#d8d2ff]/70 bg-[radial-gradient(circle_at_80%_18%,rgba(215,207,255,0.72),rgba(255,255,255,0)_34%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,245,255,0.82))] p-6 shadow-soft backdrop-blur sm:p-7 lg:col-span-2">
              <div className="absolute left-6 top-4 font-display text-[2.1rem] leading-none text-foreground">
                {developerName
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")}
              </div>

              <div className="absolute left-5 top-14 inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-black/10 bg-white/70 shadow-soft">
                <MapPin className="h-5 w-5 text-foreground" />
              </div>

              <div className="grid h-full gap-8 pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <motion.div
                  initial={{ opacity: 0, x: -26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="space-y-5 self-center pb-1"
                >
                  <h3 className="font-body text-[2rem] font-bold leading-none text-foreground">
                    <RevealText text="Time-Zone Agnostic" delay={0.12} />
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                    className="max-w-md font-mono text-[0.95rem] leading-8 text-foreground/66"
                  >
                    Productive collaboration across global teams, without time
                    barriers. Async-friendly communication, reliable overlap,
                    and smooth handoffs across time zones.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  <DotGlobe />
                </motion.div>
              </div>
            </BentoCard>

            <BentoCard
              ref={profileCardRef}
              className="relative h-full self-start overflow-hidden rounded-[1.9rem] border border-[#d8dbf3]/80 bg-[radial-gradient(circle_at_42%_18%,rgba(214,220,255,0.55),rgba(255,255,255,0)_38%),radial-gradient(circle_at_78%_82%,rgba(255,236,242,0.36),rgba(255,255,255,0)_26%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(244,244,248,0.92))] p-6 shadow-soft backdrop-blur lg:row-span-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-black/10 bg-white/70 shadow-soft">
                  <UserRound className="h-5 w-5 text-foreground" />
                </div>

                <div className="hidden items-center gap-2 rounded-[0.95rem] border border-black/5 bg-white/70 px-3 py-2 shadow-soft backdrop-blur md:inline-flex">
                  <span className="font-mono text-xs font-semibold text-foreground/80">Hei, Good Afternoon</span>
                </div>
              </div>

              <div className="flex h-full min-h-[27rem] flex-col justify-between pt-8">
                <div className="relative z-0 space-y-3">
                  <div className="overflow-hidden">
                    <motion.h3
                      className="gpu-layer w-max whitespace-nowrap font-display text-[4rem] leading-[0.9] tracking-[-0.05em] text-foreground/92"
                      style={{ x: profileHeadingX }}
                    >
                      Full Stack Developer  Full Stack Developer  Full Stack Developer
                    </motion.h3>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      className="gpu-layer w-max whitespace-nowrap font-mono text-xs uppercase tracking-[0.32em] text-foreground/44 sm:text-sm"
                      style={{ x: profileSubheadingX }}
                    >
                      UI/UX Developer  UI/UX Developer  UI/UX Developer
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mx-auto mt-4 flex h-[28rem] w-full items-end justify-center overflow-hidden"
                >
                  <div className="gpu-layer absolute inset-x-[6%] top-[8%] h-[80%] rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.98),rgba(255,255,255,0)_74%)] blur-xl" />
                  <div className="relative h-[28rem] w-[26rem] overflow-hidden">
                    <Image
                      src="/images/shubham-profile.png"
                      alt="Shubham Shah portrait"
                      fill
                      className="object-contain object-bottom grayscale drop-shadow-[0_20px_50px_rgba(23,19,17,0.2)] scale-150"
                      sizes="(max-width: 1024px) 420px, 500px"
                      priority
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                  className="space-y-1 pt-2"
                >
                  <p className="font-mono text-sm text-foreground/56">
                    A journey, told in moments.
                  </p>
                  <p className="text-[2rem] font-semibold leading-none text-foreground">
                    About Me
                  </p>
                </motion.div>
              </div>
            </BentoCard>

            <BentoCard className="h-full overflow-hidden rounded-[1.9rem] border border-[#cceae4]/80 bg-[radial-gradient(circle_at_20%_12%,rgba(211,252,248,0.78),rgba(255,255,255,0)_34%),radial-gradient(circle_at_82%_86%,rgba(216,241,255,0.45),rgba(255,255,255,0)_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,250,247,0.9))] p-6 shadow-soft">
              <div className="flex h-full flex-col justify-between gap-8">
                <h3 className="mx-auto max-w-md pt-10 text-center font-display text-[2.05rem] leading-[1.05] tracking-[-0.04em] text-foreground">
                  <RevealText
                    text="Enthusiastic About Innovative and futuristic Tech"
                    delay={0.1}
                  />
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                  className="flex flex-wrap gap-2"
                >
                  {skills.slice(0, 18).map((skill) => (
                    <motion.span
                      key={skill.name}
                      className={`rounded-[0.85rem] border px-3 py-2 text-sm shadow-[0_4px_12px_rgba(23,19,17,0.06)] ${skillPillStyles[skill.name] ?? "border-black/10 bg-white/78 text-foreground/70"}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>

              </div>
            </BentoCard>

            <BentoCard className="h-full rounded-[1.9rem] border border-[#f0d1df]/80 bg-[radial-gradient(circle_at_82%_10%,rgba(255,213,232,0.58),rgba(255,255,255,0)_28%),radial-gradient(circle_at_18%_85%,rgba(225,216,255,0.45),rgba(255,255,255,0)_26%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,245,250,0.92))] p-6 shadow-soft">
              <div className="flex h-full min-h-[24rem] flex-col justify-between gap-8">
                <h3 className="max-w-md pt-10 font-display text-[2.25rem] leading-[1.02] tracking-[-0.04em] text-foreground">
                  <RevealText
                    text="Let's build your next product, the right way"
                    delay={0.1}
                  />
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                >
                  <Magnetic strength={18}>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-[1rem] border border-black/10 bg-white/80 px-5 text-base text-foreground shadow-soft backdrop-blur transition-all hover:bg-white"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-sage" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="font-mono text-sm sm:text-base">
                        {copied ? "Copied to clipboard" : contactEmail}
                      </span>
                    </button>
                  </Magnetic>
                </motion.div>
              </div>
            </BentoCard>
          </motion.div>
        </section>

        <section className="relative z-10 mt-20 px-2 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.34em] text-foreground/42 sm:text-xs">
              Profile
            </p>
            <h2 className="mt-4 font-display text-[2.8rem] leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[4rem]">
              About <span className="italic text-[#6d80ff]">Me</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-7 text-foreground/58 sm:text-base">
              A closer look at how I think, build, and bring clarity to digital products.
            </p>
          </motion.div>
        </section>

        <AboutSection />
        <div className="mt-8">
          <SkillsSection />
        </div>
        <ProjectsSection />
      </div>
    </main>
  );
}

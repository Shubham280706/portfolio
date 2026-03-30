"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useMemo, useRef, useState } from "react";

type OrbitSkill = {
  name: string;
  icon: string;
  ring: 1 | 2 | 3;
  angle: number;
  duration: number;
};

type OrbitRingProps = {
  skills: OrbitSkill[];
  radius: number;
  paused: boolean;
  hoveredSkill: string | null;
  onHoverStart: (name: string) => void;
  onHoverEnd: () => void;
  reverse?: boolean;
};

const ease = [0.23, 1, 0.32, 1] as const;

const orbitSkills: OrbitSkill[] = [
  { name: "React", icon: "◌", ring: 1, angle: -70, duration: 18 },
  { name: "TypeScript", icon: "TS", ring: 1, angle: -2, duration: 18 },
  { name: "Node.js", icon: "⬡", ring: 1, angle: 142, duration: 18 },
  { name: "Next.js", icon: "▲", ring: 1, angle: 104, duration: 18 },
  { name: "MongoDB", icon: "🌿", ring: 2, angle: 180, duration: 26 },
  { name: "PostgreSQL", icon: "🐘", ring: 2, angle: 0, duration: 26 },
  { name: "Docker", icon: "🐳", ring: 3, angle: -90, duration: 34 },
  { name: "Tailwind CSS", icon: "✦", ring: 3, angle: 90, duration: 34 }
];

const ringSizes = {
  1: 98,
  2: 172,
  3: 248
} as const;

function OrbitRing({
  skills,
  radius,
  paused,
  hoveredSkill,
  onHoverStart,
  onHoverEnd,
  reverse = false
}: OrbitRingProps) {
  const rotation = useMotionValue(0);
  const ringRotate = useTransform(rotation, (value) => `${value}deg`);
  const pillRotate = useTransform(rotation, (value) => `${-value}deg`);
  const duration = skills[0]?.duration ?? 24;
  const ringRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ringRef, { amount: 0.2 });

  useAnimationFrame((_, delta) => {
    if (paused || !isInView) {
      return;
    }

    const direction = reverse ? -1 : 1;
    rotation.set(rotation.get() + direction * (360 / duration) * (delta / 1000));
  });

  return (
    <motion.div ref={ringRef} style={{ rotate: ringRotate }} className="absolute inset-0 gpu-layer">
      {skills.map((skill) => {
        const radians = (skill.angle * Math.PI) / 180;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;
        const active = hoveredSkill === skill.name;
        const dimmed = Boolean(hoveredSkill && hoveredSkill !== skill.name);

        return (
          <motion.div
            key={skill.name}
            className="absolute left-1/2 top-1/2"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease }}
          >
            <motion.button
              type="button"
              style={{ rotate: pillRotate, x: "-50%", y: "-50%" }}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.28, ease }}
              onMouseEnter={() => onHoverStart(skill.name)}
              onMouseLeave={onHoverEnd}
              className={`absolute left-1/2 top-1/2 z-10 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[1.05rem] font-semibold tracking-[-0.04em] shadow-[0_10px_28px_rgba(23,19,17,0.08)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-7 sm:py-3.5 sm:text-[1.1rem] ${
                active
                  ? "border-[#1a1a18] bg-[#1a1a18] text-white shadow-[0_18px_40px_rgba(23,19,17,0.18)]"
                  : "border-[#e4ddd3] bg-white text-[#1f1c19]"
              } ${dimmed ? "opacity-35" : "opacity-100"}`}
            >
              <span className={`text-sm ${active ? "text-white/90" : "text-foreground/78"}`}>
                {skill.icon}
              </span>
              <span className="whitespace-nowrap">{skill.name}</span>
            </motion.button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const groupedSkills = useMemo(
    () => ({
      inner: orbitSkills.filter((skill) => skill.ring === 1),
      middle: orbitSkills.filter((skill) => skill.ring === 2),
      outer: orbitSkills.filter((skill) => skill.ring === 3)
    }),
    []
  );

  const helperText = hoveredSkill || "Hover to pause and explore";

  return (
    <section id="skills" className="relative z-10 pb-12 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="section-shell overflow-hidden p-6 sm:p-8 lg:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(122,141,255,0.12),rgba(255,255,255,0)_26%),radial-gradient(circle_at_82%_20%,rgba(205,226,255,0.36),rgba(255,255,255,0)_28%),radial-gradient(circle_at_50%_72%,rgba(255,232,241,0.28),rgba(255,255,255,0)_24%)]"
        />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/48">
              SKILLS
            </p>
            <h2 className="mt-4 font-display text-[3rem] leading-[0.95] tracking-[-0.06em] text-foreground sm:text-[4rem] lg:text-[5rem]">
              Tools &amp; Technologies I Use
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/62">
              A focused toolkit for building thoughtful interfaces, strong
              systems, and clean product experiences.
            </p>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/42">
              {helperText}
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,245,250,0.92))] px-4 py-10 shadow-[0_24px_60px_rgba(23,19,17,0.08)] sm:px-6 sm:py-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHoveredSkill(null);
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,141,255,0.14),rgba(255,255,255,0)_54%)]"
            />

            <div className="relative mx-auto flex h-[30rem] max-w-[38rem] items-center justify-center sm:h-[34rem]">
              <div className="absolute h-[12rem] w-[12rem] rounded-full border border-[#ddd7cf] border-dashed opacity-80" />
              <div className="absolute h-[21rem] w-[21rem] rounded-full border border-[#ddd7cf] border-dashed opacity-75" />
              <div className="absolute h-[30rem] w-[30rem] rounded-full border border-[#ddd7cf] border-dashed opacity-70" />

              <div className="absolute z-20 flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-[#1b1a17] text-2xl font-semibold tracking-[-0.05em] text-white shadow-[0_18px_40px_rgba(23,19,17,0.18)]">
                ss
              </div>

              <OrbitRing
                skills={groupedSkills.inner}
                radius={ringSizes[1]}
                paused={paused}
                hoveredSkill={hoveredSkill}
                onHoverStart={setHoveredSkill}
                onHoverEnd={() => setHoveredSkill(null)}
              />
              <OrbitRing
                skills={groupedSkills.middle}
                radius={ringSizes[2]}
                paused={paused}
                hoveredSkill={hoveredSkill}
                onHoverStart={setHoveredSkill}
                onHoverEnd={() => setHoveredSkill(null)}
                reverse
              />
              <OrbitRing
                skills={groupedSkills.outer}
                radius={ringSizes[3]}
                paused={paused}
                hoveredSkill={hoveredSkill}
                onHoverStart={setHoveredSkill}
                onHoverEnd={() => setHoveredSkill(null)}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

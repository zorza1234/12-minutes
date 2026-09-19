"use client";

import { useEffect, useState } from "react";

const activities = [
  {
    number: "01",
    title: "PLAY SOMETHING",
    description: "Quick games that don't need a tutorial.",
    href: "/games",
    color: "#FF5A36",
    emoji: "🎮",
  },
  {
    number: "02",
    title: "TEST YOUR BRAIN",
    description: "Puzzles, patterns and tiny brain battles.",
    href: "/brain",
    color: "#2457FF",
    emoji: "🧠",
  },
  {
    number: "03",
    title: "HAVE A LAUGH",
    description: "Bad jokes. Weird jokes. Good enough jokes.",
    href: "/laugh",
    color: "#F6C945",
    emoji: "😂",
  },
  {
    number: "04",
    title: "SURPRISE ME",
    description: "Don't know what you want? Perfect.",
    href: "/surprise",
    color: "#2E9B65",
    emoji: "🎲",
  },
];

export default function Home() {
  const [seconds, setSeconds] = useState(720);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  const resetTimer = () => {
    setSeconds(720);
    setRunning(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F0E8] text-[#171717]">
      {/* HEADER */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-[-0.06em] transition-transform hover:-translate-y-1 sm:text-2xl"
        >
          12 MINUTES
        </a>

        <nav className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.12em] sm:gap-8">
          <a
            href="/games"
            className="transition-transform hover:-translate-y-1 hover:text-[#FF5A36]"
          >
            Games
          </a>

          <a
            href="/brain"
            className="hidden transition-transform hover:-translate-y-1 hover:text-[#2457FF] sm:block"
          >
            Brain
          </a>

          <a
            href="/laugh"
            className="hidden transition-transform hover:-translate-y-1 hover:text-[#2E9B65] sm:block"
          >
            Laugh
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 sm:pt-16">
        {/* DECORATIVE FLOATING SHAPES */}
        <div className="pointer-events-none absolute -right-12 top-12 hidden h-28 w-28 rotate-12 border-2 border-[#171717] bg-[#F6C945] shadow-[6px_6px_0_#171717] sm:block home-float-slow" />

        <div className="pointer-events-none absolute left-0 top-64 hidden h-10 w-10 rounded-full bg-[#FF5A36] sm:block home-float" />

        <div className="pointer-events-none absolute right-20 top-[420px] hidden h-5 w-5 bg-[#2457FF] sm:block home-float-fast" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 border-2 border-[#171717] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[4px_4px_0_#171717] home-badge">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2E9B65] home-pulse" />
              You have time.
            </div>

            <h1 className="max-w-4xl text-[4rem] font-black leading-[0.86] tracking-[-0.075em] sm:text-[6.5rem] lg:text-[8rem]">
              WHAT CAN YOU
              <br />
              DO IN
              <br />
              <span className="relative inline-block text-[#FF5A36]">
                12 MINUTES?
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-[#F6C945] sm:-bottom-3 sm:h-3" />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-xl sm:leading-8">
              Games. Brain challenges. Bad jokes. Random stuff.
              <br className="hidden sm:block" />
              You have twelve minutes. We have something to do.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/surprise"
                className="border-2 border-[#171717] bg-[#171717] px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[5px_5px_0_#FF5A36] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_#FF5A36] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#FF5A36]"
              >
                Surprise me →
              </a>

              <a
                href="/games"
                className="border-2 border-[#171717] bg-white px-7 py-4 text-sm font-black uppercase tracking-wider shadow-[5px_5px_0_#171717] transition-all hover:-translate-y-1"
              >
                Browse everything
              </a>
            </div>
          </div>

          {/* TIMER */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="relative">
              {/* ROTATING OUTER RING */}
              <div className="absolute -inset-5 rounded-full border-2 border-dashed border-[#171717]/30 home-spin" />

              {/* CLOCK */}
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-[#171717] bg-[#F6C945] shadow-[10px_10px_0_#171717] sm:h-80 sm:w-80">
                <div className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-[#171717]" />

                <div className="text-center">
                  <div className="text-[4.5rem] font-black leading-none tracking-[-0.08em] sm:text-[6rem]">
                    {timeDisplay}
                  </div>

                  <div className="mt-3 text-xs font-black uppercase tracking-[0.2em]">
                    {seconds === 0
                      ? "Time's up"
                      : running
                        ? "Time is running"
                        : "Your 12 minutes"}
                  </div>
                </div>

                {/* CLOCK HAND */}
                <div
                  className="absolute left-1/2 top-1/2 h-20 w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-[#171717] sm:h-24"
                  style={{
                    transform: `translateX(-50%) translateY(-100%) rotate(${
                      ((720 - seconds) / 720) * 360
                    }deg)`,
                  }}
                />

                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A36] ring-2 ring-[#171717]" />
              </div>

              {/* SMALL LABEL */}
              <div className="absolute -bottom-5 -left-5 rotate-[-6deg] border-2 border-[#171717] bg-white px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#171717] sm:-left-10">
                No pressure.
              </div>
            </div>
          </div>
        </div>

        {/* TIMER CONTROLS */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <button
            onClick={() => setRunning((value) => !value)}
            className="border-2 border-[#171717] bg-[#2E9B65] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_#171717] transition-transform hover:-translate-y-1"
          >
            {running ? "Pause timer" : "Start 12-minute timer"}
          </button>

          <button
            onClick={resetTimer}
            className="border-2 border-[#171717] bg-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_#171717] transition-transform hover:-translate-y-1"
          >
            Reset
          </button>

          <span className="text-xs font-bold text-black/45">
            Start it when you're ready.
          </span>
        </div>
      </section>

      {/* ACTIVITY GRID */}
      <section className="border-y-2 border-[#171717] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#FF5A36]">
                Pick your poison
              </p>

              <h2 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">
                DO SOMETHING.
              </h2>
            </div>

            <p className="max-w-sm text-sm font-medium leading-6 text-black/50">
              Every option is designed to fit inside a spare twelve minutes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {activities.map((activity) => (
              <a
                key={activity.number}
                href={activity.href}
                className="group relative overflow-hidden border-2 border-[#171717] p-7 shadow-[7px_7px_0_#171717] transition-all duration-200 hover:-translate-y-2 hover:shadow-[10px_10px_0_#171717] sm:p-9"
                style={{ backgroundColor: activity.color }}
              >
                <div className="absolute -right-6 -top-8 text-[8rem] opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  {activity.emoji}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black tracking-[0.16em]">
                      {activity.number}
                    </span>

                    <span className="text-4xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                      {activity.emoji}
                    </span>
                  </div>

                  <h3 className="mt-12 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                    {activity.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm font-bold leading-6 opacity-75">
                    {activity.description}
                  </p>

                  <div className="mt-8 inline-flex border-2 border-[#171717] bg-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#171717] transition-transform group-hover:translate-x-1">
                    Enter →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVER STRIP */}
      <section className="overflow-hidden bg-[#171717] text-white">
        <div className="home-marquee flex whitespace-nowrap py-5 text-sm font-black uppercase tracking-[0.18em]">
          <span className="mx-6">12 MINUTES</span>
          <span className="mx-6 text-[#FF5A36]">✦</span>
          <span className="mx-6">PLAY SOMETHING</span>
          <span className="mx-6 text-[#F6C945]">✦</span>
          <span className="mx-6">THINK SOMETHING</span>
          <span className="mx-6 text-[#2457FF]">✦</span>
          <span className="mx-6">LAUGH SOMETHING</span>
          <span className="mx-6 text-[#2E9B65]">✦</span>
          <span className="mx-6">WASTE TIME WELL</span>
          <span className="mx-6 text-[#FF5A36]">✦</span>
        </div>
      </section>

      {/* SURPRISE CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="relative overflow-hidden border-2 border-[#171717] bg-[#2457FF] p-8 text-white shadow-[9px_9px_0_#171717] sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-20 text-[14rem] font-black leading-none opacity-10">
            ?
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F6C945]">
              Still can't decide?
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-6xl">
              LET US PICK FOR YOU.
            </h2>

            <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/75 sm:text-base">
              One click. One random activity. Zero decision-making required.
            </p>

            <a
              href="/surprise"
              className="mt-8 inline-block border-2 border-[#171717] bg-[#F6C945] px-7 py-4 text-sm font-black uppercase tracking-wider text-[#171717] shadow-[5px_5px_0_#171717] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717]"
            >
              Surprise me →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#171717] px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <span>12 MINUTES © 2026</span>

          <div className="flex gap-5">
            <a href="/games" className="hover:text-[#FF5A36]">
              Games
            </a>

            <a href="/brain" className="hover:text-[#2457FF]">
              Brain
            </a>

            <a href="/laugh" className="hover:text-[#2E9B65]">
              Laugh
            </a>

            <a href="/surprise" className="hover:text-[#FF5A36]">
              Surprise
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
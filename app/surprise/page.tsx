"use client";

import { useState } from "react";

type Surprise = {
  emoji: string;
  category: string;
  title: string;
  description: string;
  action: string;
  href?: string;
};

const surprises: Surprise[] = [
  {
    emoji: "🎮",
    category: "GAME",
    title: "TEST YOUR REACTION",
    description:
      "Think you're fast? Find out how quickly your brain can tell your finger what to do.",
    action: "PLAY REACTION TEST",
    href: "/games/reaction",
  },
  {
    emoji: "🧠",
    category: "BRAIN",
    title: "FIND THE ODD ONE",
    description:
      "A bunch of symbols. One doesn't belong. Your job is to spot it before your brain gives up.",
    action: "PLAY ODD ONE OUT",
    href: "/brain/odd-one-out",
  },
  {
    emoji: "😂",
    category: "LAUGH",
    title: "GET A TERRIBLE JOKE",
    description:
      "You could spend the next 12 minutes being productive. Or you could hear a really bad joke.",
    action: "MAKE ME LAUGH",
    href: "/laugh",
  },
  {
    emoji: "🔢",
    category: "BRAIN",
    title: "DO SOME MENTAL MATH",
    description:
      "Ten seconds. One question. No calculator. Let's see what your brain is doing today.",
    action: "START QUICK MATH",
    href: "/brain/quick-math",
  },
  {
    emoji: "🎲",
    category: "RANDOM",
    title: "MAKE A COMPLETELY RANDOM CHOICE",
    description:
      "You have two options. You don't need context. You just need to trust the button.",
    action: "MAKE MY DECISION",
  },
  {
    emoji: "🌍",
    category: "RANDOM",
    title: "LEARN SOMETHING USELESS",
    description:
      "Discover a completely unnecessary fact that you will probably remember forever.",
    action: "SHOW ME A FACT",
  },
  {
    emoji: "🪨",
    category: "GAME",
    title: "ROCK PAPER SCISSORS",
    description:
      "Three choices. One opponent. Absolutely no reason to take this personally.",
    action: "CHALLENGE THE COMPUTER",
    href: "/games/rock-paper-scissors",
  },
  {
    emoji: "🔤",
    category: "BRAIN",
    title: "UNSCRAMBLE A WORD",
    description:
      "Someone threw the letters in a blender. You have to put them back together.",
    action: "SCRAMBLE MY BRAIN",
    href: "/brain/word-scramble",
  },
];

const uselessFacts = [
  "Bananas are berries, but strawberries aren't botanically berries.",
  "A group of flamingos is called a flamboyance.",
  "Octopuses have three hearts.",
  "Wombat poop is cube-shaped.",
  "The average cloud can weigh more than a million pounds.",
  "A day on Venus is longer than a year on Venus.",
  "Cows have best friends and can become stressed when separated.",
];

const choices = [
  "Order the thing you've never tried.",
  "Watch the first video YouTube recommends.",
  "Text someone you haven't talked to in a while.",
  "Go outside and walk for exactly 12 minutes.",
  "Listen to a song you've never heard before.",
  "Make a snack using only what you already have.",
  "Close every unnecessary browser tab.",
  "Draw something with your non-dominant hand.",
];

export default function SurprisePage() {
  const [surprise, setSurprise] = useState<Surprise | null>(null);
  const [fact, setFact] = useState("");
  const [choice, setChoice] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const generateSurprise = () => {
    setIsSpinning(true);
    setFact("");
    setChoice("");

    setTimeout(() => {
      const random =
        surprises[Math.floor(Math.random() * surprises.length)];

      setSurprise(random);
      setIsSpinning(false);
    }, 350);
  };

  const showFact = () => {
    const random =
      uselessFacts[Math.floor(Math.random() * uselessFacts.length)];

    setFact(random);
    setChoice("");
  };

  const makeChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)];

    setChoice(random);
    setFact("");
  };

  return (
    <main className="min-h-screen bg-[#F4F0E8] text-[#171717]">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a
          href="/"
          className="text-xl font-black tracking-[-0.05em] hover:-translate-y-0.5"
        >
          12 MINUTES
        </a>

        <a
          href="/"
          className="text-sm font-black uppercase tracking-[0.12em] hover:-translate-y-0.5"
        >
          ← Home
        </a>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <div className="text-center">
          <div
            className={`mx-auto mb-6 flex h-28 w-28 items-center justify-center border-2 border-[#171717] bg-[#F6C945] text-6xl shadow-[7px_7px_0_#171717] ${
              isSpinning ? "animate-spin" : ""
            }`}
          >
            🎁
          </div>

          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#2457FF]">
            You have 12 minutes.
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            SURPRISE ME.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-lg">
            No planning. No scrolling. No idea what to do? Press the button.
            We'll figure it out.
          </p>
        </div>

        {/* MAIN BUTTON */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={generateSurprise}
            className="border-2 border-[#171717] bg-[#FF5A36] px-10 py-6 text-xl font-black uppercase tracking-wider text-white shadow-[7px_7px_0_#171717] transition-all hover:-translate-y-2 hover:shadow-[10px_10px_0_#171717] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_#171717] sm:text-2xl"
          >
            🎲 SURPRISE ME
          </button>
        </div>

        {/* RESULT */}
        {surprise && (
          <div className="mt-12">
            <div className="mx-auto max-w-3xl border-2 border-[#171717] bg-white p-7 shadow-[9px_9px_0_#171717] sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-[#171717] bg-[#2457FF] text-4xl text-white shadow-[4px_4px_0_#171717]">
                  {surprise.emoji}
                </div>

                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#FF5A36]">
                    {surprise.category}
                  </div>

                  <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    {surprise.title}
                  </h2>

                  <p className="mt-4 text-base font-medium leading-7 text-black/60">
                    {surprise.description}
                  </p>

                  {surprise.href ? (
                    <a
                      href={surprise.href}
                      className="mt-7 inline-block border-2 border-[#171717] bg-[#171717] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[4px_4px_0_#2E9B65] hover:-translate-y-1 hover:shadow-[6px_6px_0_#2E9B65]"
                    >
                      {surprise.action} →
                    </a>
                  ) : (
                    <div className="mt-7 flex flex-wrap gap-3">
                      {surprise.title === "MAKE A COMPLETELY RANDOM CHOICE" && (
                        <button
                          onClick={makeChoice}
                          className="border-2 border-[#171717] bg-[#171717] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[4px_4px_0_#2E9B65] hover:-translate-y-1"
                        >
                          {surprise.action}
                        </button>
                      )}

                      {surprise.title === "LEARN SOMETHING USELESS" && (
                        <button
                          onClick={showFact}
                          className="border-2 border-[#171717] bg-[#171717] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[4px_4px_0_#2E9B65] hover:-translate-y-1"
                        >
                          {surprise.action}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {fact && (
                <div className="mt-8 border-2 border-[#171717] bg-[#F6C945] p-6 text-xl font-black leading-snug shadow-[4px_4px_0_#171717]">
                  💡 {fact}
                </div>
              )}

              {choice && (
                <div className="mt-8 border-2 border-[#171717] bg-[#2E9B65] p-6 text-xl font-black leading-snug text-white shadow-[4px_4px_0_#171717]">
                  🎯 {choice}
                </div>
              )}
            </div>

            <div className="mt-7 text-center">
              <button
                onClick={generateSurprise}
                className="text-sm font-black uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-[#FF5A36]"
              >
                Not feeling it? Surprise me again →
              </button>
            </div>
          </div>
        )}

        {/* BEFORE FIRST SURPRISE */}
        {!surprise && (
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="border-2 border-[#171717] bg-[#F6C945] p-6 shadow-[4px_4px_0_#171717]">
              <div className="text-4xl">🎮</div>
              <h3 className="mt-4 font-black uppercase">Games</h3>
              <p className="mt-2 text-sm font-medium">
                Something you can actually play.
              </p>
            </div>

            <div className="border-2 border-[#171717] bg-[#2457FF] p-6 text-white shadow-[4px_4px_0_#171717]">
              <div className="text-4xl">🧠</div>
              <h3 className="mt-4 font-black uppercase">Brain</h3>
              <p className="mt-2 text-sm font-medium">
                Something that makes you think.
              </p>
            </div>

            <div className="border-2 border-[#171717] bg-[#FF5A36] p-6 text-white shadow-[4px_4px_0_#171717]">
              <div className="text-4xl">🤪</div>
              <h3 className="mt-4 font-black uppercase">Chaos</h3>
              <p className="mt-2 text-sm font-medium">
                Something you definitely didn't plan.
              </p>
            </div>
          </div>
        )}

        {/* PHILOSOPHY */}
        <div className="mt-16 border-t-2 border-[#171717] pt-8 text-center">
          <p className="text-lg font-black">
            You don't need to know what you want.
          </p>

          <p className="mt-2 text-black/50">
            That's literally what the button is for.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#171717] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <span>12 MINUTES © 2026</span>

          <span className="text-black/50">
            Press the button. See what happens.
          </span>
        </div>
      </footer>
    </main>
  );
}
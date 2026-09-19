"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

export default function ReactionTest() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setReactionTime(null);
    setGameState("waiting");

    // Random delay between 1.5 and 4.5 seconds
    const delay = Math.floor(Math.random() * 3000) + 1500;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setGameState("ready");
    }, delay);
  };

  const handleGameClick = () => {
    if (gameState === "waiting") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setGameState("tooEarly");
      return;
    }

    if (gameState === "ready" && startTimeRef.current !== null) {
      const time = Math.round(performance.now() - startTimeRef.current);

      setReactionTime(time);

      setBestTime((currentBest) => {
        if (currentBest === null || time < currentBest) {
          return time;
        }

        return currentBest;
      });

      setGameState("result");
    }
  };

  const getResultMessage = () => {
    if (reactionTime === null) return "";

    if (reactionTime < 200) return "LIGHTNING ⚡";
    if (reactionTime < 300) return "FAST";
    if (reactionTime < 400) return "DECENT";
    if (reactionTime < 500) return "NOT BAD";
    return "KEEP PRACTICING";
  };

  const getInstruction = () => {
    switch (gameState) {
      case "waiting":
        return "WAIT FOR IT...";
      case "ready":
        return "CLICK!";
      case "tooEarly":
        return "TOO EARLY!";
      case "result":
        return getResultMessage();
      default:
        return "CLICK START TO BEGIN";
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F0E8] text-[#171717]">
      {/* Header */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-sm font-black text-[#F4F0E8]">
            12
          </div>

          <span className="text-xl font-black tracking-[-0.04em]">
            MINUTES
          </span>
        </Link>

        <Link
          href="/games"
          className="rounded-full border-2 border-[#171717] px-5 py-2.5 text-sm font-black transition-all hover:bg-[#171717] hover:text-[#F4F0E8]"
        >
          ← ALL GAMES
        </Link>
      </nav>

      {/* Game heading */}
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 lg:px-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#171717]/20 bg-white/40 px-4 py-2 text-xs font-black tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-[#FF5A36]" />
          GAME 01 / SPEED
        </div>

        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.07em]">
          REACTION
          <br />
          <span className="text-[#FF5A36]">TEST.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[#171717]/60">
          Test how quickly you can react. Click START, wait for the signal,
          then hit the screen as fast as you can.
        </p>
      </section>

      {/* Game area */}
      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-10">
        <button
          type="button"
          onClick={handleGameClick}
          className={`reaction-game-area relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-[#171717] px-6 text-center transition-colors duration-150 ${
            gameState === "ready"
              ? "bg-[#FF5A36]"
              : gameState === "tooEarly"
                ? "bg-[#F6C945]"
                : "bg-[#171717]"
          }`}
        >
          <span
            className={`reaction-label mb-5 text-xs font-black tracking-[0.25em] ${
              gameState === "ready" || gameState === "tooEarly"
                ? "text-[#171717]/50"
                : "text-white/40"
            }`}
          >
            REACTION TEST
          </span>

          <span
            className={`reaction-instruction text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-[-0.07em] ${
              gameState === "ready" || gameState === "tooEarly"
                ? "text-[#171717]"
                : "text-[#F4F0E8]"
            }`}
          >
            {getInstruction()}
          </span>

          {gameState === "result" && reactionTime !== null && (
            <span className="mt-7 text-2xl font-black text-[#F4F0E8]">
              {reactionTime} ms
            </span>
          )}

          <span
            className={`reaction-hint absolute bottom-6 text-[10px] font-black tracking-[0.15em] ${
              gameState === "ready" || gameState === "tooEarly"
                ? "text-[#171717]/45"
                : "text-white/30"
            }`}
          >
            {gameState === "ready"
              ? "CLICK ANYWHERE"
              : gameState === "waiting"
                ? "DON'T CLICK YET"
                : gameState === "result"
                  ? "CLICK START BELOW TO TRY AGAIN"
                  : gameState === "tooEarly"
                    ? "YOU HAVE TO WAIT FOR THE SIGNAL"
                    : "START WHEN YOU'RE READY"}
          </span>
        </button>

        {/* Controls */}
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={startGame}
            className="rounded-2xl bg-[#171717] px-6 py-5 text-sm font-black text-[#F4F0E8] transition-transform hover:-translate-y-0.5"
          >
            {gameState === "idle" ? "START TEST" : "TRY AGAIN"}
          </button>

          <div className="flex items-center justify-between rounded-2xl border-2 border-[#171717] bg-white px-6 py-5 sm:min-w-[220px] sm:justify-center sm:gap-6">
            <span className="text-xs font-black tracking-[0.15em] text-[#171717]/40">
              BEST
            </span>

            <span className="text-xl font-black">
              {bestTime !== null ? `${bestTime} ms` : "—"}
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-[#171717] bg-[#2457FF] text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
          <p className="mb-3 text-xs font-black tracking-[0.2em] text-white/60">
            HOW IT WORKS
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 text-3xl font-black">01</div>
              <h2 className="font-black">START</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                Press the start button when you're ready.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">02</div>
              <h2 className="font-black">WAIT</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                The screen will change after a random delay.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">03</div>
              <h2 className="font-black">REACT</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                Click as quickly as possible and see your reaction time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-6 py-10 text-sm font-bold text-[#171717]/45 sm:flex-row lg:px-10">
        <p>© 2026 12 MINUTES</p>

        <Link href="/games" className="hover:text-[#171717]">
          ← BACK TO GAMES
        </Link>
      </footer>
    </main>
  );
}
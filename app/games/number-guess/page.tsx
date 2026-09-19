"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type GameStatus = "playing" | "won";

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function NumberGuess() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Pick a number between 1 and 100.");
  const [history, setHistory] = useState<number[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    setTarget(getRandomNumber());
  }, []);

  const startGame = () => {
    setTarget(getRandomNumber());
    setGuess("");
    setAttempts(0);
    setHistory([]);
    setMessage("Pick a number between 1 and 100.");
    setStatus("playing");
  };

  const submitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const number = Number(guess);

    if (!Number.isInteger(number) || number < 1 || number > 100) {
      setMessage("Enter a whole number from 1 to 100.");
      return;
    }

    if (status === "won") return;

    const newAttempts = attempts + 1;

    setAttempts(newAttempts);
    setHistory((current) => [number, ...current]);
    setGuess("");

    if (number === target) {
      setStatus("won");
      setMessage("YOU GOT IT!");

      setBestScore((currentBest) => {
        if (currentBest === null || newAttempts < currentBest) {
          return newAttempts;
        }

        return currentBest;
      });

      return;
    }

    if (number < target) {
      setMessage("Too low. Go higher.");
    } else {
      setMessage("Too high. Go lower.");
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

      {/* Heading */}
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 lg:px-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#171717]/20 bg-white/40 px-4 py-2 text-xs font-black tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-[#F6C945]" />
          GAME 03 / LOGIC
        </div>

        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.07em]">
          NUMBER
          <br />
          <span className="text-[#D5A900]">GUESS.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[#171717]/60">
          I'm thinking of a number between 1 and 100. How quickly can you
          figure it out?
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-5 lg:px-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-[#171717] bg-white px-4 py-4">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              ATTEMPTS
            </p>

            <p className="mt-1 text-2xl font-black">{attempts}</p>
          </div>

          <div className="rounded-2xl border-2 border-[#171717] bg-white px-4 py-4">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              RANGE
            </p>

            <p className="mt-1 text-2xl font-black">1—100</p>
          </div>

          <div className="col-span-2 rounded-2xl border-2 border-[#171717] bg-white px-4 py-4 sm:col-span-1">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              BEST
            </p>

            <p className="mt-1 text-2xl font-black">
              {bestScore !== null ? `${bestScore} guesses` : "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Game */}
      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          {/* Main game */}
          <div
            className={`rounded-[2rem] border-2 border-[#171717] p-7 sm:p-10 ${
              status === "won" ? "bg-[#2E9B65]" : "bg-[#171717]"
            }`}
          >
            {status === "won" ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <p className="text-xs font-black tracking-[0.2em] text-white/60">
                  NICE GUESS
                </p>

                <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl">
                  YOU GOT IT.
                </h2>

                <div className="mt-6 rounded-2xl bg-white px-8 py-5 text-[#171717]">
                  <p className="text-xs font-black tracking-[0.15em] text-[#171717]/40">
                    THE NUMBER WAS
                  </p>

                  <p className="mt-1 text-5xl font-black">{target}</p>
                </div>

                <p className="mt-5 text-sm font-bold text-white/70">
                  You got it in {attempts}{" "}
                  {attempts === 1 ? "guess" : "guesses"}.
                </p>

                <button
                  type="button"
                  onClick={startGame}
                  className="mt-8 rounded-xl bg-[#171717] px-8 py-4 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
                >
                  PLAY AGAIN
                </button>
              </div>
            ) : (
              <div className="flex min-h-[430px] flex-col justify-center">
                <p className="text-center text-xs font-black tracking-[0.2em] text-white/40">
                  YOUR GUESS
                </p>

                <form
                  onSubmit={submitGuess}
                  className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3"
                >
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={guess}
                    onChange={(event) => setGuess(event.target.value)}
                    placeholder="?"
                    aria-label="Your number guess"
                    className="w-full rounded-2xl border-2 border-white/10 bg-white px-6 py-5 text-center text-5xl font-black text-[#171717] outline-none transition-colors focus:border-[#F6C945]"
                  />

                  <button
                    type="submit"
                    className="rounded-2xl bg-[#F6C945] px-6 py-5 text-sm font-black text-[#171717] transition-transform hover:-translate-y-0.5"
                  >
                    MAKE GUESS
                  </button>
                </form>

                <div
                  aria-live="polite"
                  className="mx-auto mt-7 min-h-12 max-w-md text-center text-lg font-black text-[#F4F0E8]"
                >
                  {message}
                </div>
              </div>
            )}
          </div>

          {/* Guess history */}
          <aside className="rounded-[2rem] border-2 border-[#171717] bg-white p-6">
            <div className="flex items-center justify-between border-b-2 border-[#171717] pb-4">
              <h2 className="text-sm font-black tracking-[0.12em]">
                YOUR GUESSES
              </h2>

              <span className="text-xs font-black text-[#171717]/35">
                {history.length}
              </span>
            </div>

            {history.length === 0 ? (
              <p className="py-8 text-sm font-medium leading-relaxed text-[#171717]/45">
                Your guesses will appear here.
              </p>
            ) : (
              <div className="mt-4 flex max-h-[330px] flex-wrap content-start gap-2 overflow-auto">
                {history.map((number, index) => (
                  <span
                    key={`${number}-${index}`}
                    className="rounded-full border-2 border-[#171717] px-4 py-2 text-sm font-black"
                  >
                    {number}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={startGame}
              className="mt-6 w-full rounded-xl border-2 border-[#171717] px-4 py-3 text-xs font-black transition-colors hover:bg-[#171717] hover:text-white"
            >
              NEW NUMBER
            </button>
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-[#171717] bg-[#2E9B65] text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
          <p className="mb-3 text-xs font-black tracking-[0.2em] text-white/60">
            HOW IT WORKS
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 text-3xl font-black">01</div>
              <h2 className="font-black">PICK</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                Enter any whole number between 1 and 100.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">02</div>
              <h2 className="font-black">LISTEN</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                We'll tell you whether you need to go higher or lower.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">03</div>
              <h2 className="font-black">SOLVE</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">
                Find the number using as few guesses as possible.
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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const symbols = ["★", "●", "▲", "◆", "♥", "☀"];

type Card = {
  id: number;
  symbol: string;
  matched: boolean;
};

function createDeck(): Card[] {
  const doubled = [...symbols, ...symbols];

  return doubled
    .map((symbol, index) => ({
      id: index,
      symbol,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  useEffect(() => {
    setCards(createDeck());
  }, []);

  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const timer = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (flipped.length !== 2) return;

    const first = cards[flipped[0]];
    const second = cards[flipped[1]];

    if (!first || !second) return;

    setMoves((current) => current + 1);

    if (first.symbol === second.symbol) {
      setCards((currentCards) =>
        currentCards.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, matched: true }
            : card
        )
      );

      setFlipped([]);
    } else {
      const timeout = setTimeout(() => {
        setFlipped([]);
      }, 750);

      return () => clearTimeout(timeout);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (
      cards.length > 0 &&
      cards.every((card) => card.matched)
    ) {
      setGameWon(true);

      setBestMoves((currentBest) => {
        if (currentBest === null || moves < currentBest) {
          return moves;
        }

        return currentBest;
      });
    }
  }, [cards, moves]);

  const startGame = () => {
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setGameStarted(true);
    setGameWon(false);
  };

  const handleCardClick = (index: number) => {
    if (!gameStarted || gameWon) return;
    if (flipped.length >= 2) return;
    if (flipped.includes(index)) return;
    if (cards[index]?.matched) return;

    setFlipped((current) => [...current, index]);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");

    const secondsPart = (totalSeconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${secondsPart}`;
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
          <span className="h-2 w-2 rounded-full bg-[#2457FF]" />
          GAME 02 / BRAIN
        </div>

        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.07em]">
          MEMORY
          <br />
          <span className="text-[#2457FF]">MATCH.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[#171717]/60">
          Flip the cards, remember where everything is, and match all six
          pairs in as few moves as possible.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-5 lg:px-10">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border-2 border-[#171717] bg-white px-4 py-4">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              MOVES
            </p>
            <p className="mt-1 text-2xl font-black">{moves}</p>
          </div>

          <div className="rounded-2xl border-2 border-[#171717] bg-white px-4 py-4">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              TIME
            </p>
            <p className="mt-1 text-2xl font-black">
              {formatTime(seconds)}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#171717] bg-white px-4 py-4">
            <p className="text-[10px] font-black tracking-[0.15em] text-[#171717]/40">
              BEST
            </p>
            <p className="mt-1 text-2xl font-black">
              {bestMoves !== null ? `${bestMoves} moves` : "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Game */}
      <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-10">
        <div className="relative rounded-[2rem] border-2 border-[#171717] bg-[#171717] p-5 sm:p-8">
          {!gameStarted && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[1.8rem] bg-[#171717]/95 px-6 text-center">
              <p className="text-xs font-black tracking-[0.2em] text-white/40">
                READY?
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#F4F0E8] sm:text-5xl">
                TEST YOUR MEMORY.
              </h2>

              <button
                type="button"
                onClick={startGame}
                className="mt-8 rounded-xl bg-[#F4F0E8] px-8 py-4 text-sm font-black text-[#171717] transition-transform hover:-translate-y-0.5"
              >
                START GAME
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {cards.map((card, index) => {
              const isFlipped =
                flipped.includes(index) || card.matched;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  disabled={
                    !gameStarted ||
                    card.matched ||
                    flipped.length >= 2
                  }
                  className={`aspect-square rounded-2xl border-2 text-3xl font-black transition-all duration-200 sm:text-4xl ${
                    isFlipped
                      ? "rotate-0 border-[#F4F0E8] bg-[#F4F0E8] text-[#171717]"
                      : "border-white/10 bg-[#2457FF] text-transparent hover:-translate-y-1 hover:bg-[#3264ff]"
                  } ${
                    card.matched
                      ? "border-[#2E9B65] bg-[#2E9B65] text-white"
                      : ""
                  }`}
                >
                  {isFlipped ? card.symbol : "?"}
                </button>
              );
            })}
          </div>

          {gameWon && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[1.8rem] bg-[#171717]/96 px-6 text-center">
              <p className="text-xs font-black tracking-[0.2em] text-[#2E9B65]">
                YOU DID IT
              </p>

              <h2 className="mt-3 text-5xl font-black tracking-[-0.06em] text-[#F4F0E8]">
                MEMORY MASTER.
              </h2>

              <p className="mt-4 text-sm font-medium text-white/50">
                {moves} moves · {formatTime(seconds)}
              </p>

              <button
                type="button"
                onClick={startGame}
                className="mt-8 rounded-xl bg-[#F4F0E8] px-8 py-4 text-sm font-black text-[#171717]"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={startGame}
          className="mt-5 w-full rounded-2xl border-2 border-[#171717] bg-white px-6 py-5 text-sm font-black transition-all hover:bg-[#171717] hover:text-[#F4F0E8]"
        >
          {gameStarted ? "RESTART GAME" : "START GAME"}
        </button>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-[#171717] bg-[#F6C945]">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
          <p className="mb-3 text-xs font-black tracking-[0.2em] text-[#171717]/50">
            HOW IT WORKS
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 text-3xl font-black">01</div>
              <h2 className="font-black">FLIP</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#171717]/60">
                Choose any card to reveal what's hiding underneath.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">02</div>
              <h2 className="font-black">REMEMBER</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#171717]/60">
                Remember the symbols and where you've seen them.
              </p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-black">03</div>
              <h2 className="font-black">MATCH</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#171717]/60">
                Find all six pairs using as few moves as possible.
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
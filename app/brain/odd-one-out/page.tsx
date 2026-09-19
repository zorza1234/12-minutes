"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

type Round = {
  items: string[];
  oddIndex: number;
};

const SHAPES = ["●", "●", "●", "●", "●", "●", "●", "●", "●", "●", "●", "●"];

const createRound = (difficulty: Difficulty): Round => {
  const normal = SHAPES[Math.floor(Math.random() * SHAPES.length)];

  const oddShapes =
    difficulty === "easy"
      ? ["■", "▲", "◆"]
      : difficulty === "medium"
        ? ["○", "□", "△", "◇"]
        : ["◉", "◎", "⬢", "✦"];

  const odd = oddShapes[Math.floor(Math.random() * oddShapes.length)];

  const sizes =
    difficulty === "easy"
      ? 9
      : difficulty === "medium"
        ? 16
        : 25;

  const items = Array.from({ length: sizes }, () => normal);
  const oddIndex = Math.floor(Math.random() * sizes);

  items[oddIndex] = odd;

  return {
    items,
    oddIndex,
  };
};

export default function OddOneOutPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [round, setRound] = useState<Round>(() => createRound("easy"));

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [timeLeft, setTimeLeft] = useState(12);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const gridClass = useMemo(() => {
    if (difficulty === "easy") {
      return "grid grid-cols-3";
    }

    if (difficulty === "medium") {
      return "grid grid-cols-4";
    }

    return "grid grid-cols-5";
  }, [difficulty]);

  const nextRound = useCallback(() => {
    setRound(createRound(difficulty));
    setSelected(null);
    setFeedback(null);
    setTimeLeft(difficulty === "easy" ? 12 : difficulty === "medium" ? 10 : 8);
  }, [difficulty]);

  const startGame = (newDifficulty: Difficulty = difficulty) => {
    setDifficulty(newDifficulty);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelected(null);
    setFeedback(null);
    setGameOver(false);
    setTimeLeft(
      newDifficulty === "easy"
        ? 12
        : newDifficulty === "medium"
          ? 10
          : 8
    );
    setRound(createRound(newDifficulty));
  };

  useEffect(() => {
    if (gameOver || feedback !== null) {
      return;
    }

    if (timeLeft <= 0) {
      setFeedback("wrong");
      setStreak(0);

      const timer = setTimeout(() => {
        setGameOver(true);
      }, 700);

      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setTimeLeft((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, feedback]);

  const handlePick = (index: number) => {
    if (gameOver || feedback !== null) {
      return;
    }

    setSelected(index);

    if (index === round.oddIndex) {
      const newStreak = streak + 1;

      setScore((value) => value + 1);
      setStreak(newStreak);
      setBestStreak((value) => Math.max(value, newStreak));
      setFeedback("correct");

      setTimeout(() => {
        nextRound();
      }, 650);
    } else {
      setStreak(0);
      setFeedback("wrong");

      setTimeout(() => {
        setGameOver(true);
      }, 700);
    }
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
          href="/brain"
          className="text-sm font-black uppercase tracking-[0.12em] hover:-translate-y-0.5"
        >
          ← Brain
        </a>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-8">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#2457FF]">
            Brain Challenge
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            FIND THE ODD ONE.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-lg">
            Everything looks almost the same. One symbol doesn't belong.
            Find it before the clock runs out.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="border-2 border-[#171717] bg-white p-4 text-center shadow-[4px_4px_0_#171717]">
            <div className="text-xs font-black uppercase tracking-wider text-black/50">
              Score
            </div>
            <div className="mt-1 text-3xl font-black">{score}</div>
          </div>

          <div className="border-2 border-[#171717] bg-[#F6C945] p-4 text-center shadow-[4px_4px_0_#171717]">
            <div className="text-xs font-black uppercase tracking-wider">
              Streak
            </div>
            <div className="mt-1 text-3xl font-black">{streak}</div>
          </div>

          <div className="border-2 border-[#171717] bg-white p-4 text-center shadow-[4px_4px_0_#171717]">
            <div className="text-xs font-black uppercase tracking-wider text-black/50">
              Time
            </div>
            <div className="mt-1 text-3xl font-black">{timeLeft}s</div>
          </div>
        </div>

        {/* DIFFICULTY */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => startGame(level)}
              className={`border-2 border-[#171717] px-5 py-2 text-xs font-black uppercase tracking-wider ${
                difficulty === level
                  ? "bg-[#171717] text-white"
                  : "bg-white hover:-translate-y-1"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* GAME */}
        <div className="relative border-2 border-[#171717] bg-white p-5 shadow-[8px_8px_0_#171717] sm:p-8">
          {/* TIMER BAR */}
          <div className="mb-6 h-3 overflow-hidden border-2 border-[#171717] bg-[#F4F0E8]">
            <div
              className="h-full bg-[#FF5A36] transition-all duration-1000 ease-linear"
              style={{
                width: `${Math.max(
                  0,
                  (timeLeft /
                    (difficulty === "easy"
                      ? 12
                      : difficulty === "medium"
                        ? 10
                        : 8)) *
                    100
                )}%`,
              }}
            />
          </div>

          <div className="mb-6 text-center">
            <p className="text-sm font-black uppercase tracking-wider text-black/50">
              Which one is different?
            </p>
          </div>

          {/* SYMBOL GRID */}
          <div
            className={`${gridClass} mx-auto max-w-2xl gap-3 sm:gap-4`}
          >
            {round.items.map((symbol, index) => {
              const isSelected = selected === index;
              const isCorrect = index === round.oddIndex;

              let background = "bg-[#F4F0E8]";

              if (feedback === "correct" && isCorrect) {
                background = "bg-[#2E9B65] text-white";
              }

              if (feedback === "wrong" && isSelected) {
                background = "bg-[#FF5A36] text-white";
              }

              return (
                <button
                  key={`${symbol}-${index}`}
                  onClick={() => handlePick(index)}
                  disabled={gameOver || feedback !== null}
                  aria-label={`Symbol ${index + 1}`}
                  className={`aspect-square border-2 border-[#171717] ${background} flex items-center justify-center text-3xl font-black shadow-[3px_3px_0_#171717] transition-all duration-150 hover:-translate-y-1 hover:shadow-[5px_5px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#171717] sm:text-4xl`}
                >
                  {symbol}
                </button>
              );
            })}
          </div>

          {/* FEEDBACK */}
          {feedback === "correct" && (
            <div className="mt-7 text-center text-2xl font-black text-[#2E9B65]">
              ✓ NICE. KEEP GOING.
            </div>
          )}

          {feedback === "wrong" && (
            <div className="mt-7 text-center text-2xl font-black text-[#FF5A36]">
              ✕ GOTCHA.
            </div>
          )}

          {/* GAME OVER */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F4F0E8]/95 p-6">
              <div className="w-full max-w-md border-2 border-[#171717] bg-white p-8 text-center shadow-[8px_8px_0_#171717]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF5A36]">
                  Time's up
                </p>

                <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
                  {score} POINTS
                </h2>

                <p className="mt-3 font-medium text-black/60">
                  Best streak:{" "}
                  <span className="font-black text-black">
                    {bestStreak}
                  </span>
                </p>

                <button
                  onClick={() => startGame()}
                  className="mt-7 w-full border-2 border-[#171717] bg-[#FF5A36] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[5px_5px_0_#171717] hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#171717]"
                >
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}
        </div>

        {/* HOW TO PLAY */}
        <div className="mt-10 border-t-2 border-[#171717] pt-7">
          <h2 className="text-lg font-black uppercase tracking-wider">
            How to play
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="bg-[#F6C945] p-4">
              <div className="text-2xl font-black">01</div>
              <p className="mt-2 text-sm font-bold">
                Look at all the symbols.
              </p>
            </div>

            <div className="bg-[#2457FF] p-4 text-white">
              <div className="text-2xl font-black">02</div>
              <p className="mt-2 text-sm font-bold">
                Find the one that is different.
              </p>
            </div>

            <div className="bg-[#2E9B65] p-4 text-white">
              <div className="text-2xl font-black">03</div>
              <p className="mt-2 text-sm font-bold">
                Click it before time runs out.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
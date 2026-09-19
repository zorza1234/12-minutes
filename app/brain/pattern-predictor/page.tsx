"use client";

import { useCallback, useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

type Pattern = {
  sequence: number[];
  answer: number;
  options: number[];
};

const shuffle = <T,>(items: T[]): T[] => {
  return [...items].sort(() => Math.random() - 0.5);
};

const createPattern = (difficulty: Difficulty): Pattern => {
  let sequence: number[] = [];
  let answer = 0;

  if (difficulty === "easy") {
    const start = Math.floor(Math.random() * 10) + 1;
    const step = Math.floor(Math.random() * 5) + 2;

    sequence = Array.from({ length: 4 }, (_, i) => start + i * step);
    answer = start + 4 * step;
  }

  if (difficulty === "medium") {
    const start = Math.floor(Math.random() * 8) + 2;
    const step = Math.floor(Math.random() * 4) + 2;

    sequence = [
      start,
      start + step,
      start + step * 2,
      start + step * 3,
      start + step * 4,
    ];

    answer = start + step * 5;
  }

  if (difficulty === "hard") {
    const start = Math.floor(Math.random() * 5) + 1;
    const multiplier = Math.random() > 0.5 ? 2 : 3;

    sequence = [
      start,
      start * multiplier,
      start * multiplier * multiplier,
      start * multiplier * multiplier * multiplier,
    ];

    answer = start * multiplier * multiplier * multiplier * multiplier;
  }

  const wrongAnswers = new Set<number>();

  while (wrongAnswers.size < 3) {
    const offset = Math.floor(Math.random() * 9) + 1;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const wrong = answer + offset * direction;

    if (wrong > 0 && wrong !== answer) {
      wrongAnswers.add(wrong);
    }
  }

  return {
    sequence,
    answer,
    options: shuffle([answer, ...wrongAnswers]),
  };
};

export default function PatternPredictorPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [pattern, setPattern] = useState<Pattern>(() =>
    createPattern("easy")
  );

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [timeLeft, setTimeLeft] = useState(12);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(
    null
  );
  const [gameOver, setGameOver] = useState(false);

  const getTime = (level: Difficulty) => {
    if (level === "easy") return 12;
    if (level === "medium") return 10;
    return 8;
  };

  const nextRound = useCallback(() => {
    setPattern(createPattern(difficulty));
    setSelected(null);
    setFeedback(null);
    setTimeLeft(getTime(difficulty));
  }, [difficulty]);

  const startGame = (newDifficulty: Difficulty = difficulty) => {
    setDifficulty(newDifficulty);
    setPattern(createPattern(newDifficulty));

    setScore(0);
    setStreak(0);
    setBestStreak(0);

    setSelected(null);
    setFeedback(null);
    setGameOver(false);
    setTimeLeft(getTime(newDifficulty));
  };

  useEffect(() => {
    if (gameOver || feedback !== null) {
      return;
    }

    if (timeLeft <= 0) {
      setFeedback("timeout");
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

  const handleAnswer = (value: number) => {
    if (gameOver || feedback !== null) {
      return;
    }

    setSelected(value);

    if (value === pattern.answer) {
      const newStreak = streak + 1;

      setScore((current) => current + 1);
      setStreak(newStreak);
      setBestStreak((current) => Math.max(current, newStreak));

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

  const totalTime = getTime(difficulty);

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
            PREDICT THE PATTERN.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-lg">
            Look for the rule, figure out what comes next, and answer before
            the clock hits zero.
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
          {/* TIMER */}
          <div className="mb-8 h-3 overflow-hidden border-2 border-[#171717] bg-[#F4F0E8]">
            <div
              className="h-full bg-[#2457FF] transition-all duration-1000 ease-linear"
              style={{
                width: `${Math.max(0, (timeLeft / totalTime) * 100)}%`,
              }}
            />
          </div>

          {/* QUESTION */}
          <div className="question-area text-center">
            <p className="mb-7 text-sm font-black uppercase tracking-wider text-black/50">
              What comes next?
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              {pattern.sequence.map((number, index) => (
                <div
                  key={`${number}-${index}`}
                  className="flex h-16 min-w-16 items-center justify-center border-2 border-[#171717] bg-[#F4F0E8] px-4 text-2xl font-black shadow-[4px_4px_0_#171717] sm:h-20 sm:min-w-20 sm:text-3xl"
                >
                  {number}
                </div>
              ))}

              <div className="flex h-16 min-w-16 items-center justify-center border-2 border-[#171717] bg-[#F6C945] px-4 text-3xl font-black shadow-[4px_4px_0_#171717] sm:h-20 sm:min-w-20 sm:text-4xl">
                ?
              </div>
            </div>
          </div>

          {/* ANSWERS */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {pattern.options.map((option) => {
              const isSelected = selected === option;
              const isCorrect = option === pattern.answer;

              let background = "bg-[#F4F0E8]";

              if (feedback === "correct" && isCorrect) {
                background = "bg-[#2E9B65] text-white";
              }

              if (feedback === "wrong" && isSelected) {
                background = "bg-[#FF5A36] text-white";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={gameOver || feedback !== null}
                  className={`border-2 border-[#171717] ${background} px-5 py-5 text-2xl font-black shadow-[4px_4px_0_#171717] transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#171717]`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* FEEDBACK */}
          {feedback === "correct" && (
            <div className="feedback-correct mt-7 text-center text-2xl font-black text-[#2E9B65]">
              ✓ YOU SAW THE PATTERN.
            </div>
          )}

          {feedback === "wrong" && (
            <div className="feedback-wrong mt-7 text-center text-2xl font-black text-[#FF5A36]">
              ✕ WRONG PATTERN.
            </div>
          )}

          {feedback === "timeout" && (
            <div className="feedback-wrong mt-7 text-center text-2xl font-black text-[#FF5A36]">
              TIME'S UP.
            </div>
          )}

          {/* GAME OVER */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F4F0E8]/95 p-6">
              <div className="w-full max-w-md border-2 border-[#171717] bg-white p-8 text-center shadow-[8px_8px_0_#171717]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2457FF]">
                  Pattern complete
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
                  className="mt-7 w-full border-2 border-[#171717] bg-[#2457FF] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[5px_5px_0_#171717] hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#171717]"
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
                Study the numbers.
              </p>
            </div>

            <div className="bg-[#2457FF] p-4 text-white">
              <div className="text-2xl font-black">02</div>
              <p className="mt-2 text-sm font-bold">
                Find the hidden rule.
              </p>
            </div>

            <div className="bg-[#2E9B65] p-4 text-white">
              <div className="text-2xl font-black">03</div>
              <p className="mt-2 text-sm font-bold">
                Pick what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
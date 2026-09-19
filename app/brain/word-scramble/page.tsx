"use client";

import { useCallback, useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

const WORDS: Record<Difficulty, string[]> = {
  easy: [
    "APPLE",
    "CHAIR",
    "CLOUD",
    "HOUSE",
    "LIGHT",
    "MUSIC",
    "PLANT",
    "PHONE",
    "RIVER",
    "SMILE",
  ],
  medium: [
    "JOURNEY",
    "MYSTERY",
    "PLANET",
    "SUNSET",
    "THUNDER",
    "CAPTURE",
    "PICTURE",
    "MONSTER",
    "BALANCE",
    "DIGITAL",
  ],
  hard: [
    "ADVENTURE",
    "CREATIVE",
    "KNOWLEDGE",
    "CHALLENGE",
    "DISCOVERY",
    "IMPORTANT",
    "TECHNOLOGY",
    "COMMUNITY",
    "LANGUAGE",
    "EXPERIMENT",
  ],
};

const shuffleWord = (word: string) => {
  let shuffled = word;

  while (shuffled === word) {
    shuffled = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  return shuffled;
};

const getTime = (difficulty: Difficulty) => {
  if (difficulty === "easy") return 15;
  if (difficulty === "medium") return 12;
  return 10;
};

const getRandomWord = (difficulty: Difficulty) => {
  const words = WORDS[difficulty];
  return words[Math.floor(Math.random() * words.length)];
};

export default function WordScramblePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const [word, setWord] = useState("APPLE");
  const [scrambled, setScrambled] = useState("PLEAP");

  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | "timeout" | null
  >(null);

  const [gameOver, setGameOver] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const startRound = useCallback((level: Difficulty) => {
    const newWord = getRandomWord(level);

    setWord(newWord);
    setScrambled(shuffleWord(newWord));
    setAnswer("");
    setFeedback(null);
    setHintUsed(false);
    setTimeLeft(getTime(level));
  }, []);

  const startGame = (level: Difficulty = difficulty) => {
    setDifficulty(level);

    setScore(0);
    setStreak(0);
    setBestStreak(0);

    setFeedback(null);
    setGameOver(false);

    startRound(level);
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
      }, 800);

      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setTimeLeft((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, feedback]);

  const submitAnswer = () => {
    if (gameOver || feedback !== null || !answer.trim()) {
      return;
    }

    const cleanAnswer = answer.trim().toUpperCase();

    if (cleanAnswer === word) {
      const newStreak = streak + 1;

      setScore((value) => value + 1);
      setStreak(newStreak);
      setBestStreak((value) => Math.max(value, newStreak));

      setFeedback("correct");

      setTimeout(() => {
        startRound(difficulty);
      }, 700);
    } else {
      setStreak(0);
      setFeedback("wrong");

      setTimeout(() => {
        setGameOver(true);
      }, 800);
    }
  };

  const useHint = () => {
    if (hintUsed || gameOver || feedback !== null) {
      return;
    }

    setHintUsed(true);

    setAnswer(word[0]);
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
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#2E9B65]">
            Brain Challenge
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            UNSCRAMBLE IT.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-lg">
            The letters are mixed up. Put them back in the right order before
            time runs out.
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
              className="h-full bg-[#2E9B65] transition-all duration-1000 ease-linear"
              style={{
                width: `${Math.max(0, (timeLeft / totalTime) * 100)}%`,
              }}
            />
          </div>

          {/* SCRAMBLED WORD */}
          <div className="text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-black/50">
              Unscramble this
            </p>

            <div className="mx-auto inline-flex min-h-24 items-center justify-center border-2 border-[#171717] bg-[#F6C945] px-6 py-5 shadow-[6px_6px_0_#171717]">
              <span className="text-4xl font-black tracking-[0.12em] sm:text-6xl">
                {scrambled}
              </span>
            </div>
          </div>

          {/* INPUT */}
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value.toUpperCase())
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitAnswer();
                }
              }}
              disabled={gameOver || feedback !== null}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="TYPE YOUR ANSWER"
              className="min-w-0 flex-1 border-2 border-[#171717] bg-[#F4F0E8] px-5 py-4 text-lg font-black uppercase outline-none placeholder:text-black/30 focus:bg-white"
            />

            <button
              onClick={submitAnswer}
              disabled={gameOver || feedback !== null}
              className="border-2 border-[#171717] bg-[#171717] px-7 py-4 font-black uppercase tracking-wider text-white shadow-[4px_4px_0_#FF5A36] hover:-translate-y-1 hover:shadow-[6px_6px_0_#FF5A36] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#FF5A36]"
            >
              CHECK
            </button>
          </div>

          {/* HINT */}
          <div className="mt-5 text-center">
            <button
              onClick={useHint}
              disabled={hintUsed || gameOver || feedback !== null}
              className="text-sm font-black uppercase tracking-wider underline decoration-2 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {hintUsed ? `Hint: starts with ${word[0]}` : "Need a hint?"}
            </button>
          </div>

          {/* FEEDBACK */}
          {feedback === "correct" && (
            <div className="feedback-correct mt-7 text-center text-2xl font-black text-[#2E9B65]">
              ✓ WORD FOUND.
            </div>
          )}

          {feedback === "wrong" && (
            <div className="feedback-wrong mt-7 text-center text-2xl font-black text-[#FF5A36]">
              ✕ NOT QUITE.
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
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2E9B65]">
                  Scramble complete
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
                  className="mt-7 w-full border-2 border-[#171717] bg-[#2E9B65] px-6 py-4 font-black uppercase tracking-wider text-white shadow-[5px_5px_0_#171717] hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#171717]"
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
                Look at the scrambled letters.
              </p>
            </div>

            <div className="bg-[#2457FF] p-4 text-white">
              <div className="text-2xl font-black">02</div>
              <p className="mt-2 text-sm font-bold">
                Figure out the hidden word.
              </p>
            </div>

            <div className="bg-[#2E9B65] p-4 text-white">
              <div className="text-2xl font-black">03</div>
              <p className="mt-2 text-sm font-bold">
                Type it and keep your streak alive.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
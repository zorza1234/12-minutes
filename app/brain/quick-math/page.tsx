"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Difficulty = "easy" | "medium" | "hard";

type Question = {
  text: string;
  answer: number;
};

function generateQuestion(difficulty: Difficulty): Question {
  let a = 0;
  let b = 0;
  let answer = 0;
  let text = "";

  if (difficulty === "easy") {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;

    const operation = Math.random() > 0.5 ? "+" : "-";

    if (operation === "+") {
      answer = a + b;
      text = `${a} + ${b}`;
    } else {
      if (b > a) [a, b] = [b, a];

      answer = a - b;
      text = `${a} − ${b}`;
    }
  }

  if (difficulty === "medium") {
    a = Math.floor(Math.random() * 30) + 5;
    b = Math.floor(Math.random() * 15) + 2;

    const operation = Math.random() > 0.5 ? "×" : "+";

    if (operation === "×") {
      answer = a * b;
      text = `${a} × ${b}`;
    } else {
      answer = a + b;
      text = `${a} + ${b}`;
    }
  }

  if (difficulty === "hard") {
    a = Math.floor(Math.random() * 40) + 10;
    b = Math.floor(Math.random() * 20) + 2;

    const operation = Math.floor(Math.random() * 3);

    if (operation === 0) {
      answer = a * b;
      text = `${a} × ${b}`;
    } else if (operation === 1) {
      answer = a + b;
      text = `${a} + ${b}`;
    } else {
      const multiplier = Math.floor(Math.random() * 8) + 2;
      const first = Math.floor(Math.random() * 20) + 2;
      const second = first * multiplier;

      answer = multiplier;
      text = `${second} ÷ ${first}`;
    }
  }

  return { text, answer };
}

export default function QuickMathPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [question, setQuestion] = useState<Question>(() =>
    generateQuestion("easy")
  );

  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | "timeout" | null
  >(null);

  const [gameOver, setGameOver] = useState(false);

  const startQuestion = (level: Difficulty = difficulty) => {
    setQuestion(generateQuestion(level));
    setAnswer("");
    setTimeLeft(10);
    setFeedback(null);
  };

  useEffect(() => {
    if (gameOver || feedback) return;

    if (timeLeft <= 0) {
      setFeedback("timeout");
      setStreak(0);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, feedback]);

  const submitAnswer = () => {
    if (!answer.trim() || feedback || gameOver) return;

    const userAnswer = Number(answer);

    if (userAnswer === question.answer) {
      const newStreak = streak + 1;

      setScore((current) => current + 1);
      setStreak(newStreak);
      setBestStreak((best) => Math.max(best, newStreak));
      setFeedback("correct");

      setTimeout(() => {
        startQuestion(difficulty);
      }, 700);
    } else {
      setStreak(0);
      setFeedback("wrong");
    }
  };

  const nextAfterWrong = () => {
    if (score >= 10) {
      setGameOver(true);
      return;
    }

    startQuestion(difficulty);
  };

  const changeDifficulty = (level: Difficulty) => {
    setDifficulty(level);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    startQuestion(level);
  };

  const restart = () => {
    setScore(0);
    setStreak(0);
    setGameOver(false);
    startQuestion(difficulty);
  };

  return (
    <main className="min-h-screen bg-[#F4F0E8] text-[#171717]">
      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-[#171717] px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-black tracking-tight hover:opacity-70"
        >
          12 MINUTES.
        </Link>

        <Link
          href="/"
          className="font-bold uppercase tracking-wide hover:opacity-60"
        >
          ← Home
        </Link>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-4xl px-6 py-10 md:px-10">
        <div className="mb-8">
          <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#2457FF]">
            Test Your Brain · 01
          </p>

          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            Quick
            <br />
            Math.
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium">
            Solve as many calculations as you can. You get 10 seconds per
            question.
          </p>
        </div>

        {/* Difficulty */}
        <div className="mb-8 flex flex-wrap gap-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => changeDifficulty(level)}
              className={`rounded-full border-2 border-[#171717] px-5 py-2 font-black uppercase transition-all ${
                difficulty === level
                  ? "bg-[#171717] text-white"
                  : "bg-white hover:-translate-y-1"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Score row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="border-2 border-[#171717] bg-white p-4 text-center">
            <p className="text-xs font-black uppercase text-gray-500">
              Score
            </p>
            <p className="mt-1 text-3xl font-black">{score}</p>
          </div>

          <div className="streak-box border-2 border-[#171717] bg-[#F6C945] p-4 text-center">
            <p className="text-xs font-black uppercase">Streak</p>
            <p className="mt-1 text-3xl font-black">{streak}</p>
          </div>

          <div className="border-2 border-[#171717] bg-white p-4 text-center">
            <p className="text-xs font-black uppercase text-gray-500">
              Best
            </p>
            <p className="mt-1 text-3xl font-black">{bestStreak}</p>
          </div>
        </div>

        {/* Game card */}
        <div className="relative overflow-hidden border-2 border-[#171717] bg-white p-6 shadow-[8px_8px_0_#171717] md:p-12">
          {/* Timer */}
          <div className="mb-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest">
                Time
              </span>

              <span
                className={`text-2xl font-black ${
                  timeLeft <= 3 ? "text-[#FF5A36]" : ""
                }`}
              >
                {timeLeft}s
              </span>
            </div>

            <div className="h-3 overflow-hidden border-2 border-[#171717] bg-[#F4F0E8]">
              <div
                className={`timer-bar h-full ${
                  timeLeft <= 3 ? "bg-[#FF5A36]" : "bg-[#2457FF]"
                }`}
                style={{ width: `${(timeLeft / 10) * 100}%` }}
              />
            </div>
          </div>

          {!gameOver ? (
            <>
              {/* Question */}
              <div
                className={`question-area mb-8 text-center ${
                  feedback === "correct"
                    ? "question-correct"
                    : feedback === "wrong"
                      ? "question-wrong"
                      : ""
                }`}
              >
                <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                  Solve this
                </p>

                <div className="text-6xl font-black md:text-8xl">
                  {question.text}
                </div>
              </div>

              {/* Answer */}
              <div className="mx-auto flex max-w-lg flex-col gap-4">
                <input
                  type="number"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      submitAnswer();
                    }
                  }}
                  disabled={!!feedback}
                  autoFocus
                  placeholder="Your answer"
                  className="w-full border-2 border-[#171717] bg-[#F4F0E8] px-5 py-4 text-center text-2xl font-black outline-none transition focus:bg-white focus:shadow-[5px_5px_0_#171717]"
                />

                {!feedback && (
                  <button
                    onClick={submitAnswer}
                    className="w-full border-2 border-[#171717] bg-[#2457FF] px-5 py-4 font-black uppercase text-white transition hover:-translate-y-1 hover:shadow-[5px_5px_0_#171717] active:translate-y-0 active:shadow-none"
                  >
                    Check Answer →
                  </button>
                )}

                {feedback === "correct" && (
                  <div className="feedback-correct border-2 border-[#171717] bg-[#2E9B65] p-5 text-center text-xl font-black uppercase text-white">
                    ✓ Correct!
                  </div>
                )}

                {feedback === "wrong" && (
                  <>
                    <div className="feedback-wrong border-2 border-[#171717] bg-[#FF5A36] p-5 text-center font-black text-white">
                      <p className="text-xl uppercase">Not quite!</p>
                      <p className="mt-1 text-sm">
                        Answer: {question.answer}
                      </p>
                    </div>

                    <button
                      onClick={nextAfterWrong}
                      className="border-2 border-[#171717] bg-[#171717] px-5 py-4 font-black uppercase text-white hover:bg-white hover:text-[#171717]"
                    >
                      Next Question →
                    </button>
                  </>
                )}

                {feedback === "timeout" && (
                  <>
                    <div className="feedback-wrong border-2 border-[#171717] bg-[#FF5A36] p-5 text-center font-black text-white">
                      <p className="text-xl uppercase">Time's Up!</p>
                      <p className="mt-1 text-sm">
                        Answer: {question.answer}
                      </p>
                    </div>

                    <button
                      onClick={nextAfterWrong}
                      className="border-2 border-[#171717] bg-[#171717] px-5 py-4 font-black uppercase text-white hover:bg-white hover:text-[#171717]"
                    >
                      Next Question →
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2457FF]">
                Challenge Complete
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase">
                Nice Work.
              </h2>

              <p className="mt-4 text-xl font-medium">
                You scored <strong>{score}</strong>.
              </p>

              <button
                onClick={restart}
                className="mt-8 border-2 border-[#171717] bg-[#F6C945] px-8 py-4 font-black uppercase hover:-translate-y-1 hover:shadow-[5px_5px_0_#171717]"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-10 border-t-2 border-[#171717] pt-6">
          <p className="text-sm font-black uppercase tracking-widest">
            How it works
          </p>

          <p className="mt-2 font-medium text-gray-600">
            Pick a difficulty, solve the calculation before time runs out, and
            build the longest streak you can.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#171717] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <p className="font-black">12 MINUTES.</p>

          <Link
            href="/"
            className="text-sm font-bold uppercase hover:opacity-60"
          >
            Back Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
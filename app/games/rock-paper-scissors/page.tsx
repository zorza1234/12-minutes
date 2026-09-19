"use client";

import { useState } from "react";
import Link from "next/link";

type Choice = "rock" | "paper" | "scissors";

const choices: { name: Choice; symbol: string }[] = [
  { name: "rock", symbol: "✊" },
  { name: "paper", symbol: "✋" },
  { name: "scissors", symbol: "✌️" },
];

function getWinner(player: Choice, computer: Choice) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [draws, setDraws] = useState(0);

  const playRound = (choice: Choice) => {
    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;

    const roundResult = getWinner(choice, randomChoice);

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setResult(roundResult);

    if (roundResult === "win") {
      setPlayerScore((score) => score + 1);
    } else if (roundResult === "lose") {
      setComputerScore((score) => score + 1);
    } else {
      setDraws((score) => score + 1);
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setDraws(0);
  };

  const getSymbol = (choice: Choice | null) => {
    if (!choice) return "—";
    return choices.find((item) => item.name === choice)?.symbol;
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
          href="/games"
          className="font-bold uppercase tracking-wide hover:opacity-60"
        >
          ← Games
        </Link>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <div className="mb-10">
          <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#2E9B65]">
            Game 04
          </p>

          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            Rock.
            <br />
            Paper.
            <br />
            Scissors.
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium">
            Pick your move. The computer picks theirs. Best of luck.
          </p>
        </div>

        {/* Scoreboard */}
        <div className="mb-8 grid grid-cols-3 border-2 border-[#171717] bg-white">
          <div className="border-r-2 border-[#171717] p-5 text-center">
            <p className="text-sm font-bold uppercase">You</p>
            <p className="mt-1 text-4xl font-black">{playerScore}</p>
          </div>

          <div className="border-r-2 border-[#171717] p-5 text-center">
            <p className="text-sm font-bold uppercase">Draws</p>
            <p className="mt-1 text-4xl font-black">{draws}</p>
          </div>

          <div className="p-5 text-center">
            <p className="text-sm font-bold uppercase">Computer</p>
            <p className="mt-1 text-4xl font-black">{computerScore}</p>
          </div>
        </div>

        {/* Battle area */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border-2 border-[#171717] bg-[#FF5A36] p-8 text-center shadow-[8px_8px_0_#171717]">
            <p className="font-black uppercase tracking-widest">You</p>

            <div className="my-8 text-8xl">
              {getSymbol(playerChoice)}
            </div>

            <p className="text-xl font-black uppercase">
              {playerChoice ?? "Choose below"}
            </p>
          </div>

          <div className="border-2 border-[#171717] bg-[#2457FF] p-8 text-center text-white shadow-[8px_8px_0_#171717]">
            <p className="font-black uppercase tracking-widest">Computer</p>

            <div className="my-8 text-8xl">
              {getSymbol(computerChoice)}
            </div>

            <p className="text-xl font-black uppercase">
              {computerChoice ?? "Waiting..."}
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="my-10 text-center">
          {result === "win" && (
            <div>
              <p className="text-5xl font-black uppercase text-[#2E9B65]">
                You Win!
              </p>
              <p className="mt-2 font-bold">Nice move.</p>
            </div>
          )}

          {result === "lose" && (
            <div>
              <p className="text-5xl font-black uppercase text-[#FF5A36]">
                You Lose!
              </p>
              <p className="mt-2 font-bold">The computer got you.</p>
            </div>
          )}

          {result === "draw" && (
            <div>
              <p className="text-5xl font-black uppercase text-[#2457FF]">
                Draw!
              </p>
              <p className="mt-2 font-bold">Same move. Go again.</p>
            </div>
          )}

          {!result && (
            <p className="text-2xl font-black uppercase">
              Choose your weapon.
            </p>
          )}
        </div>

        {/* Choices */}
        <div className="grid gap-4 md:grid-cols-3">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => playRound(choice.name)}
              className="border-2 border-[#171717] bg-white p-6 transition-transform hover:-translate-y-1 hover:bg-[#F6C945] active:translate-y-0"
            >
              <div className="text-5xl">{choice.symbol}</div>

              <p className="mt-3 text-xl font-black uppercase">
                {choice.name}
              </p>
            </button>
          ))}
        </div>

        {/* Reset */}
        <div className="mt-8 text-center">
          <button
            onClick={resetGame}
            className="border-2 border-[#171717] px-6 py-3 font-black uppercase tracking-wide hover:bg-[#171717] hover:text-white"
          >
            Reset Score
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#171717] px-6 py-8 text-center md:px-10">
        <p className="font-black">12 MINUTES.</p>
        <p className="mt-1 text-sm font-medium">
          You had a few minutes. We gave you something to do.
        </p>
      </footer>
    </main>
  );
}
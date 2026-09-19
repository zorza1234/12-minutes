"use client";

import { useEffect, useState } from "react";

type Category = "all" | "dad" | "random" | "dark" | "absurd";

type Joke = {
  text: string;
  category: Exclude<Category, "all">;
};

const jokes: Joke[] = [
  {
    text: "I told my computer I needed a break. Now it won't stop sending me vacation ads.",
    category: "random",
  },
  {
    text: "Why don't skeletons fight each other? They don't have the guts.",
    category: "dad",
  },
  {
    text: "My Wi-Fi and I have a complicated relationship. It's great until I actually need it.",
    category: "random",
  },
  {
    text: "I only know 25 letters of the alphabet. I don't know y.",
    category: "dad",
  },
  {
    text: "I asked my dog what's two minus two. He said nothing.",
    category: "dad",
  },
  {
    text: "My bank account and I play hide and seek. My money is very good at hiding.",
    category: "random",
  },
  {
    text: "I tried to organize a hide-and-seek tournament, but good players are hard to find.",
    category: "random",
  },
  {
    text: "I bought a ceiling fan. Complete waste of money. He just stands there yelling, 'Go ceiling!'",
    category: "absurd",
  },
  {
    text: "Somebody stole my mood ring. I don't know how I feel about that.",
    category: "random",
  },
  {
    text: "I have a joke about procrastination, but I'll tell you later.",
    category: "dad",
  },
  {
    text: "My brain has too many tabs open and somehow they're all playing music.",
    category: "random",
  },
  {
    text: "I told my friend ten jokes to make him laugh. No pun in ten did.",
    category: "dad",
  },
  {
    text: "I tried being normal once. Worst twelve minutes of my life.",
    category: "absurd",
  },
  {
    text: "My phone battery has more commitment issues than I do.",
    category: "random",
  },
  {
    text: "I started a band called 999 Megabytes. We still haven't gotten a gig.",
    category: "absurd",
  },
  {
    text: "Life is short. Smile while you still have teeth.",
    category: "dark",
  },
  {
    text: "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.'",
    category: "dark",
  },
  {
    text: "I have a lot of jokes about unemployed people, but none of them work.",
    category: "dark",
  },
];

export default function LaughPage() {
  const [category, setCategory] = useState<Category>("all");
  const [currentJoke, setCurrentJoke] = useState<Joke>(jokes[0]);
  const [liked, setLiked] = useState(false);
  const [laughCount, setLaughCount] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const getJokes = (selectedCategory: Category) => {
    if (selectedCategory === "all") {
      return jokes;
    }

    return jokes.filter((joke) => joke.category === selectedCategory);
  };

  const nextJoke = () => {
    const available = getJokes(category);

    if (available.length === 0) return;

    setIsChanging(true);
    setLiked(false);

    setTimeout(() => {
      let next = available[Math.floor(Math.random() * available.length)];

      if (available.length > 1 && next.text === currentJoke.text) {
        next =
          available.find((joke) => joke.text !== currentJoke.text) ||
          next;
      }

      setCurrentJoke(next);
      setIsChanging(false);
    }, 180);
  };

  const changeCategory = (newCategory: Category) => {
    setCategory(newCategory);

    const available = getJokes(newCategory);

    if (available.length > 0) {
      const next =
        available[Math.floor(Math.random() * available.length)];

      setCurrentJoke(next);
    }

    setLiked(false);
  };

  const handleLike = () => {
    setLiked((value) => {
      if (!value) {
        setLaughCount((count) => count + 1);
      } else {
        setLaughCount((count) => Math.max(0, count - 1));
      }

      return !value;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        const target = event.target as HTMLElement;

        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "BUTTON"
        ) {
          return;
        }

        event.preventDefault();
        nextJoke();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
        <div className="mb-10 text-center">
          <div className="mb-4 text-6xl">😂</div>

          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#FF5A36]">
            You have 12 minutes.
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            HAVE A LAUGH.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-black/60 sm:text-lg">
            No productivity. No self-improvement. Just jokes.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {(
            [
              ["all", "Everything"],
              ["random", "Random"],
              ["dad", "Dad Jokes"],
              ["absurd", "Absurd"],
              ["dark", "Dark"],
            ] as [Category, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => changeCategory(value)}
              className={`border-2 border-[#171717] px-4 py-2 text-xs font-black uppercase tracking-wider ${
                category === value
                  ? "bg-[#171717] text-white"
                  : "bg-white hover:-translate-y-1"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* JOKE CARD */}
        <div
          className={`mx-auto max-w-3xl border-2 border-[#171717] bg-white p-7 shadow-[9px_9px_0_#171717] transition-all duration-200 sm:p-12 ${
            isChanging
              ? "translate-y-2 scale-[0.98] opacity-0"
              : "translate-y-0 scale-100 opacity-100"
          }`}
        >
          <div className="mb-7 flex items-center justify-between">
            <span className="border-2 border-[#171717] bg-[#F6C945] px-3 py-1 text-xs font-black uppercase tracking-wider">
              {currentJoke.category}
            </span>

            <span className="text-2xl">🤣</span>
          </div>

          <p className="text-center text-2xl font-black leading-tight tracking-[-0.03em] sm:text-4xl sm:leading-tight">
            “{currentJoke.text}”
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={nextJoke}
              className="w-full border-2 border-[#171717] bg-[#FF5A36] px-7 py-4 font-black uppercase tracking-wider text-white shadow-[5px_5px_0_#171717] hover:-translate-y-1 hover:shadow-[7px_7px_0_#171717] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#171717] sm:w-auto"
            >
              😂 Another one
            </button>

            <button
              onClick={handleLike}
              className={`w-full border-2 border-[#171717] px-7 py-4 font-black uppercase tracking-wider shadow-[4px_4px_0_#171717] hover:-translate-y-1 sm:w-auto ${
                liked
                  ? "bg-[#2E9B65] text-white"
                  : "bg-[#F4F0E8]"
              }`}
            >
              {liked ? "🤣 Funny!" : "😂 That was funny"}
            </button>
          </div>
        </div>

        {/* SMALL STATS */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3">
          <div className="border-2 border-[#171717] bg-[#2457FF] p-5 text-center text-white shadow-[4px_4px_0_#171717]">
            <div className="text-xs font-black uppercase tracking-wider">
              Laughs
            </div>

            <div className="mt-1 text-3xl font-black">
              {laughCount}
            </div>
          </div>

          <div className="border-2 border-[#171717] bg-[#F6C945] p-5 text-center shadow-[4px_4px_0_#171717]">
            <div className="text-xs font-black uppercase tracking-wider">
              Shortcut
            </div>

            <div className="mt-1 text-lg font-black">
              SPACE = NEXT
            </div>
          </div>
        </div>

        {/* MORE IDEAS */}
        <div className="mt-14 border-t-2 border-[#171717] pt-8">
          <h2 className="text-xl font-black uppercase tracking-wider">
            More nonsense coming
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="bg-[#F6C945] p-5">
              <div className="text-3xl">🤪</div>
              <h3 className="mt-3 font-black">Bad Advice</h3>
              <p className="mt-1 text-sm font-medium">
                Absolutely terrible life advice.
              </p>
            </div>

            <div className="bg-[#FF5A36] p-5 text-white">
              <div className="text-3xl">🧠</div>
              <h3 className="mt-3 font-black">Would You Rather</h3>
              <p className="mt-1 text-sm font-medium">
                Impossible decisions nobody asked for.
              </p>
            </div>

            <div className="bg-[#2E9B65] p-5 text-white">
              <div className="text-3xl">🎲</div>
              <h3 className="mt-3 font-black">Random Chaos</h3>
              <p className="mt-1 text-sm font-medium">
                Completely pointless things to do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#171717] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <span>12 MINUTES © 2026</span>
          <span className="text-black/50">
            You came here to waste time. Mission accomplished.
          </span>
        </div>
      </footer>
    </main>
  );
}
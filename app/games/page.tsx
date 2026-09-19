import Link from "next/link";

export default function GamesPage() {
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

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <div className="relative border-b-2 border-[#171717] pb-8">
          <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
            Available Now
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl">
                Pick A
                <br />
                Game.
              </h1>

              <p className="mt-5 text-lg font-medium text-gray-600">
                Four quick games. A few minutes well spent.
              </p>
            </div>

            {/* Mini Pong Animation */}
            <div className="pong-box relative hidden h-32 w-80 overflow-hidden md:block">
              <div className="absolute left-2 top-1/2 h-14 w-2 -translate-y-1/2 bg-[#171717]" />
              <div className="absolute right-2 top-1/2 h-14 w-2 -translate-y-1/2 bg-[#171717]" />

              <div className="pong-ball absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-[#FF5A36]" />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest text-gray-400">
                QUICK PLAY
              </div>
            </div>

            <div className="text-right text-4xl font-black text-gray-400">
              04
              <span className="ml-2 text-base">GAMES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Games */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Reaction Test */}
          <Link
            href="/games/reaction"
            className="game-card group relative min-h-[280px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5A36] text-2xl font-black">
                01
              </div>

              <span className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400">
                Speed
              </span>
            </div>

            {/* Animated reaction button */}
            <div className="absolute right-20 top-24">
              <div className="reaction-button h-14 w-14 rounded-full border-2 border-[#171717] bg-[#FF5A36]" />
            </div>

            <div className="absolute bottom-8 left-9 right-9">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">Reaction Test</h2>

                  <p className="mt-2 max-w-md font-medium text-gray-500">
                    How fast can you react? Wait for the signal, then hit the
                    button.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] text-xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Memory Match */}
          <Link
            href="/games/memory"
            className="game-card group relative min-h-[280px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2457FF] text-2xl font-black">
                02
              </div>

              <span className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400">
                Brain
              </span>
            </div>

            {/* Animated memory cards */}
            <div className="memory-animation absolute right-16 top-20">
              <div className="memory-card memory-card-one">★</div>
              <div className="memory-card memory-card-two">★</div>
            </div>

            <div className="absolute bottom-8 left-9 right-9">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">Memory Match</h2>

                  <p className="mt-2 max-w-md font-medium text-gray-500">
                    Find the matching pairs and see how good your memory really
                    is.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] text-xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Number Guess */}
          <Link
            href="/games/number-guess"
            className="game-card group relative min-h-[280px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F6C945] text-2xl font-black">
                03
              </div>

              <span className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400">
                Logic
              </span>
            </div>

            {/* Animated number */}
            <div className="number-animation absolute right-20 top-20 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-[#F6C945] text-4xl font-black">
              ?
            </div>

            <div className="absolute bottom-8 left-9 right-9">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">Number Guess</h2>

                  <p className="mt-2 max-w-md font-medium text-gray-500">
                    The computer picked a number. Can you figure it out?
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] text-xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Rock Paper Scissors */}
          <Link
            href="/games/rock-paper-scissors"
            className="game-card group relative min-h-[280px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2E9B65] text-2xl font-black">
                04
              </div>

              <span className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400">
                Classic
              </span>
            </div>

            {/* Animated RPS */}
            <div className="rps-animation absolute right-16 top-20 text-6xl">
              ✊
            </div>

            <div className="absolute bottom-8 left-9 right-9">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">
                    Rock Paper Scissors
                  </h2>

                  <p className="mt-2 max-w-md font-medium text-gray-500">
                    Classic rules. Quick rounds. Try to beat the computer.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] text-xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="border-2 border-[#171717] bg-[#2457FF] p-8 text-white shadow-[8px_8px_0_#171717] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.2em]">
            More coming
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">
            More Games
            <br />
            Coming Soon.
          </h2>

          <p className="mt-4 max-w-xl font-medium">
            Quick puzzles, weird challenges, competitive games and more ways
            to spend twelve minutes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#171717] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="font-black">12 MINUTES.</p>

          <p className="text-sm font-medium text-gray-500">
            PLAY · RELAX · REPEAT
          </p>
        </div>
      </footer>     
    </main>
  );
}
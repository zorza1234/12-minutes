import Link from "next/link";

export default function BrainPage() {
  return (
    <main className="min-h-screen bg-[#F4F0E8] text-[#171717]">
      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-[#171717] px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-black tracking-tight transition-transform hover:-translate-y-0.5"
        >
          12 MINUTES.
        </Link>

        <Link
          href="/"
          className="font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
        >
          ← Home
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <div className="relative border-b-2 border-[#171717] pb-10">
          <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[#2457FF]">
            Test Your Brain
          </p>

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-6xl font-black uppercase leading-[0.88] tracking-tight md:text-8xl">
                Think
                <br />
                Fast.
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium text-gray-600">
                Quick challenges designed to test your maths, logic,
                attention, and problem-solving skills.
              </p>
            </div>

            {/* Brain animation */}
            <div className="brain-visual relative hidden h-36 w-72 md:block">
              <div className="brain-circle brain-circle-one" />
              <div className="brain-circle brain-circle-two" />

              <div className="brain-dot brain-dot-one" />
              <div className="brain-dot brain-dot-two" />
              <div className="brain-dot brain-dot-three" />

              <div className="absolute bottom-3 left-0 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                KEEP THINKING
              </div>
            </div>

            <div className="text-right text-4xl font-black text-gray-400">
              04
              <span className="ml-2 text-base">LIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Quick Math */}
          <Link
            href="/brain/quick-math"
            className="brain-card group relative min-h-[290px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2457FF] text-2xl font-black text-white">
                01
              </div>

              <span className="rounded-full border-2 border-[#171717] px-4 py-2 text-xs font-black uppercase tracking-widest">
                Play Now →
              </span>
            </div>

            <div className="math-visual absolute right-16 top-20">
              <span>7 × 8</span>
              <span className="math-equals">=</span>
              <span>?</span>
            </div>

            <div className="absolute bottom-8 left-9 right-9">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">Quick Math</h2>

                  <p className="mt-2 max-w-md font-medium text-gray-500">
                    Solve calculations before the clock runs out.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] text-xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Odd One Out */}
          <Link
            href="/brain/odd-one-out"
            className="brain-card group relative min-h-[290px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-[#F6C945] p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171717] text-2xl font-black text-white">
                02
              </div>

              <span className="rounded-full border-2 border-[#171717] px-4 py-2 text-xs font-black uppercase tracking-widest">
                Play Now →
              </span>
            </div>

            <div className="odd-one-out absolute right-16 top-20 grid grid-cols-3 gap-2">
              <span>▲</span>
              <span>▲</span>
              <span>▲</span>
              <span>▲</span>
              <span className="different">△</span>
              <span>▲</span>
            </div>

            <div className="absolute bottom-8 left-9">
              <h2 className="text-3xl font-black">Odd One Out</h2>

              <p className="mt-2 max-w-md font-medium">
                Find the thing that doesn't belong.
              </p>
            </div>
          </Link>

          {/* Pattern Predictor */}
          <Link
            href="/brain/pattern-predictor"
            className="brain-card group relative min-h-[290px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-[#FF5A36] p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black">
                03
              </div>

              <span className="rounded-full border-2 border-[#171717] px-4 py-2 text-xs font-black uppercase tracking-widest">
                Play Now →
              </span>
            </div>

            <div className="pattern-visual absolute right-12 top-20 text-3xl font-black">
              <span>2</span>
              <span>4</span>
              <span>8</span>
              <span>16</span>
              <span className="pattern-question">?</span>
            </div>

            <div className="absolute bottom-8 left-9">
              <h2 className="text-3xl font-black">
                Pattern Predictor
              </h2>

              <p className="mt-2 max-w-md font-medium">
                Spot the pattern. Predict what comes next.
              </p>
            </div>
          </Link>

          {/* Word Scramble */}
          <Link
            href="/brain/word-scramble"
            className="brain-card group relative min-h-[290px] overflow-hidden rounded-[28px] border-2 border-[#171717] bg-[#2E9B65] p-9 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_#171717]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#171717]">
                04
              </div>

              <span className="rounded-full border-2 border-white px-4 py-2 text-xs font-black uppercase tracking-widest">
                Play Now →
              </span>
            </div>

            <div className="scramble-visual absolute right-12 top-20">
              <span>LP</span>
              <span>AP</span>
              <span>EP</span>
            </div>

            <div className="absolute bottom-8 left-9">
              <h2 className="text-3xl font-black">
                Word Scramble
              </h2>

              <p className="mt-2 max-w-md font-medium text-white/80">
                Rearrange the letters and find the hidden word.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* More Challenges */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="border-2 border-[#171717] bg-white p-8 shadow-[8px_8px_0_#171717] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2457FF]">
            More challenges
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">
            Your Brain
            <br />
            Isn't Done Yet.
          </h2>

          <p className="mt-4 max-w-xl font-medium text-gray-600">
            More logic, attention, language, and problem-solving challenges
            will be added over time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#171717] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="font-black transition-opacity hover:opacity-60"
          >
            12 MINUTES.
          </Link>

          <p className="text-sm font-medium text-gray-500">
            THINK · PLAY · REPEAT
          </p>
        </div>
      </footer>
    </main>
  );
}
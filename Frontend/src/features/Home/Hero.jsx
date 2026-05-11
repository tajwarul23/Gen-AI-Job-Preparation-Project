

const Hero = () => {
  return (
     <div>
        {/* MAIN LARGE GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-30
          h-112.5
          w-250
          -translate-x-1/2
          rounded-full
          bg-violet/5
          blur-[160px]
        "
      />

      {/* SECONDARY GLOW */}
      <div
        className="
          pointer-events-none
        absolute
          left-[40%]
          top-[20px]
          h-[250px]
          w-[350px]
          rounded-full
          bg-purple/20
          blur-[120px]
        "
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center pt-32 text-center">
        <div className="mb-6 rounded-full border border-violet-border bg-violet-dim px-5 py-2 text-sm text-violet-text uppercase">
          AI-Powered Interview Intelligence
        </div>

        <h1 className="max-w-4xl text-7xl font-black leading-none">
          Know exactly
          <br />
          <span className="text-violet-text">where you stand</span>
        </h1>
      </section>
     </div>
  )
}

export default Hero
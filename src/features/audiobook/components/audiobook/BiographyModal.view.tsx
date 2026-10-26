export default function Biography({
  heading = "Your Beautiful Heading",
  text = "This is a beautifully designed dark section with smooth typography, a soft gradient overlay, and a premium modern look.",
//   opacity = 0.65, // 0–1
}) {
  return (
    <section
      className="relative max-w-[500px] p-10 bg-bg rounded-3xl overflow-hidden shadow-xl  mx-auto my-0"
    //   style={{
    //     background: `rgba(0, 0, 0, ${opacity})`,
    //   }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-medium text-white mb-4 leading-tight">
          {heading}
        </h2>

        <p className="text-gray-300 text-justify text-cs md:text-cs2 leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
}

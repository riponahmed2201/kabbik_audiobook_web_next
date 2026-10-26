export default function Store() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050f1e] text-white text-center px-6">
      {/* Gradient title */}
      <h1 className="text-c3xl2 md:text-c4xl2 leading-[1.4] font-extrabold bg-gradient-to-r from-[#D94C75] to-[#7F1867] bg-clip-text text-transparent">
        Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-lg">
        Something exciting is on the way. Stay tuned!
      </p>

      {/* Gradient accent line */}
      <div className="w-40 h-1 mt-6 rounded-full bg-gradient-to-r from-[#D94C75] to-[#7F1867]" />

      {/* Optional footer note */}
      <p className="text-sm text-gray-600 mt-10">
        © {2026} kabbik.com
      </p>
    </div>
  );
}

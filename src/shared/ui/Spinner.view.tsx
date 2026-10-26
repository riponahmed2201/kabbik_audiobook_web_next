export default function Spinner({ size = "w-8 h-8", color = "border-blue-500" }) {
  return (
    <div
    className={`rounded-full inline-block mr-2 border-4 border-gray-300 border-t-blue-500 animate-spin ${size}`}
  />
  );
}

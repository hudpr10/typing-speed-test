type Style = "wpm" | "accuracy" | "characters";

type ResultCardProps = {
  label: string;
  value: string;
  style?: Style;
};

function getValueColor(style: Style, value: string) {
  if (style === "accuracy") {
    const numeric = Number(value.match(/[0-9]+/));
    return numeric < 100 ? "text-red-500" : "text-green-500";
  }
  return "text-white";
}

export default function ResultCard({
  label,
  value,
  style = "wpm",
}: ResultCardProps) {
  // Character
  if (style === "characters") {
    const [right, wrong] = value.split("/").map(Number);
    return (
      <li className="flex flex-col px-4 py-2 border border-gray-400 w-32 rounded-lg">
        <span className="text-gray-400">{label}</span>
        <div>
          <span className="font-bold text-green-500">{right}</span>
          <span className="font-bold text-gray-400">/</span>
          <span className="font-bold text-red-500">{wrong}</span>
        </div>
      </li>
    );
  }

  // WPM | Accuracy
  return (
    <li className="flex flex-col px-4 py-2 border border-gray-400 w-32 rounded-lg">
      <span className="text-gray-400">{label}</span>
      <span className={`font-bold ${getValueColor(style, value)}`}>
        {value}
      </span>
    </li>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  style?: "primary" | "secondary" | "ghost";
  handleClick: () => void;
};

export default function Button({
  children,
  style = "primary",
  handleClick,
}: ButtonProps) {
  const bgColor = () => {
    switch (style) {
      case "primary":
        return "bg-blue-500";
      case "secondary":
        return "bg-white text-background";
      case "ghost":
        return "bg-custom-black";
      default:
        return "bg-custom-black";
    }
  };

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 0 rounded-lg cursor-pointer hover:opacity-80 transition-opacity text-base font-bold ${bgColor()}`}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </button>
  );
}

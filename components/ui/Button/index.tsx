type ButtonProps = {
  children: React.ReactNode;
  style?: "primary" | "secondary";
  handleClick: () => void;
};

export default function Button({
  children,
  style = "primary",
  handleClick,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-1 0 rounded-lg cursor-pointer hover:opacity-80 transition-opacity text-base ${style === "primary" ? "bg-blue-500" : "bg-custom-black"}`}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </button>
  );
}

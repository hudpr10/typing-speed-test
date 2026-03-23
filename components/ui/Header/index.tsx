import Logo from "../icons/Logo";
import PersonalBest from "../icons/PersonalBest";

export default function Header() {
  return (
    <header className="flex items-center justify-between mt-4 mb-8">
      <a href="/" className="flex items-center gap-2">
        <Logo />
        <div>
          <h1 className="text-lg font-bold">Typing Speed Test</h1>
          <p className="text-xs text-gray-400">
            Digite o mais rápido que conseguir em 60 segundos
          </p>
        </div>
      </a>

      <div className="flex items-center gap-2 ">
        <PersonalBest />
        <p className="text-gray-400">
          Recorde Pessoal: <strong className="text-white">92 PPM</strong>
        </p>
      </div>
    </header>
  );
}

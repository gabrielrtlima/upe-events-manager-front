import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  return isLoggedIn ? (
    <header className="fixed w-full p-2 z-20 bg-zinc-100  backdrop-blur-md">
      <div className="mx-auto max-w-3xl">
        <nav className="flex items-center gap-3 text-base">
          <a className="group" href="/">
            <h2 className="font-semibold  dark:text-sky-500 tracking-tighter p-2 font-mono uppercase">
              SECAP
            </h2>
          </a>
          <div className="flex items-center gap-6 ">
            <Link href="/admin">Home</Link>
            <Link href="/admin/create-user">Criar usuário</Link>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-6">
            <button onClick={logout}>Sair</button>
          </div>
        </nav>
      </div>
    </header>
  ) : null;
};

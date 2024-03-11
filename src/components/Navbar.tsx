import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [token, setToken] = useState<string>();
  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"));
    }
  })
  return (
    <header className="fixed w-full p-2 z-20  backdrop-blur-md">
      <div className="mx-auto max-w-3xl">
        <nav className="flex items-center gap-3 text-base">
          <a className="group" href="/">
            <h2 className="font-semibold text-blu-500 dark:text-sky-500 tracking-tighter p-2 font-mono uppercase">
              SECAP
            </h2>
          </a>
          <div className="flex items-center gap-6 ">
            <Link href="/admin">Área do administrador</Link>
          </div>
          <div className="flex-1">
          </div>
          <div className="flex items-center gap-6">
            {token ? (
              <button>Sair</button>
            ) : (
              <button >Entrar</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

"use client";
import { FormCreateUser } from "@/components/FormCreateUser";

export default function CreateUser() {
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <h1 className="text-3xl font-bold text-center uppercase p-5">
        Criar usuário
      </h1>
      <div className="flex flex-col bg-zinc-50 w-full md:w-3/5 h-3/6 border rounded justify-center items-center">
        <FormCreateUser className="w-3/5" />
      </div>
    </main>
  );
}

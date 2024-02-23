import { FormLogin } from "@/components/FormLogin";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <h1 className="text-3xl font-bold text-center uppercase p-5">Login</h1>
      <div className="flex flex-col bg-zinc-50 w-5/12 h-3/6 border rounded justify-center items-center">
        <FormLogin className="w-3/5" />
      </div>
    </main>
  );
}

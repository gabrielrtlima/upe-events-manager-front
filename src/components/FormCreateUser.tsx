import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

type FormLoginProps = {
  className?: string;
};

const formSchema = z
  .object({
    email: z.string().email("Insira um email válido"),
    password: z
      .string()
      .min(8, { message: "Mínimo 8 caracteres" })
      .regex(/[0-9]/g, { message: "Precisa de um número" })
      .regex(/[!,@,#,$,%,^,&,*]/g, {
        message: "Precisa de um caractere especial",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

export function FormCreateUser({ className }: FormLoginProps) {
  const { toast } = useToast();
  const token = Cookies.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const user: any = {
      email: data.email,
      password: data.password,
    };

    await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }).then(async (response) => {
      const res = await response.json();
      if (response.ok) {
        toast({
          variant: "default",
          title: "Sucesso!",
          description: "Você cadastrou o novo usuário com sucesso!",
        });
      } else if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar usuário",
          description: "Não foi possível cadastrar o usuário, tente novamente",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${className}`}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insira o email do usuário</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Insira o email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Insira a senha do usuário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Confirme a senha.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="w-3/5 md:w-2/5">
            Criar usuário
          </Button>
        </div>
      </form>
    </Form>
  );
}

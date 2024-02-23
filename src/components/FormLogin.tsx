"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

type FormLoginProps = {
  className?: string
}

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function FormLogin({ className }: FormLoginProps) {
  const { toast } = useToast()
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString()
    }).then(async response => {
      const { access_token, user } = await response.json()
      if (response.ok) {
        login(user, access_token)

        toast({
          variant: "default",
          title: "Login efetuado com sucesso",
          description: "Você será redirecionado para a página inicial",
        })
      } else if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Erro ao efetuar login",
          description: "Usuário ou senha incorreta",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-8 ${className}`}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Insira seu usuário.
              </FormDescription>
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
              <FormDescription>
                Insira sua senha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </Form >
  )
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  initial_date: z
    .date({
      required_error: "Data inicial é obrigatória",
    })
    .transform((data) => {
      if (data) {
        return format(data, "dd-MM-yyyy");
      }
    }),
  final_date: z
    .date({
      required_error: "Data final é obrigatória",
    })
    .transform((data) => {
      if (data) {
        return format(data, "dd-MM-yyyy");
      }
    }),
});

type FormCreateEventProps = {
  setStep: (step: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setEventId: (eventId: number) => void;
};

export function FormCreateEvent({
  setStep,
  setIsLoading,
  setEventId,
}: FormCreateEventProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        const res = await response.json();
        toast({
          variant: "default",
          title: "Evento criado com sucesso",
          description: "O evento foi criado com sucesso",
        });
        setEventId(res.id);
        setIsLoading(false);
        setStep(2);
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao criar evento",
          description: "Não foi possível criar o evento",
        });
        setIsLoading(false);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 h-3/5"
        id="create-event-form"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Insira o nome do evento</FormDescription>
              <FormMessage className="h-5" />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="initial_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data inicial</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Escolha a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const finalDate = form.getValues("final_date");
                        return date > finalDate;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Insira a data inicial do evento
                </FormDescription>
                <FormMessage className="h-5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="final_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data final</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Escolha a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const initialDate = form.getValues("initial_date");
                        return date < initialDate;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Insira a data final do evento</FormDescription>
                <FormMessage className="h-5" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeOpenIcon, UploadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";

type Event = {
  id: number;
  name: string;
  initial_date: string;
  final_date: string;
  anal_filename: string;
};

export function ListEvents() {
  const { toast } = useToast();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setIsLoading(true);
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/events").then(
      async (response) => {
        const { events } = await response.json();
        if (response.ok) {
          setEvents(events);
          setIsLoading(false);
        } else if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Erro ao carregar eventos",
            description: "Não foi possível carregar os eventos",
          });
        }
      },
    );
  };
  return (
    <>
      <Table
        className={`p-4 w-full ${isLoading && "flex flex-col items-center justify-center"}`}
      >
        {isLoading ? (
          <>
            <Skeleton className="h-3 w-3/4 my-3 " />
            <Skeleton className="h-3 w-3/4 my-3 " />
            <Skeleton className="h-3 w-3/4 my-3 " />
            <Skeleton className="h-3 w-3/4 my-3 " />
          </>
        ) : (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell w-[100px]">
                  ID
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">
                  Data inicial
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Data final
                </TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((evento, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden md:table-cell font-medium">
                    {evento.id}
                  </TableCell>
                  <TableCell className="">{evento.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {evento.initial_date}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {evento.final_date}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <a href={evento.anal_filename}>
                      <UploadIcon className="cursor-pointer h-5 w-5" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </>
  );
}

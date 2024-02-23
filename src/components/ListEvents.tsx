import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EyeOpenIcon, UploadIcon } from "@radix-ui/react-icons"

export function ListEvents() {
  const eventos = [
    { nome: "SECAP 2024", dataInicial: "01/09/2024", dataFinal: "22/09/2024" },
    { nome: "SECAP 2025", dataInicial: "01/09/2025", dataFinal: "22/09/2025" },
    { nome: "SECAP 2026", dataInicial: "01/09/2026", dataFinal: "22/09/2026" },
    { nome: "SECAP 2027", dataInicial: "01/09/2027", dataFinal: "22/09/2027" },
    { nome: "SECAP 2028", dataInicial: "01/09/2028", dataFinal: "22/09/2028" },
  ]
  return (
    <>
      <Table className="p-4" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Data inicial</TableHead>
            <TableHead>Data final</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventos.map((evento, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">EV001</TableCell>
              <TableCell>{evento.nome}</TableCell>
              <TableCell>{evento.dataInicial}</TableCell>
              <TableCell>{evento.dataFinal}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <EyeOpenIcon className="cursor-pointer h-5 w-5" />
                <UploadIcon className="cursor-pointer h-5 w-5" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </>
  )
}

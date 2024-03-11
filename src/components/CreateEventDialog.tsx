"use client";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";

import { FormCreateEvent } from "@/components/FormCreateEvent";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ReactNode, useState } from "react";
import { FormSendZip } from "./FormSendZip";

export function CreateEventDialog() {
  const [step, setStep] = useState(1);
  const [openAlertCreateEvent, setOpenAlertCreateEvent] = useState(false);
  const [eventId, setEventId] = useState("");
  const [fileZip, setFileZip] = useState<File>();
  const [fileCsv, setFileCsv] = useState<File>();

  const forms = ["create-event-form", "form-send-zip", "form-send-csv"];

  const handleSubmit = () => {
    setStep(step + 1);
  };

  const formComponents = [
    <FormCreateEvent onSubmit={handleSubmit} />,
    <FormSendZip
      file={fileZip}
      setFile={setFileZip}
      onSubmit={handleSubmit}
      formId="zip"
      extension="zip"
      application="application/zip"
      endpoint={`/${eventId}/merged-papers`}
    />,
    <FormSendZip
      file={fileCsv}
      setFile={setFileCsv}
      onSubmit={handleSubmit}
      application="text/csv"
      formId="csv"
      extension="csv"
      endpoint={`/${eventId}/merged-papers`}
    />,
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar evento</Button>
      </DialogTrigger>
      <DialogContent className="flex justify-between w-screen h-[450px] flex-col">
        <DialogHeader>
          <DialogTitle>
            {step == 1
              ? "Criar evento"
              : step == 2
                ? "Enviar arquivo ZIP"
                : "Enviar aquivo CSV"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {formComponents[step - 1]}
        <DialogFooter className="flex h-fit pt-2 items-center justify-between sm:justify-between">
          {step == 1 ? (
            <DialogClose className="">
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogClose>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Voltar
            </Button>
          )}
          <div className="flex">
            {step == 1 ? (
              <CircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircledIcon
                className="h-5 w-5"
                color="green"
                enableBackground={1}
              />
            )}
            {step <= 2 ? (
              <CircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircledIcon
                className="h-5 w-5"
                color="green"
                enableBackground={1}
              />
            )}
            {step == 3 ? (
              <CircleIcon className="h-5 w-5" />
            ) : (
              <CircleIcon className="h-5 w-5" />
            )}
          </div>

          {step != 1 ? (
            <Button
              type="button"
              variant="default"
              onClick={() => setStep(step + 1)}
            >
              {step == 2 ? "Próxima etapa" : "Concluir"}
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="default"
                  onClick={() => setOpenAlertCreateEvent(true)}
                >
                  Próxima etapa
                </Button>
              </AlertDialogTrigger>
              {openAlertCreateEvent && (
                <AlertCreateEvent>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        form={forms[step - 1]}
                        type="submit"
                        variant="default"
                        className="font-normal"
                      >
                        Desejo seguir
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertCreateEvent>
              )}
            </AlertDialog>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type AlertCreateEventProps = {
  children: ReactNode;
};
const AlertCreateEvent = ({ children }: AlertCreateEventProps) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza que deseja seguir?</AlertDialogTitle>
        <AlertDialogDescription>
          Ao clicar o botão de próxima etapa, você irá para a próxima etapa do
          cadastro do evento, esta ação não poderá ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      {children}
    </AlertDialogContent>
  );
};

const FuncTeste = () => {
  return <h1>testesteste</h1>;
};

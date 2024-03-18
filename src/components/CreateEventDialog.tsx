"use client";
import {
  CheckCircledIcon,
  CircleIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

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
import { LoadingSpinner } from "./ui/loading";

export function CreateEventDialog() {
  const [step, setStep] = useState(1);
  const [openAlertCreateEvent, setOpenAlertCreateEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eventId, setEventId] = useState<Number>();
  const [fileZip, setFileZip] = useState<File>();
  const [fileCsv, setFileCsv] = useState<File>();
  const [filePdf, setFilePdf] = useState<File>();

  const stepFinish = step > 1 && step < 5;
  const stepButtonFinish = step == 1 && step < 5;

  const forms = [
    "create-event-form",
    "form-send-zip",
    "form-send-csv",
    "form-send-pdf",
  ];

  const formComponents = [
    <FormCreateEvent
      setStep={setStep}
      setIsLoading={setIsLoading}
      setEventId={setEventId}
    />,
    <FormSendZip
      file={fileZip}
      setFile={setFileZip}
      formId={forms[step - 1]}
      extension="zip"
      setLoading={setIsLoading}
      application="application/zip"
      endpoint={`/events/${eventId}/merged-papers`}
      setStep={setStep}
      step={step}
    />,
    <FormSendZip
      file={fileCsv}
      setFile={setFileCsv}
      setLoading={setIsLoading}
      application="text/csv"
      formId={forms[step - 1]}
      extension="csv"
      endpoint={`/papers/upload_csv/events/${eventId}`}
      setStep={setStep}
      step={step}
      isCsvFile={true}
      summaryEndpoint={`/events/${eventId}/summary`}
    />,
    <FormSendZip
      file={filePdf}
      setFile={setFilePdf}
      setLoading={setIsLoading}
      application="application/pdf"
      formId={forms[step - 1]}
      extension="pdf"
      endpoint={`/events/${eventId}/anal`}
      setStep={setStep}
      step={step}
    />,
    <FinishDialog />,
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
                : step == 3
                  ? "Enviar aquivo CSV"
                  : step && "Enviar arquivo PDF"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {formComponents[step - 1]}
        <DialogFooter className="flex h-fit pt-2 items-center justify-between sm:justify-between">
          {step == 1 && (
            <DialogClose className="">
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogClose>
          )}
          {stepFinish && (
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
            {step <= 3 ? (
              <CircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircledIcon
                className="h-5 w-5"
                color="green"
                enableBackground={1}
              />
            )}
            {step <= 4 ? (
              <CircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircledIcon
                className="h-5 w-5"
                color="green"
                enableBackground={1}
              />
            )}
          </div>

          {stepFinish ? (
            <Button
              disabled={isLoading}
              type="submit"
              form={step !== 1 ? forms[step - 1] : undefined}
              variant="default"
              className="w-32"
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : step == 4 ? (
                "Enviar"
              ) : (
                "Próxima etapa"
              )}
            </Button>
          ) : step == 1 ? (
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
          ) : null}
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

const FinishDialog = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <h1 className="text-2xl font-bold"> O cadastro foi concluido! </h1>
      <RocketIcon width={64} height={64} color="green" />
    </div>
  );
};

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({});

type FormSendZipProps = {
  setStep: (step: number) => void;
  extension: string;
  application: string;
  formId: string;
  endpoint: string;
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  setLoading?: (loading: boolean) => void;
  step: number;
  isCsvFile?: boolean;
  summaryEndpoint?: string;
};

export function FormSendZip({
  setStep,
  extension,
  application,
  formId,
  endpoint,
  file,
  setFile,
  setLoading,
  step,
  isCsvFile = false,
  summaryEndpoint,
}: FormSendZipProps) {
  const { toast } = useToast();

  const { handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Nenhum arquivo selecionado.",
      });
      return;
    }

    setLoading && setLoading(true);

    const fileData = new FormData();
    const fieldName = extension === "pdf" ? "cover" : "file";
    fileData.append(fieldName, file);
    await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: fileData,
    })
      .then(async (response) => {
        setLoading && setLoading(false);
        if (response.ok) {
          toast({
            variant: "default",
            title: "Arquivo enviado com sucesso",
            description: "Você será redirecionado para a página inicial",
          });
          if (isCsvFile) {
            createSummary();
          }
          setStep(step + 1);
        } else {
          toast({
            variant: "destructive",
            title: "Erro ao enviar arquivo",
            description: "Tente novamente mais tarde",
          });
          console.log("Erro ao enviar o arquivo:", response);
        }
      })
      .catch((error) => {
        setLoading && setLoading(false);
        toast({
          variant: "destructive",
          title: "Erro de rede",
          description: "Não foi possível conectar ao servidor",
        });
        console.error("Falha ao enviar o arquivo:", error);
      });
  };

  const createSummary = async () => {
    if (!summaryEndpoint) {
      return;
    }

    await fetch(process.env.NEXT_PUBLIC_API_URL + summaryEndpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        toast({
          variant: "default",
          title: "Resumo criado com sucesso",
          description: "O resumo foi criado com sucesso",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao criar resumo",
          description: "Não foi possível criar o resumo",
        });
      }
    });
  };
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    console.log(file);
    if (file && file.type === application) {
      setFile(file);
    } else {
      toast({
        variant: "destructive",
        title: "Tipo de arquivo inválido",
        description: `O arquivo deve ser do tipo ${extension}.`,
      });
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section
            className="flex justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
            {...getRootProps()}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <FilePlusIcon width={40} height={40} />
              <input {...getInputProps()} />
              <p>
                {file
                  ? `Arquivo selecionado: ${file.name}`
                  : `Arraste um arquivo aqui ou clique para selecionar um arquivo ${extension}.`}
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </form>
  );
}

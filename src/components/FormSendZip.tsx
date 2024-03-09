import { FilePlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useToast } from "./ui/use-toast";

type FormSendZipProps = {
  onSubmit: (data: any) => void;
  application: string;
  extension: string;
  formId: string;
  endpoint: string;
};

export function FormSendZip({
  onSubmit,
  application,
  extension,
  formId,
  endpoint,
}: FormSendZipProps) {
  const [file, setFile] = useState<File>();
  const { toast } = useToast();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    onSubmit(file);
  }

  function onDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length > 1) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar arquivo",
        description: "Você só pode enviar um arquivo por vez",
      });
      return;
    }

    if (acceptedFiles[0].type !== application) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar arquivo",
        description: `Você só pode enviar arquivos ${extension}`,
      });
      return;
    }

    if (file !== undefined) {
      setFile(undefined);
    }

    setFile(acceptedFiles[0]);
  }

  return (
    <form onSubmit={handleSubmit} id="form-send-zip">
      <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section
            className={`flex justify-center h-[14rem] bg-zinc-100 ${!file ? "border-zinc-500" : "border-red-300"} border-2 border-dashed rounded-lg cursor-pointer`}
          >
            <div
              className="flex flex-col items-center justify-evenly w-full"
              {...getRootProps()}
            >
              <FilePlusIcon width={64} height={64} />
              <input {...getInputProps()} />
              {file == undefined
                ? "Arraste o arquivo .zip ou clique aqui para selecionar"
                : "Arquivo selecionado: " + file.name}
            </div>
          </section>
        )}
      </Dropzone>
    </form>
  );
}

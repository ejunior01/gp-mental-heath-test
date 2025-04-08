import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UplaodSurveyForm } from "@/app/services/uploadSurveysService/upload";
import { toast } from "sonner";
import { uploadSurveysService } from "@/app/services/uploadSurveysService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 500_000_000;
const ACCEPTED_FILES_TYPES = ["text/csv", "text/plain"];

const schema = z.object({
  file: z
    .custom<File>((f) => f instanceof File, {
      message: "Necessário que seja carregado um arquivo.",
    })
    .refine(
      (f) => f?.size <= MAX_FILE_SIZE,
      "Tamanho máximo do arquivo para upload e de 500 Mb."
    )
    .refine(
      (f) => ACCEPTED_FILES_TYPES.includes(f?.type),
      "Apenas arquivos do tipo: csv são suportados."
    ),
});

type FormData = z.infer<typeof schema>;

export function useRegisterSurveyController() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: undefined,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: [["newUploadSurvey"]],
    mutationFn: async (data: UplaodSurveyForm) => {
      return uploadSurveysService.upload(data);
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync({ ...data });
      queryClient.invalidateQueries({ queryKey: ["upload-surveys"] });

      toast.success("Arquivo de Pesquisa enviado com sucesso");

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error?.message}`);
      } else {
        console.log(error);
      }
    }
  });

  return {
    form,
    handleSubmit,
    isPending,
    isSuccess,
  };
}

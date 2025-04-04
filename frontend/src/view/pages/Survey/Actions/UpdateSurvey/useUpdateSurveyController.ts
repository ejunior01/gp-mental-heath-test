import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateSurveyParams } from "@/app/services/surveysService/update";
import { surveyService } from "@/app/services/surveysService";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  code: z.string({ message: "O campo 'Código da pesquisa' é obrigatório" }),
  noteOne: z.number({ message: "O campo 'Nota 1' é obrigatório" }),
  noteTwo: z.number({ message: "O campo 'Nota 2' é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export function useUpdateSurveyController({ code }: { code: string }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: code, // Usar o code recebido como prop
      noteOne: 0,
      noteTwo: 0,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["updateSurvey"],
    mutationFn: async (surveyUpdate: UpdateSurveyParams) => {
      return surveyService.update(surveyUpdate);
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      toast.success("Pesquisa atualizada com sucesso");
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
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

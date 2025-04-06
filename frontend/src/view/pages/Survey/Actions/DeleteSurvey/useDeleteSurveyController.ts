import { surveyService } from "@/app/services/surveysService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useDeleteSurveyController(code: string) {
  const form = useForm();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["deleteSurvey", code],
    mutationFn: async () => surveyService.remove(code),
  });

  const handleSubmit = form.handleSubmit(async () => {
    try {
      await mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      toast.success("Pesquisa deletada com sucesso");

    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro ao deletar pesquisa: ${error.message}`);
      } else {
        console.error("Erro desconhecido:", error);
        toast.error("Erro desconhecido ao deletar pesquisa");
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

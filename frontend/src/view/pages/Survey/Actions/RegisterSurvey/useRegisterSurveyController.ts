import { surveyService } from "@/app/services/surveysService";
import { RegisterSurveyParams } from "@/app/services/surveysService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const schema = z.object({
    code: z.string({ message: "O campo 'Código da pesquisa' é obrigatório" }).min(2),
    noteOne: z.coerce.number({ message: "O campo 'Nota 1' é obrigatório" }),
    noteTwo: z.coerce.number({ message: "O campo 'Nota 2' é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export function useRegisterSurveyController() {
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            code: "",
            noteOne: 0,
            noteTwo: 0
        },
    });

    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationKey: [["newSurvey"]],
        mutationFn: async (data: RegisterSurveyParams) => {
            return surveyService.create(data);
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await mutateAsync({ ...data });
            queryClient.invalidateQueries({ queryKey: ["surveys"] });

            toast.success("Pesquisa registrada com sucesso");

            form.reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error?.message}`);
            } else {
                console.log(error)
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
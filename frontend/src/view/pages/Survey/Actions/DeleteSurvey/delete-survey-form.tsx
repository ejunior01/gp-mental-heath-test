
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { useDeleteSurveyController } from "@/view/pages/Survey/Actions/DeleteSurvey/useDeleteSurveyController";
import { useEffect } from "react";

interface DeleteSurveyFormProps {
    code: string;
    handleModalCLose: () => void;
}

export function DeleteSurveyForm({ code, handleModalCLose }: DeleteSurveyFormProps) {
    const { form, handleSubmit, isPending, isSuccess } = useDeleteSurveyController(code);

    useEffect(() => {
        if (isSuccess) {
            handleModalCLose()
        }
    }, [isSuccess])

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <p>Deseja seguir com a exclusão da pesquisa: {code}?</p>
                <div className="flex gap-3 w-full">
                    <Button
                        type="button"
                        variant={"outline"}
                        className="cursor-pointer flex-1"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer flex-1"
                    >
                        {isPending ? <Spinner className="text-primary" /> : "Enviar"}
                    </Button>
                </div>

            </form>
        </Form>
    )
}



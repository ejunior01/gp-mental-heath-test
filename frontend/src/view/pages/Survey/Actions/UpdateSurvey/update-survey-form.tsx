
import { useSurvey } from "@/app/hooks/use-survey";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import { Skeleton } from "@/view/components/ui/skeleton";
import { useUpdateSurveyController } from "@/view/pages/Survey/Actions/UpdateSurvey/useUpdateSurveyController";
import { useEffect } from "react";

interface UpdateSurveyFormProps {
    code: string;
    handleModalCLose: () => void;
}

export function UpdateSurveyForm({ code, handleModalCLose }: UpdateSurveyFormProps) {
    const { survey, isLoading } = useSurvey(code);
    const { form, handleSubmit, isSuccess, isPending } = useUpdateSurveyController({ code });

    useEffect(() => {
        if (isSuccess) {
            handleModalCLose();
        }
    }, [isSuccess])

    return (
        <>
            {isLoading && <Skeleton className="w-full h-2" />}
            {
                !isLoading &&
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código da pesquisa</FormLabel>
                                        <FormControl>
                                            <Input {...field} defaultValue={survey?.code} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="noteOne"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nota 1</FormLabel>
                                        <FormControl>
                                            <Input {...field} defaultValue={survey?.noteOne} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="noteTwo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nota 2</FormLabel>
                                        <FormControl>
                                            <Input {...field} defaultValue={survey?.noteTwo} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="place-self-end w-full font-bold uppercase cursor-pointer"
                        >
                            {isPending ? <Spinner className="text-primary" /> : "Enviar"}
                        </Button>
                    </form>
                </Form>
            }
        </>
    )
}

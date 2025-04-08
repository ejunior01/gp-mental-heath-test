import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/view/components/ui/form";

import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Skeleton } from "@/view/components/ui/skeleton";
import { Spinner } from "@/view/components/Spinner";
import { useEffect } from "react";
import { useSurvey } from "@/app/hooks/use-survey";
import { useUpdateSurveyController } from "@/view/pages/Survey/Actions/UpdateSurvey/useUpdateSurveyController";

interface UpdateSurveyFormProps {
  code: string;
  handleModalCLose: () => void;
}

export function UpdateSurveyForm({
  code,
  handleModalCLose,
}: UpdateSurveyFormProps) {
  const { survey, isLoading } = useSurvey(code);

  const { form, handleSubmit, isSuccess, isPending } =
    useUpdateSurveyController({ code });

  useEffect(() => {
    if (survey) {
      form.reset({
        code: survey.code || "",
        noteOne: survey.noteOne || 0,
        noteTwo: survey.noteTwo || 0,
      });
    }
  }, [survey, form]);

  useEffect(() => {
    if (isSuccess) {
      handleModalCLose();
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Skeleton className="w-full h-2" />}
      {!isLoading && (
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
      )}
    </>
  );
}

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
import { Spinner } from "@/view/components/Spinner";
import { useEffect } from "react";
import { useRegisterSurveyController } from "./useRegisterSurveyController";

interface RegisterSurveyFormProps {
  handleModalCLose: () => void;
}

export function RegisterSurveyForm({
  handleModalCLose,
}: RegisterSurveyFormProps) {
  const { form, handleSubmit, isPending, isSuccess } =
    useRegisterSurveyController();

  useEffect(() => {
    if (isSuccess) {
      handleModalCLose();
    }
  }, [isSuccess]);

  return (
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
                  <Input {...field} placeholder="ex. GPTW#000" />
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
                  <Input {...field} type="number" />
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
                  <Input {...field} type="number" />
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
  );
}

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
import { useRegisterSurveyController } from "./useRegisterUploadSurveyController";

interface RegisterUploadSurveyFormProps {
  handleModalCLose: () => void;
}

export function RegisterUploadSurveyForm({
  handleModalCLose,
}: RegisterUploadSurveyFormProps) {
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
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Arquivo de pesquisas</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
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

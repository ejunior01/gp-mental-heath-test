import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/view/components/ui/dialog";
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
import { useSurvey } from "@/app/hooks/use-survey";
import { useUpdateSurveyController } from "@/view/pages/Survey/Actions/UpdateSurvey/useUpdateSurveyController";

export function UpdateSurveyDialog({ code }: { code: string }) {
  const { survey } = useSurvey(code);
  const { form, handleSubmit, isPending } = useUpdateSurveyController({ code });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="cursor-pointer w-full">
          Atualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar pesquisa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
                      <Input {...field} value={survey?.code} />
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
                      <Input {...field} value={survey?.noteOne} />
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
                      <Input {...field} value={survey?.noteTwo} />
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
      </DialogContent>
    </Dialog>
  );
}

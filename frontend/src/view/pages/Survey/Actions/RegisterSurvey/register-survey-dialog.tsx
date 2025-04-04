import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/view/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import { useRegisterSurveyController } from "@/view/pages/Survey/Actions/RegisterSurvey/useRegisterSurveyController";
import { Plus } from "lucide-react";


export function RegisterSurveyDialog() {

  const { form, handleSubmit, isPending } = useRegisterSurveyController();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center cursor-pointer">
          <Plus className="h-4 w-4" />
          Registrar pesquisa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pesquisa</DialogTitle>
          <DialogDescription>
          </DialogDescription>
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
                      <Input  {...field} type="number" />
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
  )
}

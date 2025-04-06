import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/view/components/ui/dialog";
import {
  Form
} from "@/view/components/ui/form";

import { useCloseModal } from "@/hooks/useCloseModal";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { useDeleteSurveyController } from "@/view/pages/Survey/Actions/DeleteSurvey/useDeleteSurveyController";
import { Trash } from "lucide-react";

export function DeleteSurveyDialog({ code }: { code: string }) {

  const { form, handleSubmit, isPending, isSuccess } = useDeleteSurveyController(code);

  const { modalOpen, setModalOpen } = useCloseModal(isSuccess)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen} >
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="cursor-pointer">
          <Trash className="w-4 h-4 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deletar pesquisa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}

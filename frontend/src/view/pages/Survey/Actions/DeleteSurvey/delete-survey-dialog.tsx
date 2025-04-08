import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/view/components/ui/dialog";

import { Button } from "@/view/components/ui/button";
import { DeleteSurveyForm } from "@/view/pages/Survey/Actions/DeleteSurvey/delete-survey-form";
import { Trash } from "lucide-react";
import { useState } from "react";

export function DeleteSurveyDialog({ code }: { code: string }) {
  const [modalClose, setModalClose] = useState(false)

  const handleModalCLose = () => {
    setModalClose(true)
  }

  return (
    <Dialog open={modalClose} onOpenChange={setModalClose} >
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
        <DeleteSurveyForm code={code} handleModalCLose={handleModalCLose} />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/view/components/ui/dialog";

import { Button } from "@/view/components/ui/button";
import { Pen } from "lucide-react";
import { UpdateSurveyForm } from "@/view/pages/Survey/Actions/UpdateSurvey/update-survey-form";
import { useState } from "react";

export function UpdateSurveyDialog({ code }: { code: string }) {
  const [modalClose, setModalClose] = useState(false);

  const handleModalCLose = () => {
    setModalClose(true);
  };

  return (
    <Dialog open={modalClose} onOpenChange={setModalClose}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="cursor-pointer">
          <Pen className="w-4 h-4 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar pesquisa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <UpdateSurveyForm code={code} handleModalCLose={handleModalCLose} />
      </DialogContent>
    </Dialog>
  );
}

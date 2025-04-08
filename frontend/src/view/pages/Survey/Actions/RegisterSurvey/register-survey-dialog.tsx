import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/view/components/ui/dialog";

import { Button } from "@/view/components/ui/button";
import { Plus } from "lucide-react";
import { RegisterSurveyForm } from "./register-survey-form";
import { useState } from "react";

export function RegisterSurveyDialog() {
  const [modalClose, setModalClose] = useState(false);

  const handleModalCLose = () => {
    setModalClose(false);
  };

  return (
    <Dialog open={modalClose} onOpenChange={setModalClose}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center cursor-pointer">
          <Plus className="h-4 w-4" />
          Registrar pesquisa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pesquisa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <RegisterSurveyForm handleModalCLose={handleModalCLose} />
      </DialogContent>
    </Dialog>
  );
}

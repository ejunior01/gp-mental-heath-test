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
import { RegisterUploadSurveyForm } from "./register-upload-survey-form";
import { useState } from "react";

export function RegisterUploadSurveyDialog() {
  const [modalClose, setModalClose] = useState(false);

  const handleModalCLose = () => {
    setModalClose(false);
  };

  return (
    <Dialog open={modalClose} onOpenChange={setModalClose}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center cursor-pointer">
          <Plus className="h-4 w-4" />
          Enviar arquivo de pesquisas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar arquivo de pesquisas</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <RegisterUploadSurveyForm handleModalCLose={handleModalCLose} />
      </DialogContent>
    </Dialog>
  );
}

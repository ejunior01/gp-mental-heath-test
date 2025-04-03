import { Button } from "@/view/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Plus } from "lucide-react";


export function RegisterSurveyDialog() {
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="code" >
              Código da pesquisa
            </Label>
            <Input id="code" className="col-span-3"  />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="noteOne">
              Nota 1
            </Label>
            <Input id="noteOne"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="noteTwo">
              Nota 2
            </Label>
            <Input id="noteTwo" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

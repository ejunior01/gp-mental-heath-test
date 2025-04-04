import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";

import { Button } from "@/view/components/ui/button";
import { Ellipsis } from "lucide-react";
import { UpdateSurveyDialog } from "./UpdateSurvey/update-survey-dialog";

export function SurveyActionsDropdown({ code }: { code: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} className="cursor-pointer">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <UpdateSurveyDialog code={code} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu";
import { DotSquare } from "lucide-react";



export function SurveyActionsDropdown({ code }: { code: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><DotSquare className="h-4 w-4" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{code}</DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
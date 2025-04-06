import { DeleteSurveyDialog } from "@/view/pages/Survey/Actions/DeleteSurvey/delete-survey-dialog";
import { UpdateSurveyDialog } from "@/view/pages/Survey/Actions/UpdateSurvey/update-survey-dialog";


export function SurveyActions({ code }: { code: string }) {
    return (
        <div>
            <UpdateSurveyDialog code={code} />
            <DeleteSurveyDialog code={code} />
        </div>
    )
}
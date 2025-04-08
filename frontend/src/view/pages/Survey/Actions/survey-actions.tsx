import { DeleteSurveyDialog } from "@/view/pages/Survey/Actions/DeleteSurvey/delete-survey-dialog";
import { UpdateSurveyDialog } from "@/view/pages/Survey/Actions/UpdateSurvey/update-survey-dialog";

export function SurveyActions({ code }: { code: string }) {
  return (
    <div className="w-full flex items-center justify-center">
      <UpdateSurveyDialog code={code} />
      <DeleteSurveyDialog code={code} />
    </div>
  );
}

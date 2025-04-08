import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "@/view/layouts/default-layout";
import { SurveyPage } from "@/view/pages/Survey";
import { UploadSurveyPage } from "@/view/pages/UploadSurvey";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/upload-surveys" element={<UploadSurveyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
